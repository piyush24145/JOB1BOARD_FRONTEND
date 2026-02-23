import { markNotificationRead } from "../../../api/notificationApi";

const NotificationPanel = ({ notifications = [], refresh }) => {

  const handleRead = async (id) => {
    try {
      await markNotificationRead(id);
      refresh();
    } catch (error) {
      console.error("Mark read failed", error);
    }
  };

  return (
    <div
      className="absolute right-0 mt-3 w-80 bg-white rounded-xl shadow-lg border z-50"
      onClick={(e) => e.stopPropagation()} // ✅ IMPORTANT
    >
      <div className="p-3 font-semibold border-b">
        Notifications
      </div>

      <div className="max-h-96 overflow-y-auto">
        {notifications.length === 0 && (
          <p className="p-4 text-sm text-gray-500">
            No notifications
          </p>
        )}

        {notifications.map((n) => (
          <div
            key={n._id}
            onClick={() => handleRead(n._id)}
            className={`p-3 text-sm cursor-pointer border-b transition
              ${n.isRead ? "bg-white" : "bg-blue-50 hover:bg-blue-100"}
            `}
          >
            <p className="text-gray-800">{n.message}</p>
            <span className="text-xs text-gray-400">
              {new Date(n.createdAt).toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationPanel;
