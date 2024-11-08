import { Link } from "react-router-dom";
import "./pedigreeTree.scss";

const PedigreeTree = ({ dog }) => {
  const createTable = (dog, processedIds = new Set()) => {
    if (!dog || processedIds.has(dog.id)) return null;

    processedIds.add(dog.id);

    // Raccolgo i genitori
    const parents = [];
    if (dog.sire) {
      parents.push(dog.sire);
    }
    if (dog.dam) {
      parents.push(dog.dam);
    }
    console.log(parents);

    console.log(parents)

    return (
      <div className="generation">
        {/* Current Dog */}
        <div className="current-generation generation-row">
          <div className={`dog-cell ${dog.sex ? "bg-male" : "bg-female"}`}>
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
          {parents.length > 0 ? (
            parents.map((parent) => (
              <div key={parent.id} className="dog-cell parent">
                {createTable(parent, processedIds)}
              </div>
            ))
          ) : (
            <>
              <div className="placeholder">---</div>
              <div className="placeholder">---</div>
            </>
          )}
        </div>
      </div>
    );
  };

  return <div className="pedigree-tree">Ancestor tree: {createTable(dog)}</div>;
};

export default PedigreeTree;

//da completare
