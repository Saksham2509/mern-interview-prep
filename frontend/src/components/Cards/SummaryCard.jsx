import React from 'react';
import moment from 'moment';
import { LuTrash2, LuArrowRight, LuCpu, LuSignal, LuFileText } from 'react-icons/lu';
import { getInitials } from '../../utils/helper';

const SummaryCard = ({ session, onSelect, onDelete }) => {
  // --- Data Safety Checks and Fallbacks ---
  const role = session?.role || 'No Role';
  const lastUpdated = session?.updatedAt ? moment(session.updatedAt).format("Do MMM YYYY") : 'N/A';
  const description = session?.description || "No description provided for this session.";
  const topics = (Array.isArray(session?.topicsToFocus) && session.topicsToFocus.length > 0)
    ? session.topicsToFocus.join(', ')
    : 'General';
  const experience = session?.experience ?? 0;
  const questionCount = session?.questions?.length || 0;

  // This check prevents rendering a completely empty card if the session object is missing
  if (!session?._id) {
    return null;
  }
  
  return (
    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
      {/* Card Header */}
      <div>
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center border border-blue-200 flex-shrink-0">
              <span className="text-xl font-bold text-blue-700">
                {getInitials(role)}
              </span>
            </div>
            <div className="min-w-0">
              <h3 className="text-lg font-bold text-gray-800 truncate">{role}</h3>
              <p className="text-xs text-gray-500 font-medium">
                Last Updated: {lastUpdated}
              </p>
            </div>
          </div>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="p-2 rounded-full text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
            title="Delete Session"
          >
            <LuTrash2 size={18} />
          </button>
        </div>

        {/* Card Body */}
        <p className="text-sm text-gray-600 line-clamp-2 my-4">
          {description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 text-xs font-medium">
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
            <LuCpu size={14} />
            {topics}
          </span>
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
  <LuSignal size={14} /> {/* <-- This is the corrected icon */}
  {experience} {experience == 1 ? "Year" : "Years"}
</span>
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
            <LuFileText size={14} />
            {questionCount} Questions
          </span>
        </div>
      </div>
      
      {/* Card Footer/Action */}
      <button
        onClick={onSelect}
        className="mt-5 w-full flex items-center justify-center gap-2 bg-white text-blue-600 font-semibold py-2 px-4 rounded-lg border-2 border-blue-200 hover:bg-blue-50 transition-colors"
      >
        View Session <LuArrowRight size={16} />
      </button>
    </div>
  );
};

export default SummaryCard;