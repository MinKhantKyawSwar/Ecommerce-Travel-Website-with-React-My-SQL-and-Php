import { useState, useEffect } from "react";
import { ToastContainer, toast, Slide } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { useNotification } from "../providers/NotificationContext";

const Notification = () => {
    const { notifications, markAsRead, deleteNotification } = useNotification();
    const [expandedMessages, setExpandedMessages] = useState({});

    const toggleMessage = (id) => {
        setExpandedMessages((prevState) => ({
            ...prevState,
            [id]: !prevState[id],
        }));
        markAsRead(id);
    };


    return (
        <div className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow-md">
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Slide}
            />
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
                    Notifications
                </h2>
                <div className="flex space-x-2">
                    <button
                        onClick={() => {
                            // Collapse all expanded messages
                            setExpandedMessages({});

                            // Mark all notifications as read
                            notifications.forEach((notification) => {
                                if (notification.noti_status !== 'read') {
                                    markAsRead(notification.notification_id);
                                }
                            });
                        }}
                        className="px-3 py-2 text-xs font-medium text-white bg-gray-800 rounded-md hover:bg-gray-800"
                    >
                        Mark all as read
                    </button>
                    <button
                        onClick={() => {
                            notifications.forEach((notification) => {
                                deleteNotification(notification.notification_id);
                            });
                        }}
                        className="px-3 py-2 text-xs font-medium text-white bg-red-500 rounded-md hover:bg-red-600"
                    >
                        Delete All
                    </button>
                </div>
            </div>

            <hr className="mb-4 border-gray-300 dark:border-gray-700" />
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="min-w-full table-auto">
                    <thead>
                        <tr>
                            <th className="px-6 py-4 text-center">No</th>
                            <th className="px-6 py-4 text-center">Message</th>
                            <th className="px-6 py-4 text-center">Status</th>
                            <th className="px-6 py-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {notifications.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="px-6 py-4 text-center">
                                    No notifications available.
                                </td>
                            </tr>
                        ) : (
                            notifications.map((notification, index) => (
                                <tr
                                    key={notification.notification_id}
                                    className={`border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer 
                                    ${notification.noti_status === 'read' ? 'bg-white dark:text-gray-900' : 'bg-gray-100'}`}
                                    onClick={() => toggleMessage(notification.notification_id)} // Clicking the row will toggle the message
                                >

                                    <td className="px-6 py-4 text-center">{index + 1}</td>
                                    <td className="px-6 py-4">
                                        <div className="relative">
                                            {/* Show part of the message */}
                                            {expandedMessages[notification.notification_id] ? (
                                                <div className="text-gray-700 w-[500px] dark:text-gray-300 break-words">
                                                    {notification.message}
                                                </div>
                                            ) : (
                                                <div className={`w-[500px] truncate ${notification.noti_status === 'read' ? 'text-gray-500 dark:text-gray-900' : 'text-gray-900 dark:text-gray-300'}`}>
                                                    {notification.message.length > 50
                                                        ? `${notification.message.substring(0, 50)}...`
                                                        : notification.message}
                                                </div>

                                            )}
                                        </div>
                                    </td>
                                    <td
                                        className={`px-6 text-center py-4 font-semibold ${notification.noti_status === 'read' ? 'text-green-500' : 'text-yellow-500'}`}
                                    >
                                        {notification.noti_status}
                                    </td>
                                    <td className="px-6 py-4 text-center w-[300px]">
                                        {notification.noti_status !== 'read' && (
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation(); // Prevent click event from triggering row click
                                                    markAsRead(notification.notification_id);
                                                }}
                                                className="px-3 py-2 text-xs font-medium text-white bg-gray-800 rounded-md hover:bg-black mr-2"
                                            >
                                                Mark as Read
                                            </button>
                                        )}
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation(); // Prevent click event from triggering row click
                                                deleteNotification(notification.notification_id);
                                            }}
                                            className="px-3 py-2 text-xs font-medium text-white bg-red-500 rounded-md hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>

            </div>
        </div>
    );
};

export default Notification;
