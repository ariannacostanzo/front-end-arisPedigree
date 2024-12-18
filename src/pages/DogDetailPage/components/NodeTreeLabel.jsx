
import { Link } from "react-router-dom";
import "./nodeTreeLabel.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import dogPlaceholder from "../../../assets/images/dog-silhouette.png";
import { useDogs } from "../../../providers/dogsProvider";
import { useUtils } from "../../../providers/utilsProvider";

const NodeTreeLabel = ({ dog, resetCard }) => {

    const { currId, setCurrId } = useDogs();

    const { reduceStr } = useUtils();

    const nodeSize = {
        x: dog.attributes?.depth <= 2 ? 200 : 200,
        y: dog.attributes?.depth <= 2 ? 200 : 150
    };



    const foreignObjectProps = {
        width: nodeSize.x, // Larghezza cella
        height: nodeSize.y, // Altezza cella
        x: -nodeSize.x / 2, // Posizione asse x
        y: -25   // Posizione asse y
    };

    let treeLabelHeight;

    if (dog.attributes) {
        const generation = dog.attributes.depth;
        switch (generation) {
            case 1:
                foreignObjectProps.y = -100;
                treeLabelHeight = "180px"
                break;
            case 2:
                foreignObjectProps.y = -85;
                treeLabelHeight = "150px"
                break;
            case 3:
                foreignObjectProps.y = -60;
                treeLabelHeight = "100px"
                break;
            case 4:
                foreignObjectProps.y = -55;
                treeLabelHeight = "90px"
                break;
            default:
                foreignObjectProps.y = -35;
                treeLabelHeight = "50px"
        }

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
                        onMouseEnter={() => setCurrId(dog.attributes?.id)}
                        onMouseLeave={() => setCurrId(0)}
                        className={`${currId === dog.attributes?.id ? "marked-label" : ""} ${dog.attributes?.depth <= 2 ? "flex-col justify-between" : "  gap-1"} flex items-center ${dog.attributes?.sex ? 'male' : 'female'} tree-label`}
                        style={{
                            height: treeLabelHeight,
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
                        {dog.attributes?.depth < 5 && (
                            <figure>
                                <button onClick={resetCard}>
                                    <Link
                                        to={`/dogDetail/${dog.attributes?.id}`}
                                    >
                                        <img
                                            className="dog-img"
                                            src={dog.attributes?.image || dogPlaceholder}
                                            alt={dog.name}
                                        />
                                    </Link>
                                </button>
                            </figure>

                        )
                        }

                        <div className={`${dog.attributes?.depth <= 2 ? 'text-center' : 'ml-1'} ${dog.attributes?.depth >= 5 ? "flex grow justify-between items-center gap-2" : ""}`}>

                            {/* Nome cane */}
                            <button onClick={resetCard}>
                                <h3
                                    className=" text-[14px] font-bold"
                                >
                                    <Link
                                        to={`/dogDetail/${dog.attributes?.id}`}
                                        onClick={() => window.scrollTo(0, 0)}
                                    >
                                        {reduceStr(dog.name, dog.attributes?.depth <= 2 ? 17 : 10)}
                                    </Link>
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
                                    {dog.attributes?.depth < 5 && (dog.attributes?.titles ? (
                                        <li>
                                            <p className="bg-[#73e567] text-[#095b00] font-bold inline-block text-[14px] rounded">
                                                {reduceStr(dog.attributes?.titles, dog.attributes?.depth <= 2 ? 17 : 15)}
                                            </p>
                                        </li>
                                    )
                                        :
                                        (
                                            <li>
                                                <p className=" font-bold inline-block text-[14px] rounded">

                                                </p>
                                            </li>
                                        ))
                                    }

                                    {/* Country */}
                                    {dog.attributes?.country && (
                                        <li>
                                            <img
                                                className={`flag-img ${dog.attributes?.depth <= 2 ? 'mx-auto' : ''}`}
                                                src={`https://flagsapi.com/${dog.attributes.country}/flat/32.png`}
                                                alt={dog.attributes.country}
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