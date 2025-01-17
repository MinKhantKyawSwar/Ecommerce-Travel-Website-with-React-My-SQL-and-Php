import React, { useState } from "react";
import { Link } from "react-router-dom";

const Topdata = ({ topDataDestinations, handleDetails }) => {
    return (
        <>
            <section className="mb-4">
                {/* Carousel Container */}
                <div className="carousel carousel-center gap-2 rounded-box relative sm:p-3 lg:p-4">
                    {/* Grid for Destinations */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2">
                        {topDataDestinations.map((destination, index) => (
                            <div
                                className="relative shadow-sm rounded-lg border overflow-hidden h-48 sm:h-[12rem] md:h-[14rem] lg:h-[16rem] p-1"
                                key={index}
                            >
                                <div className="relative w-full h-full bg-cover bg-center bg-no-repeat carousel-item">
                                    <img
                                        src={`http://localhost:3000/backend/${destination.destination_image}`}
                                        alt={destination.city}
                                        className="w-full h-full object-cover rounded-lg"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                                    <div className="absolute bottom-2 left-2 right-2 text-white pb-1 rounded-lg shadow-sm">
                                        <div className="flex flex-col sm:flex-row justify-between h-full">
                                            <div className="mb-1">
                                                <h3 className="text-xs sm:text-sm font-bold">
                                                    {destination.city}
                                                </h3>
                                                <p className="text-xs text-gray-300">{destination.country}</p>
                                            </div>
                                            <div className="mb-2">
                                                <span className="flex mt-1 gap-1 px-2 py-1 bg-yellow-500 text-white text-xs font-semibold rounded-md">
                                                    <p>from</p>${destination.price}
                                                </span>
                                            </div>
                                        </div>
                                        <button
                                            className="w-full px-2 py-1 hover:text-black hover:bg-gray-100 rounded-md border-white border bg-transparent text-white text-xs transition duration-200"
                                            onClick={() => handleDetails(destination.destination_id)}
                                        >
                                            View Details
                                        </button>
                                    </div>
                                    <span className="absolute top-2 right-2 bg-white/50 backdrop-blur-md backdrop-saturate-150 border border-gray-200 text-black text-xs font-semibold px-1 py-1 rounded-md flex items-center">
                                        ⭐ {destination.rating}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>


            </section>
        </>
    );
};

export default Topdata;
