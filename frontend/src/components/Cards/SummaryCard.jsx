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
  // Debug logging to identify issue
  console.log("SummaryCard received role:", role, "type:", typeof role);
  
  // Ensure role is always a string
  const safeRole = role && typeof role === 'string' ? role : "";
  const initials = getInitials(safeRole) || "?";
  
  console.log("Safe role:", safeRole, "Initials:", initials);

  return (
    <div
      onClick={onSelect}
      className="relative bg-surface/70 backdrop-blur-md border border-border rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:scale-[1.015] transition-all duration-200 cursor-pointer group ring-1 ring-primary/20"
      style={{ boxShadow: '0 8px 32px 0 rgba(74, 144, 226, 0.10)' }}
    >
      {/* Glassy Gradient Header Block */}
      <div
        className="p-4 bg-gradient-to-r from-primary/10 to-secondary/10 border-b border-border"
        style={{ backgroundColor: colors.bgcolor }}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-surface/90 rounded-lg flex items-center justify-center shadow-md ring-2 ring-primary/30">
              <span className="text-xl font-bold text-primary">
                {initials}
              </span>
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-textPrimary tracking-wide uppercase drop-shadow-sm">{safeRole || "No Role Specified"}</h3>
              <p className="text-xs text-textSecondary font-medium mt-0.5">{topicsToFocus || "No topics specified"}</p>
            </div>
          </div>

          {/* Delete Button (hover only) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="hidden group-hover:flex items-center gap-1 text-xs text-error bg-error/10 border border-error/20 hover:border-error/40 px-2 py-1 rounded transition-all shadow-sm"
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
          <span className="px-3 py-1 rounded-full bg-gradient-to-r from-secondary/20 to-secondary/30 text-textPrimary border border-secondary/30 shadow-sm">
            Experience: {experience} {experience == 1 ? "Year" : "Years"}
          </span>
          <span className="px-3 py-1 rounded-full bg-gradient-to-r from-primary/20 to-primary/30 text-textPrimary border border-primary/30 shadow-sm">
            {questions} Q&A
          </span>
          <span className="px-3 py-1 rounded-full bg-gradient-to-r from-border to-background text-textSecondary border border-border shadow-sm">
            Last Updated: {lastUpdated}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-textSecondary line-clamp-2 font-normal">
          {description || "No description provided"}
        </p>
      </div>
    </div>
  );
};

export default SummaryCard;
