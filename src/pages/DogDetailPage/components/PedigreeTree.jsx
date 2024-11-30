import { useState } from "react";
import "./pedigreeTree.scss";

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


  const convertToTreeData = (dog, depth = 0) => {
    if (!dog || ++depth > generationsLength) return {
      name: null
    };

    // Controlla se il cane è tra i ripetuti
    const isRepeated = dogFrequency.get(dog.id) > 1;

    return {
      name: dog.name,
      id: dog.id,
      isRepeated,
      image: dog.image,
      name: dog.name,
      titles: dog.titles,
      country: dog.country.code,
      sex: dog.sex,
      depth,
      parents: [convertToTreeData(dog.dam, depth), convertToTreeData(dog.sire, depth)]
    }
  };

  const createTree = (dog) => {
    if (!dog) return null;

    // Parte direttamente dai genitori
    return {
      name: "Parents",
      parents: [convertToTreeData(dog.dam), convertToTreeData(dog.sire)].filter(Boolean)
    }
  }

  const treeData = createTree(dog);

  const renderNode = (parents, position = "") => {

    return (
      <ul className={`children ${position}`}>
        <li className="mb-4">
          <h4>{parents[0].name || "..."}</h4>
          {parents[0]?.parents?.length > 0 && renderNode(parents[0].parents, "top-child")}
        </li>
        <li>
          <h4>{parents[1].name || "..."}</h4>
          {parents[1]?.parents?.length > 0 && renderNode(parents[1].parents, "bottom-child")}
        </li>
      </ul>
    )
  }

  const renderTree = (treeData) => {

    return (
      <div className="parents">
        <h4>{treeData.name}</h4>
        {renderNode(treeData.parents)}
      </div>
    )
  }


  return <div className="pedigree-tree">

    <div className="tree-container">

      {/* Gen 1 */}
      <div className="tree-col">
        <div className="dog-card"></div>
        <div className="dog-card"></div>
      </div>

      {/* Gen 2 */}
      <div className="tree-col">
        <div className="dog-card"></div>
        <div className="dog-card"></div>
        <div className="dog-card"></div>
        <div className="dog-card"></div>
      </div>

      {/* Gen 3 */}
      <div className="tree-col">
        <div className="dog-card"></div>
        <div className="dog-card"></div>
        <div className="dog-card"></div>
        <div className="dog-card"></div>
        <div className="dog-card"></div>
        <div className="dog-card"></div>
        <div className="dog-card"></div>
        <div className="dog-card"></div>
      </div>

      {/* Gen 4 */}
      <div className="tree-col">
        <div className="dog-card"></div>
        <div className="dog-card"></div>
        <div className="dog-card"></div>
        <div className="dog-card"></div>
        <div className="dog-card"></div>
        <div className="dog-card"></div>
        <div className="dog-card"></div>
        <div className="dog-card"></div>
        <div className="dog-card"></div>
        <div className="dog-card"></div>
        <div className="dog-card"></div>
        <div className="dog-card"></div>
        <div className="dog-card"></div>
        <div className="dog-card"></div>
        <div className="dog-card"></div>
        <div className="dog-card"></div>
      </div>

      {/* Gen 5 */}
      {generationsLength >= 5 &&
        <div className="tree-col">
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
        </div>
      }


      {/* Gen 6 */}
      {generationsLength >= 6 &&
        <div className="tree-col">
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
        </div>
      }

      {/* Gen 7 */}
      {generationsLength >= 7 &&
        <div className="tree-col">
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
        </div>
      }

      {/* Gen 8 */}
      {generationsLength >= 7 &&
        <div className="tree-col">
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
          <div className="dog-card"></div>
        </div>
      }

    </div>




  </div>;
};

export default PedigreeTree;

