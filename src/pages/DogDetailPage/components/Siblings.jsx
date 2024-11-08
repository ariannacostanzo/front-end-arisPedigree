import { Link } from "react-router-dom";
import "./listOfRelative.scss";

const Siblings = ({ dog }) => {
  const createTable = (dog, processedIds = new Set()) => {
    if (!dog || processedIds.has(dog.id)) return null;

    processedIds.add(dog.id);

    const siblings = [];
    if (dog.sire) {
      // Aggiungo i figli del sire se non sono già presenti
      dog.sire.childrenAsSire?.forEach((sireChild) => {
        if (!siblings.some((sibling) => sibling.id === sireChild.id)) {
          siblings.push(sireChild);
        }
      });
    }
    if (dog.dam) {
      // Aggiungo i figli della dam se non sono già presenti
      dog.dam.childrenAsDam?.forEach((damChild) => {
        if (!siblings.some((sibling) => sibling.id === damChild.id)) {
          siblings.push(damChild);
        }
      });
    }
    // Filtro i fratelli escludendo il cane corrente
    const filteredSiblings = siblings.filter(
      (sibling) => sibling.id !== dog.id
    );

    return (
      <div className="">
        {/* Current Dog and Siblings */}
        {filteredSiblings.length === 0 ? (
          <div>{dog.name} has no siblings</div>
        ) : (
          <div> Siblings of {dog.name}: </div>
        )}
        {filteredSiblings.map((sibling, i) => (
          <div key={`sibling${i}`} className={`list-of-relative-card`}>
            <div>
              <h3>
                <Link
                  to={`/dogDetail/${sibling.id}`}
                  onClick={() => window.scrollTo(0, 0)}
                >
                  {sibling.name}
                </Link>
              </h3>
              <div className="dog-title-relative">
                {sibling.titles && (
                  <p className="bg-[#73e567] text-[#095b00] font-bold inline-block">
                    {sibling.titles}
                  </p>
                )}
              </div>
              <div className="relative-country flex items-center gap-2">
                <img
                  src={`https://flagsapi.com/${sibling.country.code}/flat/32.png`}
                  alt=""
                />
                {sibling.country.name}
              </div>
            </div>
            <div
              className={`colored-circle ${
                sibling.sex ? "bg-male" : "bg-female"
              }`}
            ></div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      {createTable(dog)}
    </div>
  );
};
export default Siblings;


//farlo sia in verticale che in orizzontale
//fare apparire la tabella per tutti quelli che non hanno genitori
//in caso fare una tabella che puo fare overflow x
//per ogni cane ci deve essere la casella vuota se non c'è la madre, tutto deve essere diviso ad albero
//i cani dobbiati ci devono essere e devono avere un pallino
//l'albero genealogico si deve fermare ad 8
//si deve scegliere se farne vedere piàù di 4
