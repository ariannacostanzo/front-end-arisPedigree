import { Link } from "react-router-dom";
import "./pedigreeTree.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Tree from 'react-d3-tree';
import NodeTreeLabel from "./NodeTreeLabel";
import { useCenteredTree } from "../utils/helpers";

const PedigreeTree = ({ dog, resetCard }) => {

  const [generationsLength, setGenerationsLength] = useState(4);

  // Traccia quante volte ogni cane appare, per ogni cane avro una coppia chiave valore dove: chiave= id, valore= occorrenze-cane
  const dogFrequency = new Map();

  const countDogs = (dog) => {
    if (!dog) return;

    dogFrequency.set(
      dog.id, // chiave
      (dogFrequency.get(dog.id) || 0) + 1 // valore= precedenti occorrenze di dog.id se presenti oppure 0 e poi lo incremento
    )

    // Chiamata ricorsiva sui genitori
    countDogs(dog.sire); // Conta il padre
    countDogs(dog.dam);  // Conta la madre
  }

  // Conta le occorrenze di ogni cane prima di generare l'albero genealogico
  countDogs(dog);


  const convertToTreeData = (dog) => {
    if (!dog) return {
      name: null
    };

    // Controlla se il cane è tra i ripetuti
    const isRepeated = dogFrequency.get(dog.id) > 1;

    return {
      name: dog.name,
      attributes: {
        id: dog.id,
        isRepeated,
        image: dog.image,
        name: dog.name,
        titles: dog.titles,
        country: dog.country.code,
        sex: dog.sex
      },
      children: [convertToTreeData(dog.dam), convertToTreeData(dog.sire)].filter(Boolean)
    }
  };

  const createTree = (dog) => {
    if (!dog) return null;

    // Parte direttamente dai genitori
    return {
      name: "Parents",
      children: [convertToTreeData(dog.dam), convertToTreeData(dog.sire)].filter(Boolean)
    }
  }

  const treeData = createTree(dog);

  const [translate, containerRef] = useCenteredTree();

  return <div className="pedigree-tree">

    {/* Select per scegliere il numero di generazioni da visualizzare */}
    <label className="mb-3">Generations in pedigree:
      <select
        value={generationsLength}
        onChange={e => setGenerationsLength(Number(e.target.value))}
      >
        {
          [4, 5, 6, 7, 8].map(el => <option
            key={`option-${el}`}
            value={el}
          >
            {el}
          </option>)
        }
      </select>
    </label>

    {/* Tree dog */}
    <div
      style={{ width: "100%", height: "600px" }}
      ref={containerRef}
    >
      <Tree
        data={treeData} // dati albero
        orientation="horizontal" // orientamento albero
        pathFunc="step" // stile delle linee
        nodeSize={{ x: 250, y: 45 }} // distanza nodi
        zoomable={true} //abilitazione zoom
        draggable={true} // abilitazione trascinamento
        separation={{ siblings: 2, nonSiblings: 3 }}
        translate={translate}
        renderCustomNodeElement={(rd3tProps) =>
          <NodeTreeLabel
            dog={rd3tProps.nodeDatum}
            resetCard={resetCard}
          />
        }
      />
    </div>

  </div>;
};

export default PedigreeTree;

//da completare
//non funziona