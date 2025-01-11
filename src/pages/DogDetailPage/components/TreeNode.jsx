import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import dogPlaceholder from "../../../assets/images/dog-silhouette.png";
import { Link } from "react-router-dom";
import "./treeNode.scss";
import { useUtils } from "../../../providers/utilsProvider";
import kosovoFlag from "../../../assets/images/kosovo-flag.png";

const TreeNode = ({ dog }) => {
  // Funzione per abbreviare le stringhe
  const { reduceStr } = useUtils();

  //   const cardHeight = (() => {
  //     switch (dog?.depth) {
  //       case 1:
  //         return "200px";
  //       case 2:
  //         return "160px";
  //       case 3:
  //         return "100px";
  //       case 4:
  //         return "40px";
  //       default:
  //         return "40px";
  //     }
  //   })();
  const cardHeight = (() => {
    switch (dog?.depth) {
      case 1:
        return "40vh";
      case 2:
        return "20vh";
      case 3:
        return "10vh";
      case 4:
        return "5vh";
      default:
        return "3.125";
    }
  })();

  const imgWidth = (() => {
    switch (dog?.depth) {
      case 1:
        return "img-large";
      case 2:
        return "img-medium";
      case 3:
        return "img-small";
      case 4:
        return "img-extrasmall";
      default:
        return "img-none";
    }
  })();

  return (
    <div className="tree-node  h-full">
      {dog === null || dog?.name === null ? (
        // Card Placeholder
        <div
          style={{ height: cardHeight }}
          className="card-placeholder flex justify-center items-center "
        >
          <FontAwesomeIcon icon={faEllipsis} />
        </div>
      ) : (
        // Card Dog
        <div
          style={{ height: cardHeight }}
          className={`card-dog flex items-center ${
            dog.depth <= 2
              ? "flex-col justify-center"
              : "items-center justify-evenly gap-2"
          } gap-y-2 relative  ${dog.sex ? "male" : "female"}`}
        >
          {/* Pallino di ripetizione */}
          {dog.isRepeated && (
            <div
              style={{ backgroundColor: dog.circleColor || "red" }}
              className="repeated-circle"
            ></div>
          )}

          {/* Immagine */}
          {dog.depth < 5 && (
            <figure className="flex-shrink-0">
              <button>
                <Link to={`/dogDetail/${dog.id}`}>
                  <img
                    className={`dog-img ${imgWidth}`}
                    src={dog.image || dogPlaceholder}
                    alt={dog.name}
                  />
                </Link>
              </button>
            </figure>
          )}

          <div
            className={`flex items-center ${
              dog.depth >= 5 ? "flex-row" : "flex-col"
            }`}
          >
            {/* Nome */}
            <h4 className="text-center font-bold">
              <Link
                to={`/dogDetail/${dog.id}`}
                onClick={() => window.scrollTo(0, 0)}
              >
                {reduceStr(dog.name, dog.depth <= 2 ? 17 : 10)}
              </Link>
            </h4>

            {/* Titles */}
            {dog.depth < 5 && dog.titles && (
              <p className="bg-[#73e567] text-[#095b00] font-bold inline-block rounded px-1">
                {reduceStr(dog.titles, dog.depth <= 2 ? 17 : 15)}
              </p>
            )}
          </div>
          {/* Country */}
          {dog.country && (
            <img
              className={`flag-img ${dog.depth <= 2 ? "mx-auto" : ""} ${
                dog.country === "XK" ? "mt-1" : ""
              }`}
              src={
                dog.country === "XK"
                  ? kosovoFlag
                  : `https://flagsapi.com/${dog.country}/flat/32.png`
              }
              alt={dog.country}
            />
          )}
        </div>
      )}
    </div>
  );
};
export default TreeNode;
