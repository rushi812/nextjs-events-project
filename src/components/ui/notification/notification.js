import { useContext } from "react";

import classes from "./notification.module.css";
import NotificationContext from "../../../../store/notification-context";

function Notification(props) {
  const notificationCtx = useContext(NotificationContext);

  const { title, message, status } = props;

  const statusClasses = (() => {
    switch (status) {
      case "success":
        return classes.success;
      case "error":
        return classes.error;
      case "pending":
        return classes.pending;
      default:
        return "";
    }
  })();

  const activeClasses = `${classes.notification} ${statusClasses}`;

  return (
    <div className={activeClasses} onClick={notificationCtx.hideNotification}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}

export default Notification;
