import { useState, useEffect } from "react";
import { ToastContainer, toast, Slide } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { useNotification } from "../providers/NotificationContext";

const Notification = () => {
    const [notifications, setNotifications] = useState([]);
    const { setUnreadCount } = useNotification();
    const [expandedMessages, setExpandedMessages] = useState({});

    const toggleMessage = (id) => {
        setExpandedMessages((prevState) => ({
            ...prevState,
            [id]: !prevState[id], 
        }));
        markAsRead(id);
    };

    const id = localStorage.getItem("user_id");

    const fetchNotifications = async () => {
        try {
            const response = await axios.post(
                "http://localhost:3000/backend/getNotifications.php",
                { user_id: id }, // Send user_id in the body
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.data.status === 1) {
                setNotifications(response.data.notifications);
                const notifications = response.data.notifications || [];
                const unreadNotifications = notifications.filter(
                    (n) => n.noti_status === "unread"
                );

                setUnreadCount(unreadNotifications.length);
            } else {
                console.error("Error:", response.data.message);
            }
        } catch (error) {
            console.error("Error fetching notifications:", error.message);
        }
    };


    // Mark notification as read
    const markAsRead = async (id) => {
        try {
            const response = await axios.post(
                "http://localhost:3000/backend/updateNotification.php",
                { notification_id: id, noti_status: "read" }
            );
            if (response.data.status === 1) {
                toast.success("Notification marked as read!", {
                    position: "top-center",
                    autoClose: 2000,
                    theme: "light",
                });
                fetchNotifications(); // Refresh notifications
            }
        } catch (error) {
            console.error("Error marking as read:", error.message);
            toast.error("Failed to mark as read.");
        }
    };

    // Delete notification
    const deleteNotification = async (id) => {
        try {
            const response = await axios.post(
                "http://localhost:3000/backend/deleteNotification.php",
                { notification_id: id }
            );
            if (response.data.status === 1) {
                toast.success("Notification deleted!", {
                    position: "top-center",
                    autoClose: 2000,
                    theme: "light",
                });
                fetchNotifications(); // Refresh notifications
            }
        } catch (error) {
            console.error("Error deleting notification:", error.message);
            toast.error("Failed to delete notification.");
        }
    };

    // Fetch notifications on component mount
    useEffect(() => {
        fetchNotifications();
    }, []);
    useEffect(() => {
        fetchNotifications();
    }, [setUnreadCount]);

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
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
                Notifications
            </h2>
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
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
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
                                                <div className="text-gray-700 dark:text-gray-300 w-[500px] truncate">
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
                                                className="px-3 py-2 text-xs font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 mr-2"
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
