import React from "react";
import { motion } from "motion/react";


const WebsiteInfo = ({ packagesCount, travellers,destinationCount }) => {
    return (
        <>
            <div className="flex flex-wrap justify-evenly items-center gap-6 p-10 rounded-lg shadow-lg mb-10">
                {/* Available Packages */}
                <div className="flex flex-col items-center text-center">
                    <motion.h1
                        whileInView={{ opacity: 1, y: 0 }}
                        initial={{ opacity: 0, y: -150 }}
                        transition={{ duration: 2 }}
                        className="my-4 font-bold text-5xl text-blue-600"
                    >
                        {packagesCount}
                    </motion.h1>
                    <h1 className="font-medium text-2xl text-gray-700">
                        Available Packages
                    </h1>
                </div>

                {/* Total Destinations */}
                <div className="flex flex-col items-center text-center">
                    <motion.h1
                        whileInView={{ opacity: 1, y: 0 }}
                        initial={{ opacity: 0, y: -200 }}
                        transition={{ duration: 2 }}
                        className="my-4 font-bold text-5xl text-blue-600"
                    >
                        {destinationCount.destination_count}
                    </motion.h1>
                    <p
                        className="font-medium text-2xl text-gray-700"
                    >
                        Total Destinations
                    </p>
                </div>

                {/* Monthly Travellers */}
                <div className="flex flex-col items-center text-center">
                    <motion.h1
                        whileInView={{ opacity: 1, y: 0 }}
                        initial={{ opacity: 0, y: -240 }}
                        transition={{ duration: 2 }}
                        className="my-4 font-bold text-5xl text-blue-600"
                    >
                        {Number(travellers.current_month_count) +
                            Number(travellers.previous_month_count)}
                    </motion.h1>
                    <p
                        className="font-medium text-2xl text-gray-700"
                    >
                        Monthly Travellers
                    </p>
                </div>

                
            </div>

        </>
    );
};

export default WebsiteInfo;
