import React from "react";
import { LuTrash2 } from "react-icons/lu";
import { getInitials } from "../../utils/helper";

const SummaryCard = ({
  colors = { bgcolor: "#f3f4f6" }, // default gray
  role = "",
  topicsToFocus = "",
  experience = "",
  questions = "",
  description = "",
  lastUpdated = "",
  onSelect = () => {},
  onDelete = () => {},
}) => {
  return (
    <div
      onClick={onSelect}
      className="relative bg-white/70 backdrop-blur-md border border-gray-100 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:scale-[1.015] transition-all duration-200 cursor-pointer group ring-1 ring-cyan-100/40"
      style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.10)' }}
    >
      {/* Glassy Gradient Header Block */}
      <div
        className="p-4 bg-gradient-to-r from-cyan-50/80 to-blue-100/60 border-b border-cyan-100"
        style={{ backgroundColor: colors.bgcolor }}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/80 rounded-lg flex items-center justify-center shadow-md ring-2 ring-cyan-200">
              <span className="text-xl font-bold text-cyan-700">
                {getInitials(role)}
              </span>
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-blue-800 tracking-wide uppercase drop-shadow-sm">{role}</h3>
              <p className="text-xs text-cyan-700 font-medium mt-0.5">{topicsToFocus}</p>
            </div>
          </div>

          {/* Delete Button (hover only) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="hidden group-hover:flex items-center gap-1 text-xs text-red-500 bg-red-50 border border-red-100 hover:border-red-200 px-2 py-1 rounded transition-all shadow-sm"
          >
            <LuTrash2 size={14} />
            Delete
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Badges */}
        <div className="flex flex-wrap gap-2 text-[11px] font-semibold">
          <span className="px-3 py-1 rounded-full bg-gradient-to-r from-cyan-100 to-cyan-200 text-cyan-800 border border-cyan-200 shadow-sm">
            Experience: {experience} {experience == 1 ? "Year" : "Years"}
          </span>
          <span className="px-3 py-1 rounded-full bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border border-blue-200 shadow-sm">
            {questions} Q&A
          </span>
          <span className="px-3 py-1 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 border border-gray-200 shadow-sm">
            Last Updated: {lastUpdated}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-700 line-clamp-2 font-normal">
          {description}
        </p>
      </div>
    </div>
  );
};

export default SummaryCard;
