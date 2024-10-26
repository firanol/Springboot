import React from "react";
import "./NotificationBar.css";

function NotificationBar({ message, type, clearNotification }:any) {
    if (!message) return null;

    setTimeout(() => {
        clearNotification();
    }, 3000);

    return (
        <div className={`notification-bar ${type}`}>
            <span>{message}</span>
        </div>
    );
}

export default NotificationBar;
