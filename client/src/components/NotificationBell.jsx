import { Bell } from "lucide-react";
import { useEffect, useRef } from "react";

const NotificationBell = ({
  notifications = [],
  show,
  onToggle,
  onClose,
}) => {
  const dropdownRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        onClose();
      }
    };

    if (show) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [show, onClose]);

  return (
    <div className="relative">
      {/* Bell Button */}
      <button
        onClick={onToggle}
        className="relative flex items-center gap-2 px-4 py-2 rounded-full 
                   hover:bg-gray-100 active:bg-gray-200 transition-all"
      >
        <span className="text-gray-600 font-semibold text-sm">
          Notifications
        </span>
        <Bell className="w-6 h-6 text-gray-700" />

        {/* Badge */}
        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white 
                           text-[10px] font-bold min-w-[18px] h-[18px] 
                           px-1 flex items-center justify-center rounded-full 
                           animate-pulse">
            {notifications.length}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {show && (
        <div
          ref={dropdownRef}
          className="absolute right-0 mt-3 w-80 bg-white 
                     border border-gray-200 rounded-2xl 
                     shadow-xl z-50 overflow-hidden
                     animate-in fade-in slide-in-from-top-2"
        >
          {/* Header */}
          <div className="px-4 py-3 border-b bg-gray-50">
            <p className="font-semibold text-gray-700 text-sm">
              Notifications
            </p>
          </div>

          {/* Content */}
          {notifications.length === 0 ? (
            <p className="px-4 py-8 text-sm text-gray-400 text-center">
              🎉 You're all caught up!
            </p>
          ) : (
            <ul className="max-h-72 overflow-y-auto divide-y">
              {notifications.map((notif) => (
                <li
                  key={notif.id}
                  className="px-4 py-3 hover:bg-gray-50 
                             transition cursor-pointer"
                >
                  <p className="text-sm text-gray-800 font-medium">
                    {notif.message}
                  </p>
                  <span className="text-xs text-gray-400">
                    {notif.time}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
