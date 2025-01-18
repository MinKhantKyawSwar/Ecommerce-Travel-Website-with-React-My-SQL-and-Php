import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast, Slide } from "react-toastify";

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);

    const id = localStorage.getItem("user_id");
    let unreadNotifications = 0
    const fetchNotifications = async () => {
        try {
            const response = await axios.post(
                "http://localhost:3000/backend/getNotifications.php",
                { user_id: id },
                {
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            );
            if (response.data.status === 1) {
                const fetchedNotifications = response.data.notifications || [];
                setNotifications(fetchedNotifications);

                let unreadNotifications = fetchedNotifications.filter(
                    (n) => n.noti_status === "unread"
                );
                setUnreadCount(unreadNotifications.length);
                localStorage.setItem("notification", unreadNotifications.length)

            }
        } catch (error) {
            console.error("Error fetching notifications:", error.message);
        }
    };

    const markAsRead = async (notification_id) => {
        try {
            const response = await axios.post(
                "http://localhost:3000/backend/updateNotification.php",
                { notification_id, noti_status: "read" }
            );
            if (response.data.status === 1) {
                fetchNotifications(); // Refresh notifications
            }
        } catch (error) {
            console.error("Error marking as read:", error.message);
        }
    };

    const deleteNotification = async (notification_id) => {
        try {
            const response = await axios.post(
                "http://localhost:3000/backend/deleteNotification.php",
                { notification_id }
            );
            if (response.data.status === 1) {
                fetchNotifications(); // Refresh notifications
                toast.success("Notification deleted!", { autoClose: 2000, theme: "light" });
            }
        } catch (error) {
            console.error("Error deleting notification:", error.message);
            toast.error("Failed to delete notification.");
        }
    };

    useEffect(() => {
        fetchNotifications();

        // Periodically refresh notifications
        const interval = setInterval(fetchNotifications, 10000); // Adjust interval as needed (e.g., 10 seconds)
        return () => clearInterval(interval); // Clean up interval on unmount
    }, []);

    return (
        <NotificationContext.Provider
            value={{
                notifications,
                unreadCount,
                markAsRead,
                deleteNotification,
            }}
        >
            {children}
        </NotificationContext.Provider>
    );
};
