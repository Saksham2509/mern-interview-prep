import React, { useEffect, useState } from "react";
import {
  LuChevronDown,
  LuPin,
  LuPinOff,
  LuSparkles,
  LuStickyNote,
  LuBrainCircuit,
} from "react-icons/lu";

const QuestionCard = ({
  question = "",
  answer = "",
  explanation = "",
  note = "",
  isPinned = false,
  onTogglePin = () => {},
  onLearnMore = () => {},
  onUpdateNote = () => {},
  loadingExplanation = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [noteText, setNoteText] = useState(note);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setNoteText(note); // Keep synced with parent
  }, [note]);

  const handleSave = async () => {
    setSaving(true);
    await onUpdateNote(noteText);
    setSaving(false);
  };

  return (
    <div className="bg-white rounded-lg mb-4 py-4 px-5 shadow-xl shadow-gray-100/70 border border-gray-100/60 group">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3.5 flex-1 min-w-0">
          <span className="text-xs md:text-[15px] font-semibold text-gray-400 leading-[18px] mt-0.5">
            Q
          </span>
          <h3
            className="text-xs md:text-[14px] font-medium text-gray-800 flex-1 cursor-pointer"
            onClick={() => setIsExpanded((prev) => !prev)}
          >
            {question}
          </h3>
        </div>

        <div className="flex items-center justify-end ml-4 pl-2 relative gap-2">
          <button
            className={`flex items-center gap-1 text-xs font-medium px-3 py-1 rounded border transition-all ${
              isPinned
                ? "bg-yellow-100 text-yellow-800 border-yellow-100 hover:border-yellow-300"
                : "bg-gray-100 text-gray-700 border-gray-100 hover:border-gray-300"
            }`}
            onClick={onTogglePin}
          >
            {isPinned ? <LuPinOff size={14} /> : <LuPin size={14} />}
            <span className="hidden sm:inline">{isPinned ? "Unpin" : "Pin"}</span>
          </button>

          <button
            disabled={loadingExplanation}
            className="flex items-center gap-1 text-xs text-cyan-800 font-medium bg-cyan-50 px-3 py-1 rounded border border-cyan-50 hover:border-cyan-200 transition-all disabled:opacity-50"
            onClick={() => {
              if (!isExpanded) {
                  setIsExpanded(true);
              }
              onLearnMore();
            }}
          >
            <LuSparkles size={14} />
            <span className="hidden md:inline">
              {loadingExplanation ? "Loading..." : "Learn More"}
            </span>
          </button>

          <button
            className="text-gray-400 hover:text-gray-500"
            onClick={() => setIsExpanded((prev) => !prev)}
          >
            <LuChevronDown
              size={20}
              className={`transition-transform duration-300 ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Expandable Content with a scrollbar on overflow */}
      <div
        className={`transition-all duration-500 ease-in-out overflow-y-auto ${ // FIX: Changed to overflow-y-auto
          isExpanded ? "max-h-[70vh]" : "max-h-0" // FIX: Using viewport height for better responsiveness
        }`}
      >
        <div className="mt-4 pt-4 border-t border-gray-100 space-y-4">
            {/* Answer Section */}
            <div className="text-sm text-gray-700 whitespace-pre-line">{answer}</div>

            {/* AI Explanation Section */}
            {explanation && (
                <div>
                  <h4 className="text-xs font-semibold text-cyan-700 mb-1 flex items-center gap-1.5">
                      <LuBrainCircuit className="text-cyan-500" size={14} />
                      AI Explanation
                  </h4>
                  <div className="bg-cyan-50/50 border border-cyan-100 rounded p-3 text-xs">
                      <p className="text-gray-700 whitespace-pre-wrap">{explanation}</p>
                  </div>
                </div>
            )}

            {/* FIX: Notes Section is restored here */}
            <div>
                <h4 className="text-xs font-semibold text-indigo-700 mb-1 flex items-center gap-1">
                <LuStickyNote className="text-indigo-500" size={14} />
                Your Notes
                </h4>
                <div className="bg-white border border-gray-200 rounded p-2 text-xs">
                {editing ? (
                    <div className="space-y-2">
                    <textarea
                        value={noteText}
                        onChange={(e) => setNoteText(e.target.value)}
                        className="w-full border border-indigo-200 rounded p-2 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all min-h-[120px] text-sm bg-white shadow-sm resize-y"
                        placeholder="Add your thoughts or tips here..."
                        rows={6}
                        autoFocus
                    />
                    <div className="flex justify-end gap-2">
                        <button
                        onClick={handleSave}
                        disabled={saving}
                        className="px-3 py-0.5 bg-indigo-600 text-white rounded text-xs hover:bg-indigo-700 shadow"
                        >
                        {saving ? "Saving..." : "Save"}
                        </button>
                        <button
                        onClick={() => {
                            setNoteText(note);
                            setEditing(false);
                        }}
                        className="text-gray-600 hover:underline text-xs"
                        >
                        Cancel
                        </button>
                    </div>
                    </div>
                ) : (
                    <div className="flex justify-between items-start">
                    <p
                        className={`text-xs whitespace-pre-wrap min-h-[20px] flex-1 ${
                        note ? "text-gray-700" : "text-gray-400 italic"
                        }`}
                    >
                        {note || "No notes yet. Click Edit to add some."}
                    </p>
                    <button
                        onClick={() => setEditing(true)}
                        className="text-indigo-600 hover:underline ml-2 font-medium text-xs"
                    >
                        Edit
                    </button>
                    </div>
                )}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;