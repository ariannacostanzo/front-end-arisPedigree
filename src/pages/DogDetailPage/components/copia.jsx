import { Link } from "react-router-dom";
import "./pedigreeTree.scss";
import React, { useEffect } from "react";

const PedigreeTree = ({ dog }) => {
  const createTable = (dog) => {
    if (!dog) return null;

    //raccolgo i fratelli
    const siblings = [];
    if (dog.sire) {
      siblings.push(...(dog.sire.childrenAsSire || []));
    }
    if (dog.dam) {
      siblings.push(...(dog.dam.childrenAsDam || []));
    }
    const filteredSiblings = siblings.filter(
      (sibling) => sibling.id !== dog.id
    ); // Escludo il cane attuale

    //raccolgo i genitori
    const parents = [];
    if (dog.sire) {
      parents.push(dog.sire);
    }
    if (dog.dam) {
      parents.push(dog.dam);
    }

    //raccolgo i nonni
    const grandparents = [];
    if (dog.sire) {
      if (dog.sire.sire) grandparents.push(dog.sire.sire);
      if (dog.sire.dam) grandparents.push(dog.sire.dam);
    }
    if (dog.dam) {
      if (dog.dam.sire) grandparents.push(dog.dam.sire);
      if (dog.dam.dam) grandparents.push(dog.dam.dam);
    }

    //raccolgo i bisnonni
    const grandgrandparents = [];
    if (grandparents.length > 0) {
      grandparents.forEach((grandparent) => {
        if (
          grandparent.sire &&
          !grandgrandparents.some(
            (ancestor) => ancestor.id === grandparent.sire.id
          )
        ) {
          grandgrandparents.push(grandparent.sire);
        }
        if (
          grandparent.dam &&
          !grandgrandparents.some(
            (ancestor) => ancestor.id === grandparent.dam.id
          )
        ) {
          grandgrandparents.push(grandparent.dam);
        }
      });
    }

    //raccolgo i figli
    const children = [];
    if (dog.childrenAsSire) {
      dog.childrenAsSire.forEach((child) => {
        children.push(child);
      });
    }
    if (dog.childrenAsDam) {
      dog.childrenAsDam.forEach((child) => {
        children.push(child);
      });
    }

    // raccolgo i nipoti
    const grandChildren = [];
    if (children.length > 0) {
      children.forEach((grandchild) => {
        if (grandchild.childrenAsDam) {
          grandChildren.push(...grandchild.childrenAsDam);
        }
        if (grandchild.childrenAsSire) {
          grandChildren.push(...grandchild.childrenAsSire);
        }
      });
    }

    console.log(grandgrandparents, "bisnonni");
    console.log(grandparents, "nonni");
    console.log(parents, "genitori");
    console.log(filteredSiblings, "fratelli");
    console.log(children, "figli");
    console.log(grandChildren, "nipoti");

    return (
      <React.Fragment key={dog.id}>
        {/* bisnonni  */}
        {grandgrandparents.map((grandgrandparent, i) => (
          <div
            key={`granparent${i}`}
            className={`${dog.sex ? "bg-[#99ffff]" : "bg-[#ffb6ac]"} dog-cell`}
          >
            <Link
              to={`/dogDetail/${grandgrandparent.id}`}
              onClick={() => window.scrollTo(0, 0)}
            >
              {grandgrandparent.name} -{" "}
              {grandgrandparent.sex ? "bisnonno" : "bisnonna"}
            </Link>
          </div>
        ))}

        {/*nonni */}
        {grandparents.map((grandparent, i) => (
          <div
            key={`granparent${i}`}
            className={`${dog.sex ? "bg-[#99ffff]" : "bg-[#ffb6ac]"} dog-cell`}
          >
            <Link
              to={`/dogDetail/${grandparent.id}`}
              onClick={() => window.scrollTo(0, 0)}
            >
              {grandparent.name} - {grandparent.sex ? "nonno" : "nonna"}
            </Link>
          </div>
        ))}

        {/*genitori  */}
        {parents.map((parent, i) => (
          <div
            key={`parent${i}`}
            className={`${dog.sex ? "bg-[#99ffff]" : "bg-[#ffb6ac]"} dog-cell`}
          >
            <Link
              to={`/dogDetail/${parent.id}`}
              onClick={() => window.scrollTo(0, 0)}
            >
              {parent.name} - {parent.sex ? "padre" : "madre"}
            </Link>
          </div>
        ))}

        {/* cane corrente  */}
        <div
          className={`${dog.sex ? "bg-[#99ffff]" : "bg-[#ffb6ac]"} dog-cell`}
        >
          <Link
            to={`/dogDetail/${dog.id}`}
            onClick={() => window.scrollTo(0, 0)}
          >
            {dog.name} - cane corrente
          </Link>
        </div>

        {/* fratelli  */}
        {filteredSiblings.map((sibling, i) => (
          <div
            key={`sibling${i}`}
            className={`${dog.sex ? "bg-[#99ffff]" : "bg-[#ffb6ac]"} dog-cell`}
          >
            <Link
              to={`/dogDetail/${sibling.id}`}
              onClick={() => window.scrollTo(0, 0)}
            >
              {sibling.name} - {sibling.sex ? "fratello" : "sorella"}
            </Link>
          </div>
        ))}

        {/* figli  */}

        {children.map((child, i) => (
          <div
            key={`child${i}`}
            className={`${dog.sex ? "bg-[#99ffff]" : "bg-[#ffb6ac]"} dog-cell`}
          >
            <Link
              to={`/dogDetail/${child.id}`}
              onClick={() => window.scrollTo(0, 0)}
            >
              {child.name} - {child.sex ? "figlio" : "figlia"}
            </Link>
          </div>
        ))}

        {/* nipoti  */}
        {grandChildren.map((grandchild, i) => (
          <div
            key={`grandchild${i}`}
            className={`${dog.sex ? "bg-[#99ffff]" : "bg-[#ffb6ac]"} dog-cell`}
          >
            <Link
              to={`/dogDetail/${grandchild.id}`}
              onClick={() => window.scrollTo(0, 0)}
            >
              {grandchild.name} -{" "}
              {grandchild.sex ? "nipote maschio" : "nipote femmina"}
            </Link>
          </div>
        ))}
      </React.Fragment>
    );
  };

  useEffect(() => {
    createTable(dog);
  }, []);

  return (
    <>
      <div>{createTable(dog)}</div>
    </>
  );
};
export default PedigreeTree;

// 25.000 in 13 mensilità , più o meno 1400
// contratto di 3 anni di apprendistato
// livello d2
// incluso
//il 12 novembre
//da sistemare
