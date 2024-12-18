import placeholder from "../../../../assets/images/dog-silhouette.png"
import "./dogCard.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMars, faVenus } from "@fortawesome/free-solid-svg-icons";
import { useUtils } from "../../../../providers/utilsProvider";
import { Link } from "react-router-dom";

const DogCard = ({ dog }) => {

    const { reduceStr } = useUtils();

    return (
        <div
            className="dog-card"
        >

            {/* Immagine */}
            <figure>
                <img src={dog.image || placeholder} alt="" />
            </figure>

            {/* Card Body */}
            <div className="card-body">

                {/* Name */}
                {dog.name ?
                    <Link
                        to={`/dogDetail/${dog.id}`}
                        className="dogNameLink"
                        onClick={() => window.scrollTo(0, 0)}
                    >
                        <h4>

                            {/* Fino a SM */}
                            <div className="inline sm:hidden">
                                {reduceStr(dog.name, 6)}
                            </div>

                            {/* Da SM a XL */}
                            <div className="hidden sm:inline xl:hidden">
                                {reduceStr(dog.name, 10)}
                            </div>

                            {/* Oltre XL */}
                            <div className="hidden xl:inline">
                                {reduceStr(dog.name, 20)}
                            </div>

                            {/* Sex Icon */}
                            <FontAwesomeIcon
                                icon={dog.sex ? faMars : faVenus}
                                className={`ml-2 ${dog.sex ? "text-[#5398ff]" : "text-[#e55998]"}`}
                            />
                        </h4>
                    </Link>
                    :
                    <h4 className="name-placeholder"></h4>
                }

                {/* Titles */}
                <div>
                    {dog.titles ?
                        <span
                            className="bg-[#73e567] p-1 text-[#095b00] font-bold"
                        >
                            {/* Fino a SM */}
                            <div className="inline sm:hidden">
                                {reduceStr(dog.titles, 10)}
                            </div>

                            {/* Da SM a XL */}
                            <div className="hidden sm:inline xl:hidden">
                                {reduceStr(dog.titles, 18)}
                            </div>

                            {/* Dopo XL */}
                            <div className="hidden xl:inline">
                                {reduceStr(dog.titles, 35)}
                            </div>

                        </span>
                        :
                        <span className="titles-placeholder"></span>}
                </div>
            </div>

        </div>
    )
}
export default DogCard;