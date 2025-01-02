import { useEffect, useState } from "react";
import "./pedigreeTree.scss";
const PedigreeTree = ({ dog, resetCard }) => {

    const [generationsLength, setGenerationsLength] = useState(4);
    const [generationTree, setGenerationTree] = useState({});


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
            id: dog.id,
            isRepeated,
            image: dog.image,
            name: dog.name,
            titles: dog.titles,
            country: dog.country.code,
            sex: dog.sex,
            depth,
            circleColor: dogFrequency.get(dog.id).color,
            dam: convertToTreeData(dog.dam, depth),
            sire: convertToTreeData(dog.sire, depth),
            parents: [convertToTreeData(dog.dam, depth), convertToTreeData(dog.sire, depth)]
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
            sire: convertToTreeData(dog.sire),
            dam: convertToTreeData(dog.dam),
            parents: [convertToTreeData(dog.dam), convertToTreeData(dog.sire)].filter(Boolean)
        }
    }

    // Creo i dati per l'albero
    const treeData = createTree(dog);
    console.log(treeData);
    useEffect(() => {
        setGenerationTree(createTree(dog))
    }, [generationsLength])



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
        <div className="App">
            <div className="generation1">
                {/* Maschio Gen 1 */}
                <div className="generation1-male">
                    {generationTree.sire?.name || "..."}

                    <div className="generation2">
                        {/* Maschio Gen 2 */}
                        <div className="generation2-male">
                            {generationTree.sire?.sire?.name || "..."}

                            <div className="generation3">
                                {/* Maschio Gen 3 */}
                                <div className="generation3-male">
                                    {generationTree.sire?.sire?.sire?.name || "..."}

                                    <div className="generation4">
                                        {/* Maschio Gen 4 */}
                                        <div className="generation4-male">
                                            {generationTree.sire?.sire?.sire?.sire?.name || "..."}

                                            <div className="generation5">
                                                {/* Maschio Gen 5 */}
                                                <div className="generation5-male">
                                                    {generationTree.sire?.sire?.sire?.sire?.sire?.name || "..."}

                                                    <div className="generation6">
                                                        {/* Maschio Gen 6 */}
                                                        <div className="generation6-male">
                                                            {generationTree.sire?.sire?.sire?.sire?.sire?.sire?.name || "..."}
                                                        </div>

                                                        {/* Femmina Gen 6 */}
                                                        <div className="generation6-female">
                                                            {generationTree.sire?.sire?.sire?.sire?.sire?.dam?.name || "..."}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Femmina Gen 5 */}
                                                <div className="generation5-female">
                                                    {generationTree.sire?.sire?.sire?.sire?.dam?.name || "..."}

                                                    <div className="generation6">
                                                        {/* Maschio Gen 6 */}
                                                        <div className="generation6-male">
                                                            {generationTree.sire?.sire?.sire?.sire?.dam?.sire?.name || "..."}
                                                        </div>

                                                        {/* Femmina Gen 6 */}
                                                        <div className="generation6-female">
                                                            {generationTree.sire?.sire?.sire?.sire?.dam?.dam?.name || "..."}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Femmina Gen 4 */}
                                        <div className="generation4-female">
                                            {generationTree.sire?.sire?.sire?.dam?.name || "..."}

                                            <div className="generation5">
                                                {/* Maschio Gen 5 */}
                                                <div className="generation5-male">
                                                    {generationTree.sire?.sire?.sire?.dam?.sire?.name || "..."}

                                                    <div className="generation6">
                                                        {/* Maschio Gen 6 */}
                                                        <div className="generation6-male">
                                                            {generationTree.sire?.sire?.sire?.dam?.sire?.sire?.name || "..."}
                                                        </div>

                                                        {/* Femmina Gen 6 */}
                                                        <div className="generation6-female">
                                                            {generationTree.sire?.sire?.sire?.dam?.sire?.dam?.name || "..."}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Femmina Gen 5 */}
                                                <div className="generation5-female">
                                                    {generationTree.sire?.sire?.sire?.dam?.dam?.name || "..."}

                                                    <div className="generation6">
                                                        {/* Maschio Gen 6 */}
                                                        <div className="generation6-male">
                                                            {generationTree.sire?.sire?.sire?.dam?.dam?.sire?.name || "..."}
                                                        </div>

                                                        {/* Femmina Gen 6 */}
                                                        <div className="generation6-female">
                                                            {generationTree.sire?.sire?.sire?.dam?.dam?.dam?.name || "..."}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Femmina Gen 3 */}
                                <div className="generation3-female">
                                    {generationTree.sire?.sire?.dam?.name || "..."}

                                    <div className="generation4">
                                        {/* Maschio Gen 4 */}
                                        <div className="generation4-male">
                                            {generationTree.sire?.sire?.dam?.sire?.name || "..."}

                                            <div className="generation5">
                                                {/* Maschio Gen 5 */}
                                                <div className="generation5-male">
                                                    {generationTree.sire?.sire?.dam?.sire?.sire?.name || "..."}

                                                    <div className="generation6">
                                                        {/* Maschio Gen 6 */}
                                                        <div className="generation6-male">
                                                            {generationTree.sire?.sire?.dam?.sire?.sire?.sire?.name || "..."}

                                                        </div>

                                                        {/* Femmina Gen 6 */}
                                                        <div className="generation6-female">
                                                            {generationTree.sire?.sire?.dam?.sire?.sire?.dam?.name || "..."}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Femmina Gen 5 */}
                                                <div className="generation5-female">
                                                    {generationTree.sire?.sire?.dam?.sire?.dam?.name || "..."}

                                                    <div className="generation6">
                                                        {/* Maschio Gen 6 */}
                                                        <div className="generation6-male">
                                                            {generationTree.sire?.sire?.dam?.sire?.dam?.sire?.name || "..."}
                                                        </div>

                                                        {/* Femmina Gen 6 */}
                                                        <div className="generation6-female">
                                                            {generationTree.sire?.sire?.dam?.sire?.dam?.dam?.name || "..."}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Femmina Gen 4 */}
                                        <div className="generation4-female">
                                            {generationTree.sire?.sire?.dam?.dam?.name || "..."}

                                            <div className="generation5">
                                                {/* Maschio Gen 5 */}
                                                <div className="generation5-male">
                                                    {generationTree.sire?.sire?.dam?.dam?.sire?.name || "..."}

                                                    <div className="generation6">
                                                        {/* Maschio Gen 6 */}
                                                        <div className="generation6-male">
                                                            {generationTree.sire?.sire?.dam?.dam?.sire?.sire?.name || "..."}
                                                        </div>

                                                        {/* Femmina Gen 6 */}
                                                        <div className="generation6-female">
                                                            {generationTree.sire?.sire?.dam?.dam?.sire?.dam?.name || "..."}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Femmina Gen 5 */}
                                                <div className="generation5-female">
                                                    {generationTree.sire?.sire?.dam?.dam?.dam?.name || "..."}

                                                    <div className="generation6">
                                                        {/* Maschio Gen 6 */}
                                                        <div className="generation6-male">
                                                            {generationTree.sire?.sire?.dam?.dam?.dam?.sire?.name || "..."}
                                                        </div>

                                                        {/* Femmina Gen 6 */}
                                                        <div className="generation6-female">
                                                            {generationTree.sire?.sire?.dam?.dam?.dam?.dam?.name || "..."}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Femmina Gen 2 */}
                        <div className="generation2-female">
                            {generationTree.sire?.dam?.name || "..."}

                            <div className="generation3">
                                {/* Maschio Gen 3 */}
                                <div className="generation3-male">
                                    {generationTree.sire?.dam?.sire?.name || "..."}

                                    <div className="generation4">
                                        {/* Maschio Gen 4 */}
                                        <div className="generation4-male">
                                            {generationTree.sire?.dam?.sire?.sire?.name || "..."}

                                            <div className="generation5">
                                                {/* Maschio Gen 5 */}
                                                <div className="generation5-male">
                                                    {generationTree.sire?.dam?.sire?.sire?.sire?.name || "..."}

                                                    <div className="generation6">
                                                        {/* Maschio Gen 6 */}
                                                        <div className="generation6-male">
                                                            {generationTree.sire?.dam?.sire?.sire?.sire?.sire?.name || "..."}
                                                        </div>

                                                        {/* Femmina Gen 6 */}
                                                        <div className="generation6-female">
                                                            {generationTree.sire?.dam?.sire?.sire?.sire?.dam?.name || "..."}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Femmina Gen 5 */}
                                                <div className="generation5-female">
                                                    {generationTree.sire?.dam?.sire?.sire?.dam?.name || "..."}

                                                    <div className="generation6">
                                                        {/* Maschio Gen 6 */}
                                                        <div className="generation6-male">
                                                            {generationTree.sire?.dam?.sire?.sire?.dam?.sire?.name || "..."}
                                                        </div>

                                                        {/* Femmina Gen 6 */}
                                                        <div className="generation6-female">
                                                            {generationTree.sire?.dam?.sire?.sire?.dam?.dam?.name || "..."}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Femmina Gen 4 */}
                                        <div className="generation4-female">
                                            {generationTree.sire?.dam?.sire?.dam?.name || "..."}

                                            <div className="generation5">
                                                {/* Maschio Gen 5 */}
                                                <div className="generation5-male">
                                                    {generationTree.sire?.dam?.sire?.dam?.sire?.name || "..."}

                                                    <div className="generation6">
                                                        {/* Maschio Gen 6 */}
                                                        <div className="generation6-male">
                                                            {generationTree.sire?.dam?.sire?.dam?.sire?.sire?.name || "..."}
                                                        </div>

                                                        {/* Femmina Gen 6 */}
                                                        <div className="generation6-female">
                                                            {generationTree.sire?.dam?.sire?.dam?.sire?.dam?.name || "..."}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Femmina Gen 5 */}
                                                <div className="generation5-female">
                                                    {generationTree.sire?.dam?.sire?.dam?.dam?.name || "..."}

                                                    <div className="generation6">
                                                        {/* Maschio Gen 6 */}
                                                        <div className="generation6-male">
                                                            {generationTree.sire?.dam?.sire?.dam?.dam?.sire?.name || "..."}
                                                        </div>

                                                        {/* Femmina Gen 6 */}
                                                        <div className="generation6-female">
                                                            {generationTree.sire?.dam?.sire?.dam?.dam?.dam?.name || "..."}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Femmina Gen 3 */}
                                <div className="generation3-female">
                                    {generationTree.sire?.dam?.dam?.name || "..."}

                                    <div className="generation4">
                                        {/* Maschio Gen 4 */}
                                        <div className="generation4-male">
                                            {generationTree.sire?.dam?.dam?.sire?.name || "..."}

                                            <div className="generation5">
                                                {/* Maschio Gen 5 */}
                                                <div className="generation5-male">
                                                    {generationTree.sire?.dam?.dam?.sire?.sire?.name || "..."}

                                                    <div className="generation6">
                                                        {/* Maschio Gen 6 */}
                                                        <div className="generation6-male">
                                                            {generationTree.sire?.dam?.dam?.sire?.sire?.sire?.name || "..."}
                                                        </div>

                                                        {/* Femmina Gen 6 */}
                                                        <div className="generation6-female">
                                                            {generationTree.sire?.dam?.dam?.sire?.sire?.dam?.name || "..."}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Femmina Gen 5 */}
                                                <div className="generation5-female">
                                                    {generationTree.sire?.dam?.dam?.sire?.dam?.name || "..."}

                                                    <div className="generation6">
                                                        {/* Maschio Gen 6 */}
                                                        <div className="generation6-male">
                                                            {generationTree.sire?.dam?.dam?.sire?.dam?.sire?.name || "..."}
                                                        </div>

                                                        {/* Femmina Gen 6 */}
                                                        <div className="generation6-female">
                                                            {generationTree.sire?.dam?.dam?.sire?.dam?.dam?.name || "..."}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Femmina Gen 4 */}
                                        <div className="generation4-female">
                                            {generationTree.sire?.dam?.dam?.dam?.name || "..."}

                                            <div className="generation5">
                                                {/* Maschio Gen 5 */}
                                                <div className="generation5-male">
                                                    {generationTree.sire?.dam?.dam?.dam?.sire?.name || "..."}

                                                    <div className="generation6">
                                                        {/* Maschio Gen 6 */}
                                                        <div className="generation6-male">
                                                            {generationTree.sire?.dam?.dam?.dam?.sire?.sire?.name || "..."}
                                                        </div>

                                                        {/* Femmina Gen 6 */}
                                                        <div className="generation6-female">
                                                            {generationTree.sire?.dam?.dam?.dam?.sire?.dam?.name || "..."}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Femmina Gen 5 */}
                                                <div className="generation5-female">
                                                    {generationTree.sire?.dam?.dam?.dam?.dam?.name || "..."}

                                                    <div className="generation6">
                                                        {/* Maschio Gen 6 */}
                                                        <div className="generation6-male">
                                                            {generationTree.sire?.dam?.dam?.dam?.dam?.sire?.name || "..."}
                                                        </div>

                                                        {/* Femmina Gen 6 */}
                                                        <div className="generation6-female">
                                                            {generationTree.sire?.dam?.dam?.dam?.dam?.dam?.name || "..."}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Femmina Gen 1 */}
                <div className="generation1-female">
                    {generationTree.dam?.name || "..."}

                    <div className="generation2">
                        {/*Maschio Gen 2  */}
                        <div className="generation2-male">
                            {generationTree.dam?.sire?.name || "..."}

                            <div className="generation3">
                                {/* Maschio Gen 3 */}
                                <div className="generation3-male">
                                    {generationTree.dam?.sire?.sire?.name || "..."}

                                    <div className="generation4">
                                        {/* Maschio Gen 4 */}
                                        <div className="generation4-male">
                                            {generationTree.dam?.sire?.sire?.sire?.name || "..."}

                                            <div className="generation5">
                                                {/* Maschio Gen 5 */}
                                                <div className="generation5-male">
                                                    {generationTree.dam?.sire?.sire?.sire?.sire?.name || "..."}

                                                    <div className="generation6">
                                                        {/* Maschio Gen 6 */}
                                                        <div className="generation6-male">
                                                            {generationTree.dam?.sire?.sire?.sire?.sire?.sire?.name || "..."}
                                                        </div>

                                                        {/* Femmina Gen 6 */}
                                                        <div className="generation6-female">
                                                            {generationTree.dam?.sire?.sire?.sire?.sire?.dam?.name || "..."}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Femmina Gen 5 */}
                                                <div className="generation5-female">
                                                    {generationTree.dam?.sire?.sire?.sire?.dam?.name || "..."}

                                                    <div className="generation6">
                                                        {/* Maschio Gen 6 */}
                                                        <div className="generation6-male">
                                                            {generationTree.dam?.sire?.sire?.sire?.dam?.sire?.name || "..."}

                                                        </div>

                                                        {/* Femmina Gen 6 */}
                                                        <div className="generation6-female">
                                                            {generationTree.dam?.sire?.sire?.sire?.dam?.dam?.name || "..."}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Femmina Gen 4 */}
                                        <div className="generation4-female">
                                            {generationTree.dam?.sire?.sire?.dam?.name || "..."}

                                            <div className="generation5">
                                                {/* Maschio Gen 5 */}
                                                <div className="generation5-male">
                                                    {generationTree.dam?.sire?.sire?.dam?.sire?.name || "..."}

                                                    <div className="generation6">
                                                        {/* Maschio Gen 6 */}
                                                        <div className="generation6-male">
                                                            {generationTree.dam?.sire?.sire?.dam?.sire?.sire?.name || "..."}
                                                        </div>

                                                        {/* Femmina Gen 6 */}
                                                        <div className="generation6-female">
                                                            {generationTree.dam?.sire?.sire?.dam?.sire?.dam?.name || "..."}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Femmina Gen 5 */}
                                                <div className="generation5-female">
                                                    {generationTree.dam?.sire?.sire?.dam?.dam?.name || "..."}

                                                    <div className="generation6">
                                                        {/* Maschio Gen 6 */}
                                                        <div className="generation6-male">
                                                            {generationTree.dam?.sire?.sire?.dam?.dam?.sire?.name || "..."}
                                                        </div>

                                                        {/* Femmina Gen 6 */}
                                                        <div className="generation6-female">
                                                            {generationTree.dam?.sire?.sire?.dam?.dam?.dam?.name || "..."}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Femmina Gen 3 */}
                                <div className="generation3-female">
                                    {generationTree.dam?.sire?.dam?.name || "..."}

                                    <div className="generation4">
                                        {/* Maschio Gen 4 */}
                                        <div className="generation4-male">
                                            {generationTree.dam?.sire?.dam?.sire?.name || "..."}

                                            <div className="generation5">
                                                {/* Maschio Gen 5 */}
                                                <div className="generation5-male">
                                                    {generationTree.dam?.sire?.dam?.sire?.sire?.name || "..."}

                                                    <div className="generation6">
                                                        {/* Maschio Gen 6 */}
                                                        <div className="generation6-male">
                                                            {generationTree.dam?.sire?.dam?.sire?.sire?.sire?.name || "..."}
                                                        </div>

                                                        {/* Femmina Gen 6 */}
                                                        <div className="generation6-female">
                                                            {generationTree.dam?.sire?.dam?.sire?.sire?.dam?.name || "..."}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Femmina Gen 5 */}
                                                <div className="generation5-female">
                                                    {generationTree.dam?.sire?.dam?.sire?.dam?.name || "..."}

                                                    <div className="generation6">
                                                        {/* Maschio Gen 6 */}
                                                        <div className="generation6-male">
                                                            {generationTree.dam?.sire?.dam?.sire?.dam?.sire?.name || "..."}
                                                        </div>

                                                        {/* Femmina Gen 6 */}
                                                        <div className="generation6-female">
                                                            {generationTree.dam?.sire?.dam?.sire?.dam?.dam?.name || "..."}

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Femmina Gen 4 */}
                                        <div className="generation4-female">
                                            {generationTree.dam?.sire?.dam?.dam?.name || "..."}

                                            <div className="generation5">
                                                {/* Maschio Gen 5 */}
                                                <div className="generation5-male">
                                                    {generationTree.dam?.sire?.dam?.dam?.sire?.name || "..."}

                                                    <div className="generation6">
                                                        {/* Maschio Genn 6 */}
                                                        <div className="generation6-male">
                                                            {generationTree.dam?.sire?.dam?.dam?.sire?.sire?.name || "..."}

                                                        </div>

                                                        {/* Femmina Gen 6 */}
                                                        <div className="generation6-female">
                                                            {generationTree.dam?.sire?.dam?.dam?.sire?.dam?.name || "..."}

                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Femmina Gen 5 */}
                                                <div className="generation5-female">
                                                    {generationTree.dam?.sire?.dam?.dam?.dam?.name || "..."}

                                                    <div className="generation6">
                                                        {/* Maschio Gen 6 */}
                                                        <div className="generation6-male">
                                                            {generationTree.dam?.sire?.dam?.dam?.dam?.sire?.name || "..."}

                                                        </div>

                                                        {/* Femmina Gen 6 */}
                                                        <div className="generation6-female">
                                                            {generationTree.dam?.sire?.dam?.dam?.dam?.dam?.name || "..."}

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Femmina Gen 2 */}
                        <div className="generation2-female">
                            {generationTree.dam?.dam?.name || "..."}

                            <div className="generation3">
                                {/* Maschio Gen 3 */}
                                <div className="generation3-male">
                                    {generationTree.dam?.dam?.sire?.name || "..."}

                                    <div className="generation4">
                                        {/* Maschio Gen 4 */}
                                        <div className="generation4-male">
                                            {generationTree.dam?.dam?.sire?.sire?.name || "..."}

                                            <div className="generation5">
                                                {/* Maschio Gen 5 */}
                                                <div className="generation5-male">
                                                    {generationTree.dam?.dam?.sire?.sire?.sire?.name || "..."}

                                                    <div className="generation6">
                                                        {/* Maschio Gen 6 */}
                                                        <div className="generation6-male">
                                                            {generationTree.dam?.dam?.sire?.sire?.sire?.sire?.name || "..."}
                                                        </div>

                                                        {/* Femmina Gen 6 */}
                                                        <div className="generation6-female">
                                                            {generationTree.dam?.dam?.sire?.sire?.sire?.dam?.name || "..."}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Femmina Gen 5 */}
                                                <div className="generation5-female">
                                                    {generationTree.dam?.dam?.sire?.sire?.dam?.name || "..."}

                                                    <div className="generation6">
                                                        {/* Maschio Gen 6 */}
                                                        <div className="generation6-male">
                                                            {generationTree.dam?.dam?.sire?.sire?.dam?.sire?.name || "..."}
                                                        </div>

                                                        {/* Femmina Gen 6 */}
                                                        <div className="generation6-female">
                                                            {generationTree.dam?.dam?.sire?.sire?.dam?.dam?.name || "..."}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Femmina Gen 4 */}
                                        <div className="generation4-female">
                                            {generationTree.dam?.dam?.sire?.dam?.name || "..."}

                                            <div className="generation5">
                                                {/* Maschio Gen 5 */}
                                                <div className="generation5-male">
                                                    {generationTree.dam?.dam?.sire?.dam?.sire?.name || "..."}

                                                    <div className="generation6">
                                                        {/* Maschio Gen 6 */}
                                                        <div className="generation6-male">
                                                            {generationTree.dam?.dam?.sire?.dam?.sire?.sire?.name || "..."}
                                                        </div>

                                                        {/* Femmina Gen 6 */}
                                                        <div className="generation6-female">
                                                            {generationTree.dam?.dam?.sire?.dam?.sire?.dam?.name || "..."}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Femmina Gen 5 */}
                                                <div className="generation5-female">
                                                    {generationTree.dam?.dam?.sire?.dam?.dam?.name || "..."}

                                                    <div className="generation6">
                                                        {/* Maschio Gen 6 */}
                                                        <div className="generation6-male">
                                                            {generationTree.dam?.dam?.sire?.dam?.dam?.sire?.name || "..."}
                                                        </div>

                                                        {/* Femmina Gen 6 */}
                                                        <div className="generation6-female">
                                                            {generationTree.dam?.dam?.sire?.dam?.dam?.sire?.dam?.name || "..."}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Femmina Gen 3 */}
                                <div className="generation3-female">
                                    {generationTree.dam?.dam?.dam?.name || "..."}

                                    <div className="generation4">
                                        {/* Maschio Gen 4 */}
                                        <div className="generation4-male">
                                            {generationTree.dam?.dam?.dam?.sire?.name || "..."}

                                            <div className="generation5">
                                                {/* Maschio Gen 5 */}
                                                <div className="generation5-male">
                                                    {generationTree.dam?.dam?.dam?.sire?.sire?.name || "..."}

                                                    <div className="generation6">
                                                        {/* Maschio Gen 6 */}
                                                        <div className="generation6-male">
                                                            {generationTree.dam?.dam?.dam?.sire?.sire?.sire?.name || "..."}
                                                        </div>

                                                        {/* Femmina Gen 6 */}
                                                        <div className="generation6-female">
                                                            {generationTree.dam?.dam?.dam?.sire?.sire?.dam?.name || "..."}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Femmina Gen 5 */}
                                                <div className="generation5-female">
                                                    {generationTree.dam?.dam?.dam?.sire?.dam?.name || "..."}

                                                    <div className="generation6">
                                                        {/* Maschio Gen 6 */}
                                                        <div className="generation6-male">
                                                            {generationTree.dam?.dam?.dam?.sire?.dam?.sire?.name || "..."}
                                                        </div>

                                                        {/* Femmina Gen 6 */}
                                                        <div className="generation6-female">
                                                            {generationTree.dam?.dam?.dam?.sire?.dam?.dam?.name || "..."}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Femmina Gen 4 */}
                                        <div className="generation4-female">
                                            {generationTree.dam?.dam?.dam?.dam?.name || "..."}

                                            <div className="generation5">
                                                {/* Maschio Gen 5 */}
                                                <div className="generation5-male">
                                                    {generationTree.dam?.dam?.dam?.dam?.sire?.name || "..."}

                                                    <div className="generation6">
                                                        {/* Maschio Gen 6 */}
                                                        <div className="generation6-male">
                                                            {generationTree.dam?.dam?.dam?.dam?.sire?.sire?.name || "..."}
                                                        </div>
                                                        <div className="generation6-female">
                                                            {generationTree.dam?.dam?.dam?.dam?.sire?.dam?.name || "..."}

                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Femmina Gen 5 */}
                                                <div className="generation5-female">
                                                    {generationTree.dam?.dam?.dam?.dam?.dam?.name || "..."}

                                                    <div className="generation6">
                                                        {/* Maschio Gen 6 */}
                                                        <div className="generation6-male">
                                                            {generationTree.dam?.dam?.dam?.dam?.dam?.sire?.name || "..."}
                                                        </div>

                                                        {/* Femmina Gen 6 */}
                                                        <div className="generation6-female">
                                                            {generationTree.dam?.dam?.dam?.dam?.dam?.dam?.name || "..."}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>




    </div>;
};

export default PedigreeTree;
