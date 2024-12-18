import { Link } from "react-router-dom";
import "../components/listOfRelative.scss";

const Offspring = ({ dog }) => {
  const createTable = (dog, processedIds = new Set()) => {
    if (!dog || processedIds.has(dog.id)) return null;

    processedIds.add(dog.id);

    // Raccolgo i figli
    const children = [];
    if (dog.childrenAsSire) {
      children.push(...dog.childrenAsSire);
    }
    if (dog.childrenAsDam) {
      children.push(...dog.childrenAsDam);
    }


    return (
      <div className="">
        {/* Children */}
        {children.length === 0 ? (
          <div className="p-4">{dog.name} has no descendents</div>
        ) : (
          <div> Descendents of {dog.name}: </div>
        )}

        {children.map((child, i) => (
          <div key={`child${i}`} className={`list-of-relative-card`}>
            <div>
              <h3>
                <Link
                  to={`/dogDetail/${child.id}`}
                  onClick={() => window.scrollTo(0, 0)}
                >
                  {child.name}
                </Link>
              </h3>
              <div className="dog-title-relative">
                {child.titles && (
                  <p className="bg-[#73e567] text-[#095b00] font-bold inline-block">
                    {child.titles}
                  </p>
                )}
              </div>
              <div className="relative-country flex items-center gap-2">
                <img
                  src={`https://flagsapi.com/${child.country.code}/flat/32.png`}
                  alt={child.country.code}
                />
                {child.country.name}
              </div>
            </div>
            <div
              className={`colored-circle ${child.sex ? "bg-male" : "bg-female"
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
export default Offspring;
