import { useState } from "react";
import Tree from 'react-d3-tree';
import NodeTreeLabel from "./NodeTreeLabel";
import { useCenteredTree } from "../utils/helpers";

const PedigreeTree = ({ dog, resetCard }) => {

    const [generationsLength, setGenerationsLength] = useState(4);

    const [translate, containerRef] = useCenteredTree();

    // Traccia quante volte ogni cane appare, per ogni cane avro una coppia chiave valore dove: chiave= id, valore= occorrenze-cane
    const dogFrequency = new Map();

    /**
     * Funzione che restituisce un colore esadecimale non presente in un array passato a parametro
     * @param {Array} prevColors L'array di colori precedenti 
     * @returns {String} L'esadecimale di un nuovo colore
     */
    const generateHexColor = (prevColors) => {
        let newColor;
        do {
            newColor = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`
        } while (prevColors.includes(newColor))
        return newColor;
    }


    /**
     * Funzione che conta le occorrenze di ogni cane e gli assegna un colore
     * @param {Object} dog Il cane corrente 
     * @param {Array} colors Array di colori
     * @returns 
     */
    const countDogs = (dog, colors = []) => {
        if (!dog) return;

        // Recupero il precedente valore del cane se presente
        const prevValue = dogFrequency.get(dog.id) || {};

        const newValue = {
            count: (prevValue.count || 0) + 1, // valore= precedenti occorrenze di dog.id se presenti oppure 0 e poi lo incremento
            color: prevValue.color || generateHexColor(colors) // valore= precedente valore di color oppure nuovo colore
        }


        if (!colors.includes(newValue.color)) colors.push(newValue.color);

        dogFrequency.set(
            dog.id, // chiave
            newValue // valore
        )

        // Chiamata ricorsiva sui genitori
        countDogs(dog.sire, colors); // Conta il padre
        countDogs(dog.dam, colors);  // Conta la madre
    }

    // Conta le occorrenze di ogni cane prima di generare l'albero genealogico
    countDogs(dog);


    /**
     * Funzione che a partire da un cane genera un set di dati per generare l'albero genealogico
     * @param {Object} dog Cane corrente
     * @param {Number} depth La generazione del cane corrente 
     * @returns {Object} Oggetto contenente i dati in formato adatto per il componente Tree
     */
    const convertToTreeData = (dog, depth = 0) => {
        if (!dog || ++depth > generationsLength) return {
            name: null
        };

        // Controlla se il cane è tra i ripetuti
        const isRepeated = dogFrequency.get(dog.id).count > 1;

        return {
            name: dog.name,
            attributes: {
                id: dog.id,
                isRepeated,
                image: dog.image,
                name: dog.name,
                titles: dog.titles,
                country: dog.country.code,
                sex: dog.sex,
                depth,
                circleColor: dogFrequency.get(dog.id).color
            },
            children: [convertToTreeData(dog.dam, depth), convertToTreeData(dog.sire, depth)]
        }
    };

    /**
     * Funzione che crea i dati per l'albero e rimuove il nodo 0
     * @param {Object} dog Cane corrente
     * @returns {Object} Oggetto in formato adatto per il componente Tree
     */
    const createTree = (dog) => {
        if (!dog) return null;

        // Parte direttamente dai genitori
        return {
            name: "Parents",
            children: [convertToTreeData(dog.dam), convertToTreeData(dog.sire)].filter(Boolean)
        }
    }

    // Creo i dati per l'albero
    const treeData = createTree(dog);


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
            style={{ width: "100%", height: "1000px", position: "relative" }}
            ref={containerRef}
        >
            <Tree
                data={treeData} // dati albero
                orientation="horizontal" // orientamento albero
                pathFunc="step" // stile delle linee
                nodeSize={{ x: 250, y: 45 }} // distanza nodi
                zoomable={true} //abilitazione zoom
                draggable={true} // abilitazione trascinamento
                separation={{ siblings: 4, nonSiblings: 3 }}
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
