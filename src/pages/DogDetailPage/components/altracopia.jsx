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

    // Raccolgo i figli
    const children = [];
    if (dog.childrenAsSire) {
      children.push(...dog.childrenAsSire);
    }
    if (dog.childrenAsDam) {
      children.push(...dog.childrenAsDam);
    }

    return (
      <div className="generation">
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

        {/* Current Dog and Siblings */}
        <div className="current-generation generation-row">
          <div className={`dog-cell ${dog.sex ? "bg-male" : "bg-female"}`}>
            <img src={dog.image ? dog.image : ""} alt="" />
            <Link
              to={`/dogDetail/${dog.id}`}
              onClick={() => window.scrollTo(0, 0)}
            >
              {dog.name}
            </Link>
          </div>
          {filteredSiblings.map((sibling, i) => (
            <div
              key={`sibling${i}`}
              className={`dog-cell ${
                sibling.sex ? "bg-male" : "bg-female"
              } sibling`}
            >
              <Link
                to={`/dogDetail/${sibling.id}`}
                onClick={() => window.scrollTo(0, 0)}
              >
                {sibling.name} - {sibling.sex ? "fratello" : "sorella"}
              </Link>
            </div>
          ))}
        </div>

        {/* Children */}
        <div className="children generation-row">
          {children.length > 0 ? (
            children.map((child) => (
              <div key={child.id} className="dog-cell child">
                {createTable(child, processedIds)}
              </div>
            ))
          ) : (
            <div className="placeholder">---</div>
          )}
        </div>
      </div>
    );
  };

  return <div className="pedigree-tree">{createTable(dog)}</div>;
};

export default PedigreeTree;
