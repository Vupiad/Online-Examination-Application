import React from "react";
import { Check, Clock } from "lucide-react";

function Notify({ notifications = [], onMarkAllRead }) {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="w-80 bg-white rounded-2xl shadow-xl border border-[#e8eff2] overflow-hidden animate-in fade-in zoom-in-95 duration-200 py-3"
    >
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-3 border-b border-[#e8eff2]">
        <h4 className="font-semibold text-[#2b3437]">Notifications</h4>
        <button
          onClick={onMarkAllRead}
          className="text-xs text-[#026880] font-semibold hover:underline"
        >
          Mark all as read
        </button>
      </div>

      {/* List */}
      <div className="max-h-80 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="text-center text-sm text-[#576065] py-6">
            No notifications
          </div>
        ) : (
          notifications.map((item) => (
            <div
              key={item.id}
              className={`px-4 py-3 flex items-start gap-3 hover:bg-[#eff4f7] transition ${
                !item.read ? "bg-[#f0f9ff]" : ""
              }`}
            >
              {/* Icon */}
              <div className="mt-1">
                {!item.read ? (
                  <div className="w-2 h-2 bg-[#026880] rounded-full"></div>
                ) : (
                  <Check size={14} className="text-[#aab3b8]" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1">
                <p className="text-sm font-medium text-[#2b3437]">
                  {item.title}
                </p>
                <div className="flex items-center gap-1 text-xs text-[#576065] mt-1">
                  <Clock size={12} />
                  {item.time}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="text-center py-3 border-t border-[#e8eff2]">
        <button className="text-sm text-[#026880] font-semibold hover:underline">
          View all notifications
        </button>
      </div>
    </div>
  );
}

export default Notify;