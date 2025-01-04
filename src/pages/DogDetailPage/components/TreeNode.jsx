import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import dogPlaceholder from "../../../assets/images/dog-silhouette.png";
import { Link } from "react-router-dom";
import "./treeNode.scss";
import { useUtils } from "../../../providers/utilsProvider";
import kosovoFlag from "../../../assets/images/kosovo-flag.png";



const TreeNode = ({ dog, generationsLength }) => {

    // Funzione per abbreviare le stringhe
    const { reduceStr } = useUtils();


    const cardHeight = (() => {
        switch (dog?.depth) {
            case 1: return "200px";
            case 2: return "160px";
            case 3: return "100px";
            case 4: return "40px";
            default: return "40px";
        }
    })();




    return (
        <div className="tree-node pr-4">
            {dog === null || dog?.name === null ?

                // Card Placeholder
                <div
                    style={{ height: cardHeight }}
                    className="card-placeholder flex justify-center items-center px-2 py-1 border rounded-md border-black"
                >
                    <FontAwesomeIcon icon={faEllipsis} />
                </div>
                :

                // Card Dog
                <div
                    style={{ height: cardHeight }}
                    className={`card-dog flex ${dog.depth <= 2 ? "flex-col" : "items-center gap-2"} justify-center gap-y-2 relative px-2 py-1 border rounded-md border-black ${dog.sex ? "male" : "female"}`}
                >

                    {/* Pallino di ripetizione */}
                    {dog.isRepeated && (
                        <div
                            style={{ backgroundColor: dog.circleColor || 'red' }}
                            className="repeated-circle"
                        ></div>
                    )}

                    {/* Immagine */}
                    {dog.depth < 5 &&
                        <figure
                            className={`${dog.depth >= 3 ? "hidden" : ""}`}
                        >
                            <button>
                                <Link
                                    to={`/dogDetail/${dog.id}`}
                                >
                                    <img
                                        className="dog-img"
                                        src={dog.image || dogPlaceholder}
                                        alt={dog.name}
                                    />
                                </Link>
                            </button>
                        </figure>
                    }

                    <div className={`flex items-center ${dog.depth >= 5 ? "flex-row" : "flex-col"}`}>
                        {/* Nome */}
                        <h4 className="text-center text-[12px] font-bold">
                            <Link
                                to={`/dogDetail/${dog.id}`}
                                onClick={() => window.scrollTo(0, 0)}
                            >
                                {reduceStr(dog.name, dog.depth <= 2 ? 17 : 10)}
                            </Link>
                        </h4>

                        {/* Titles */}
                        {dog.depth < 5 && (dog.titles ? (
                            <p className="bg-[#73e567] text-[#095b00] font-bold inline-block text-[10px] rounded px-1">
                                {reduceStr(dog.titles, dog.depth <= 2 ? 17 : 15)}
                            </p>
                        )
                            :
                            (
                                <p className="bg-[#73e567] text-[#095b00] font-bold inline-block text-[10px] rounded px-1">
                                //
                                </p>
                            ))
                        }

                        {/* Country */}
                        {dog.country && (
                            <img
                                className={`flag-img ${dog.depth <= 2 ? 'mx-auto' : ''} ${dog.country === "XK" ? "mt-1" : ""}`}
                                src={dog.country === "XK" ? kosovoFlag : `https://flagsapi.com/${dog.country}/flat/32.png`}
                                alt={dog.country}
                            />
                        )}

                    </div>
                </div>
            }


        </div>
    )
}
export default TreeNode;