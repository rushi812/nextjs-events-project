import { useContext } from "react";
import Notification from "../ui/notification/notification";
import Header from "./Header";
import NotificationContext from "../../../store/notification-context";

const Layout = ({ children }) => {
  const notificationCtx = useContext(NotificationContext);
  const activeNotification = notificationCtx.notification;

  return (
    <>
      <Header />
      <main>{children}</main>
      {activeNotification && (
        <Notification
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status}
        />
      )}
    </>
  );
};

export default Layout;
