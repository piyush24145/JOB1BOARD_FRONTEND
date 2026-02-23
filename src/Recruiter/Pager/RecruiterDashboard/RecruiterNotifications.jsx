import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { getMyNotifications, markNotificationRead } from "../../../api/notificationApi";


const RecruiterNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const { data } = await getMyNotifications();
      setNotifications(data.notifications || []);
    } catch (err) {
      console.error("Fetch recruiter notifications error", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRead = async (id) => {
    try {
      await markNotificationRead(id);
      fetchNotifications();
    } catch (err) {
      console.error("Mark read error", err);
    }
  };

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-6">
        <Bell className="text-blue-600" />
        <h1 className="text-xl font-bold text-gray-800">
          Notifications
        </h1>
      </div>

      {/* CARD */}
      <div className="bg-white rounded-2xl shadow border max-w-3xl">
        {loading && (
          <p className="p-6 text-sm text-gray-500">Loading...</p>
        )}

        {!loading && notifications.length === 0 && (
          <p className="p-6 text-sm text-gray-500">
            No notifications yet
          </p>
        )}

        {!loading &&
          notifications.map((n) => (
            <div
              key={n._id}
              onClick={() => handleRead(n._id)}
              className={`flex flex-col gap-1 p-4 border-b cursor-pointer transition
                ${
                  n.isRead
                    ? "bg-white"
                    : "bg-blue-50 hover:bg-blue-100"
                }`}
            >
              <p className="text-sm text-gray-800">
                {n.message}
              </p>
              <span className="text-xs text-gray-400">
                {new Date(n.createdAt).toLocaleString()}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default RecruiterNotifications;
