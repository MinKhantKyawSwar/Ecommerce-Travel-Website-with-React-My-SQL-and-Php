import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // For accessing URL params

const CustomerDetailsPage = () => {
    const { userId } = useParams(); // Accessing userId from URL
    const [customer, setCustomer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [bookedData, setBookedData] = useState([]);

    useEffect(() => {
        const getCustomerDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/backend/getCustomerDetails.php?user_id=${userId}`);
                if (response.data.status === 1) {
                    setCustomer(response.data.data);
                } else {
                    setError("Customer not found");
                }
            } catch (err) {
                setError("Failed to fetch data: " + err.message);
            } finally {
                setLoading(false);
            }
        };

        getCustomerDetails();
    }, [userId]);

    const fetchBookingData = async () => {
        try {
            const response = await axios.get(
                "http://localhost:3000/backend/getBooking.php",
                {
                    headers: {
                        User_Id: localStorage.getItem("user_id"),
                    },
                }
            );
            if (response.data.status === 1) {
                setBookedData(response.data.data); // Assuming the response contains bookings
            } else {
                // console.error(response.data.message);
            }
        } catch (error) {
            console.error("Error fetching booking data:", error);
        }
    };

    useEffect(() => {
        fetchBookingData();
    }, []);

    // If loading, display loading spinner
    if (loading) return <div>Loading...</div>;

    // If there's an error, display error message
    if (error) return <div>{error}</div>;

    return (
        <>
            <div className="p-6 rounded-lg bg-white dark:bg-neutral-900 shadow-xl">
                <h2 className="text-3xl font-semibold text-center text-gray-900 dark:text-white mb-6">Customer Details</h2>

                {/* Customer Info Section */}
                <div className="flex gap-8 mb-6">
                    {/* Profile Picture */}
                    <div className="flex-shrink-0">
                        <img
                            src={`http://localhost:3000/backend/${customer.profile_image}`}
                            alt="Profile"
                            className="rounded-full w-36 h-36 object-cover border-4 border-gray-200 dark:border-gray-700"
                        />
                    </div>

                    {/* Customer Info */}
                    <div className="flex flex-col justify-center text-center md:text-left">
                        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">{customer.username}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{customer.email}</p>
                        <span className="text-sm text-gray-600 dark:text-gray-400">Role: {customer.role}</span>

                        {/* Status Badge */}
                        <span
                            className={`mt-4 px-4 py-2 text-xs font-medium rounded-full ${customer.status === "ban" ? "bg-red-600 text-white" : "bg-green-500 text-white"
                                }`}
                        >
                            {customer.status === "ban" ? "Banned" : "Active"}
                        </span>
                    </div>
                </div>

                {/* Other Details */}
                <div className="mt-6 space-y-4">
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white">Other Details</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Joined on: {customer.created_at}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Last login: {customer.last_login}</p>
                </div>

                {/* Action Buttons */}
                <div className="mt-8 flex justify-center gap-6">
                    <button
                        className="px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out"
                        onClick={() => alert("Edit functionality goes here")}
                    >
                        Edit
                    </button>
                    <button
                        className={`px-6 py-3 text-sm font-medium text-white rounded-md transition duration-300 ease-in-out ${customer.status === "ban"
                                ? "bg-green-600 hover:bg-green-700"
                                : "bg-red-600 hover:bg-red-700"
                            }`}
                        onClick={() => alert("Toggle ban functionality goes here")}
                    >
                        {customer.status === "ban" ? "Unban" : "Ban"}
                    </button>
                </div>
            </div>

            <div className="h-full mt-5 my-10 rounded-lg px-4 py-4 bg-gray-100 pb-20">
                <h2 className="text-xl font-semibold mb-4">Previous Booked Trips</h2>
                {bookedData.length > 0 ? (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {bookedData.map((booking, index) => (
                            <li
                                key={index}
                                className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg hover:border-gray-900 border border-transparent transition-all duration-300 cursor-pointer"
                                onClick={() => detailsHandler(booking.booking_id)} // Pass booking_id to the handler
                            >
                                <img
                                    src={`http://localhost:3000/backend/${booking.destination_image}`}
                                    alt={booking.package_name}
                                    className="w-full h-32 object-cover rounded-t-lg"
                                />
                                <h3 className="text-lg font-bold mt-2">
                                    {booking.package_name}
                                </h3>
                                <p className="text-gray-600">{booking.destination_name}</p>
                                <div className="flex items-center justify-between mt-2">
                                    <span className="text-sm text-gray-500">
                                        Travel Date:{" "}
                                        {booking.travel_date ? booking.travel_date : "N/A"}
                                    </span>
                                    <span className="text-sm text-gray-500">
                                        People: {booking.number_of_people}
                                    </span>
                                    <span className="text-sm text-gray-500">
                                        Add-ons: {booking.add_on}
                                    </span>
                                </div>
                                <p className="text-lg font-semibold mt-2">
                                    Total Price: ${booking.total_price}
                                </p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">No booked trips found.</p>
                )}
            </div>
        </>
    );
};

export default CustomerDetailsPage;
