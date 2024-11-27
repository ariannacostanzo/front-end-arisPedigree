
import { Link } from "react-router-dom";
import "./nodeTreeLabel.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import React, { useRef, useState, useEffect } from "react";

const NodeTreeLabel = ({ dog, resetCard }) => {

    const nodeSize = { x: 200, y: 200 };

    const foreignObjectProps = {
        width: nodeSize.x,
        height: nodeSize.y,
        x: -nodeSize.x / 2,
        y: "-25"
    };

    console.log(dog)
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
                        className={`${dog.attributes?.sex ? 'male' : 'female'} tree-label`}
                        style={{
                            border: "1px solid black",
                            transform: "translateY(10px)"
                        }}
                    >
                        {dog.attributes?.isRepeated && (
                            <div className="repeated-circle"></div>
                        )}

                        {/* Nome cane */}
                        <button onClick={resetCard}>
                            <h3 style={{ textAlign: "center" }}>
                                <Link
                                    to={`/dogDetail/${dog.attributes?.id}`}
                                    onClick={() => window.scrollTo(0, 0)}
                                >
                                    {dog.name}
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
                                {/* Immagine */}
                                {dog.attributes?.image && (
                                    <li>
                                        <button onClick={resetCard}>
                                            <Link
                                                to={`/dogDetail/${dog.attributes?.id}`}
                                            >
                                                <img src={dog.attributes?.image} alt={dog.name}></img>
                                            </Link>
                                        </button>
                                    </li>
                                )}

                                {/* Titles */}
                                {dog.attributes?.titles && (
                                    <li>
                                        <p className="bg-[#73e567] text-[#095b00] font-bold inline-block">
                                            {dog.attributes?.titles}
                                        </p>
                                    </li>
                                )}

                                {/* Country */}
                                {dog.attributes?.country && (
                                    <li>
                                        <img
                                            src={`https://flagsapi.com/${dog.attributes.country}/flat/32.png`}
                                            alt=""
                                        />
                                    </li>
                                )}

                            </ul>
                        )}
                    </div>}
            </foreignObject>}
        </g>
    )
}
export default NodeTreeLabel;