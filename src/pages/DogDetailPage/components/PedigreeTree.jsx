import { Link } from "react-router-dom";
import "./pedigreeTree.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";

const PedigreeTree = ({ dog }) => {
  const createTable = (dog, processedIds = new Set()) => {
    const repeteadDogs = [];

    if (!dog || processedIds.has(dog.id)) {
      repeteadDogs.push(dog.id)
    }
      

    processedIds.add(dog.id);

    // Separate sire and dam
    const sire = dog.sire;
    const dam = dog.dam;

    console.log(sire)
    console.log(dam)

    return (
      <div className="generation">
        {/* Current Dog */}
        <div className="current-generation generation-row">
          <div className={`dog-cell ${dog.sex ? "bg-male" : "bg-female"}`}>
            {/* se il cane è ripetuto  */}
            {repeteadDogs.includes(dog.id) && <div className="repeated-circle"></div>}
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
                {dog.name}
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
              <img
                src={`https://flagsapi.com/${dog.country.code}/flat/32.png`}
                alt=""
              />
              {dog.country.name}
            </div>
          </div>
        </div>

        {/* Parents */}
        <div className="parents generation-row">
          {/* Sire */}
          <div className="dog-cell parent">
            {sire ? (
              createTable(sire, processedIds)
            ) : (
              <div className="placeholder">
                <FontAwesomeIcon icon={faEllipsis}></FontAwesomeIcon>
              </div>
            )}
          </div>

          {/* Dam */}
          <div className="dog-cell parent">
            {dam ? (
              createTable(dam, processedIds)
            ) : (
              <div className="placeholder">
                <FontAwesomeIcon icon={faEllipsis}></FontAwesomeIcon>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return <div className="pedigree-tree">Ancestor tree: {createTable(dog)}</div>;
};

export default PedigreeTree;

//da completare
