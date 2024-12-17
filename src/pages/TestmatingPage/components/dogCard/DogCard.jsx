import placeholder from "../../../../assets/images/dog-silhouette.png"
import "./dogCard.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMars, faSpinner, faVenus } from "@fortawesome/free-solid-svg-icons";
import { useUtils } from "../../../../providers/utilsProvider";
import { Link } from "react-router-dom";

const DogCard = ({ dog }) => {

    const { reduceStr } = useUtils();

    return (
        <div
            className="dog-card"
        >
            <figure>
                <img src={dog.image || placeholder} alt="" />
            </figure>
            <div className="card-body">
                {dog.name ?
                    <Link
                        to={`/dogDetail/${dog.id}`}
                        className="dogNameLink"
                        onClick={() => window.scrollTo(0, 0)}
                    >
                        <h4>{reduceStr(dog.name, 6)}
                            <FontAwesomeIcon
                                icon={dog.sex ? faMars : faVenus}
                                className={`ml-2 ${dog.sex ? "text-[#5398ff]" : "text-[#e55998]"}`}
                            />
                        </h4>
                    </Link>
                    :
                    <h4 className="name-placeholder"></h4>
                }
                <div>
                    {dog.titles ?
                        <span
                            className="bg-[#73e567] p-1 text-[#095b00] font-bold"
                        >
                            {reduceStr(dog.titles, 10)}
                        </span>
                        :
                        <span className="titles-placeholder"></span>}
                </div>
            </div>

        </div>
    )
}
export default DogCard;