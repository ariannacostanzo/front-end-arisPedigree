
import { Link } from "react-router-dom";
import "./nodeTreeLabel.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";

const NodeTreeLabel = ({ dog, resetCard }) => {

    const nodeSize = {
        x: dog.attributes?.depth <= 2 ? 200 : 200,
        y: dog.attributes?.depth <= 2 ? 200 : 150200
    };

    const foreignObjectProps = {
        width: nodeSize.x, // Larghezza cella
        height: nodeSize.y, // Altezza cella
        x: -nodeSize.x / 2, // Posizione asse x
        y: "-25"    // Posizione asse y
    };

    const circleClass = `bg-[${dog.attributes?.circleColor || 'red'}]`

    /**
     * Funzione che abbrevia una stringa alla lunghezza indicata
     * @param {String} word stringa da abbreviare
     * @param {Number} length lunghezza desiderata
     * @returns {String} la stringa abbreviata
     */
    const reduceStr = (word, length) => {
        return word.length > length ? word.substring(0, length) + "..." : word;
    }

    return (
        <g

        >
            <circle r={0} />

            {dog.name !== "Parents" && <foreignObject
                {...foreignObjectProps}
            >
                {dog.name === null ?
                    <div className="placeholder">
                        <FontAwesomeIcon icon={faEllipsis}></FontAwesomeIcon>
                    </div>
                    :
                    <div
                        className={`${dog.attributes?.depth <= 2 ? "flex-col" : "  gap-1"} flex items-center ${dog.attributes?.sex ? 'male' : 'female'} tree-label`}
                        style={{
                            border: "1px solid black",
                            transform: "translateY(10px)"
                        }}
                    >
                        {dog.attributes?.isRepeated && (
                            <div
                                style={{ backgroundColor: dog.attributes?.circleColor || 'red' }}
                                className="repeated-circle"
                            ></div>
                        )}


                        {/* Immagine */}
                        {dog.attributes?.image && (
                            <figure>
                                <button onClick={resetCard}>
                                    <Link
                                        to={`/dogDetail/${dog.attributes?.id}`}
                                    >
                                        <img
                                            className="dog-img"
                                            src={dog.attributes?.image}
                                            alt={dog.name}
                                        />
                                    </Link>
                                </button>
                            </figure>
                        )}

                        <div>

                            {/* Nome cane */}
                            <button onClick={resetCard}>
                                <h3
                                    className="text-center text-[14px]"
                                >
                                    <Link
                                        to={`/dogDetail/${dog.attributes?.id}`}
                                        onClick={() => window.scrollTo(0, 0)}
                                    >
                                        {reduceStr(dog.name, dog.attributes?.depth <= 2 ? 17 : 10)}
                                    </Link>
                                    {dog.attributes?.depth}
                                </h3>
                            </button>

                            {/* Attributi cane */}
                            {dog.attributes && (
                                <ul
                                    style={{
                                        padding: 0,
                                        listStyleType: "none",
                                        margin: "5px 0 0 0"
                                    }}
                                >


                                    {/* Titles */}
                                    {dog.attributes?.titles && (
                                        <li>
                                            <p className="bg-[#73e567] text-[#095b00] font-bold inline-block text-[14px] rounded">
                                                {reduceStr(dog.attributes?.titles, dog.attributes?.depth <= 2 ? 17 : 5)}
                                            </p>
                                        </li>
                                    )}

                                    {/* Country */}
                                    {dog.attributes?.country && (
                                        <li>
                                            <img
                                                className="flag-img"
                                                src={`https://flagsapi.com/${dog.attributes.country}/flat/32.png`}
                                                alt=""
                                            />
                                        </li>
                                    )}

                                </ul>
                            )}
                        </div>

                    </div>}
            </foreignObject>}
        </g>
    )
}
export default NodeTreeLabel;