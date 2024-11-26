import { Link } from "react-router-dom";
import "./pedigreeTree.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const PedigreeTree = ({ dog }) => {

  const [generationsLength, setGenerationsLength] = useState(4);


  const shortName = (name) => {
    if (name.length > 5) return name.slice(0, 5) + '...'
    return name
  }

  const longName = (name) => {
    if (name.length > 20) return name.slice(0, 20) + "...";
    return name;
  }

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

  const createTable = (dog, processedIds = new Set(), depth = 0, repeteadDogs = []) => {

    if (!dog) {
      return null; // Nessun cane, interrompi la ricorsione.
    }

    // Controlla se il cane è tra i ripetuti
    const isRepeated = dogFrequency.get(dog.id) > 1;

    if (isRepeated) {
      // Aggiungi il cane a `repeteadDogs` se non è già presente
      if (!repeteadDogs.includes(dog.id)) {
        repeteadDogs.push(dog.id);
      }
    } else {
      // Aggiungi il cane ai processati
      processedIds.add(dog.id);
    }

    // Separate sire and dam
    const sire = dog.sire;
    const dam = dog.dam;

    return (
      <div className="generation">
        {/* Current Dog */}
        {depth > 0 && depth <= generationsLength &&
          <div className="current-generation generation-row">
            <div className={`dog-cell ${dog.sex ? "bg-male" : "bg-female"}`}>
              {/* se il cane è ripetuto  */}
              {isRepeated && (
                <div className="repeated-circle"></div>
              )}
              {dog.image && (
                <Link to={`/dogDetail/${dog.id}`}>
                  <img src={dog.image} alt="" />
                </Link>
              )}
              <h3>
                <Link
                  to={`/dogDetail/${dog.id}`}
                  onClick={() => window.scrollTo(0, 0)}
                >
                  {depth < 4 && longName(dog.name)}
                  {depth > 4 && shortName(dog.name)}
                </Link>
              </h3>
              <div>
                {dog.titles && (
                  <p className="bg-[#73e567] text-[#095b00] font-bold inline-block">
                    {dog.titles}
                  </p>
                )}
              </div>
              <div className="relative-country flex items-center gap-2">
                {depth < 4 && (
                  <img
                    src={`https://flagsapi.com/${dog.country.code}/flat/32.png`}
                    alt=""
                  />
                )}
              </div>
            </div>
          </div>
        }


        {/* Parents */}
        <div className="parents generation-row">
          {/* Sire */}
          <div className="dog-cell parent">
            {sire ? (
              createTable(sire, processedIds, depth + 1)
            ) : (
              <div className="placeholder">
                <FontAwesomeIcon icon={faEllipsis}></FontAwesomeIcon>
              </div>
            )}
          </div>

          {/* Dam */}
          <div className="dog-cell parent">
            {dam ? (
              createTable(dam, processedIds, depth + 1)
            ) : (
              <div className="placeholder">
                <FontAwesomeIcon icon={faEllipsis}></FontAwesomeIcon>
              </div>
            )}
          </div>
        </div>
      </div >
    );
  };

  return <div className="pedigree-tree">
    <label >Generations in pedigree:

      <select
        value={generationsLength}
        onChange={e => setGenerationsLength(e.target.value)}
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
    Ancestor tree:
    {createTable(dog)}
  </div>;
};

export default PedigreeTree;

//da completare
//non funziona