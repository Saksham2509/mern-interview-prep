// import React, { useEffect, useRef, useState } from "react";
// import { LuChevronDown, LuPin, LuPinOff, LuSparkles, LuStickyNote } from "react-icons/lu";

// const CARD_COLORS = [
//   "from-cyan-50 to-blue-100 border-cyan-100",
//   "from-blue-50 to-cyan-100 border-blue-100",
//   "from-indigo-50 to-cyan-50 border-indigo-100",
//   "from-sky-50 to-blue-50 border-sky-100",
//   "from-emerald-50 to-cyan-50 border-emerald-100",
// ];

// const QuestionCard = ({
//   question = "",
//   answer = "",
//   note = "",
//   isPinned = false,
//   onTogglePin = () => {},
//   onLearnMore = () => {},
//   onUpdateNote = () => {},
//   loadingExplanation = false,
//   cardIndex = 0,
// }) => {
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [noteText, setNoteText] = useState(note);
//   const [editing, setEditing] = useState(false);
//   const [saving, setSaving] = useState(false);
//   const contentRef = useRef(null);
//   const [height, setHeight] = useState(0);

//   useEffect(() => {
//     setNoteText(note);
//   }, [note]);

//   useEffect(() => {
//     const resize = () => {
//       if (isExpanded && contentRef.current) {
//         setHeight(contentRef.current.scrollHeight + 10);
//       }
//     };
//     resize();
//     const observer = new ResizeObserver(resize);
//     if (contentRef.current) observer.observe(contentRef.current);
//     return () => observer.disconnect();
//   }, [isExpanded, noteText, editing]);

//   const handleSave = async () => {
//     setSaving(true);
//     await onUpdateNote(noteText);
//     setSaving(false);
//   };

//   // Pick a color for the card
//   const colorClass = CARD_COLORS[cardIndex % CARD_COLORS.length];

//   return (
//     <div
//       className={`bg-gradient-to-br ${colorClass} rounded-xl mb-4 overflow-hidden py-4 px-5 shadow-xl shadow-gray-100/70 border group transition-all duration-200 hover:shadow-md hover:scale-[1.01]`}
//     >
//       <div className="flex items-start justify-between cursor-pointer">
//         <div className="flex items-start gap-3.5">
//           <span className="text-xs md:text-[15px] font-semibold text-cyan-500 leading-[18px]">Q</span>
//           <h3
//             className="text-xs md:text-[15px] font-semibold text-blue-900 mr-0 md:mr-20 drop-shadow-sm"
//             onClick={() => setIsExpanded((prev) => !prev)}
//           >
//             {question}
//           </h3>
//         </div>
//         <div className="flex items-center justify-end ml-4 relative gap-2">
//           <button
//             className={`flex items-center gap-1 text-xs font-medium px-3 py-1 rounded border transition-all ${
//               isPinned
//                 ? "bg-yellow-100 text-yellow-800 border-yellow-100 hover:border-yellow-300"
//                 : "bg-gray-100 text-gray-700 border-gray-100 hover:border-gray-300"
//             }`}
//             onClick={onTogglePin}
//           >
//             {isPinned ? <LuPinOff size={14} /> : <LuPin size={14} />}
//             {isPinned ? "Unpin" : "Pin"}
//           </button>
//           <button
//             disabled={loadingExplanation}
//             className="flex items-center gap-1 text-xs text-cyan-800 font-medium bg-cyan-50 px-3 py-1 rounded border border-cyan-50 hover:border-cyan-200 transition-all"
//             onClick={async () => {
//               setIsExpanded(true);
//               const newNote = await onLearnMore();
//               if (newNote) setNoteText(newNote);
//             }}
//           >
//             <LuSparkles size={14} />
//             <span className="hidden md:inline">
//               {loadingExplanation ? "Generating..." : "Learn More"}
//             </span>
//           </button>
//           <button
//             className="text-gray-400 hover:text-gray-500"
//             onClick={() => setIsExpanded((prev) => !prev)}
//           >
//             <LuChevronDown
//               size={20}
//               className={`transition-transform duration-300 ${
//                 isExpanded ? "rotate-180" : ""
//               }`}
//             />
//           </button>
//         </div>
//       </div>

//       {/* Expandable Answer + Notes Section */}
//       <div
//         className="overflow-hidden transition-all duration-300 ease-in-out"
//         style={{
//           maxHeight: isExpanded ? (editing ? 'none' : `${height}px`) : '0px'
//         }}
//       >
//         <div
//           ref={contentRef}
//           className="mt-4 bg-white/80 px-5 py-3 rounded-lg space-y-4 border border-blue-50"
//         >
//           {/* Answer Preview */}
//           <div className="text-sm text-blue-800 whitespace-pre-line font-medium">
//             {answer}
//           </div>

//           {/* Notes Section */}
//           <div>
//             <h4 className="text-xs font-semibold text-indigo-700 mb-1 flex items-center gap-1">
//               <LuStickyNote className="text-indigo-500" size={14} />
//               Your Notes
//             </h4>
//             <div className="bg-white border border-gray-200 rounded p-2 text-xs">
//               {editing ? (
//                 <div className="space-y-2">
//                   <textarea
//                     value={noteText}
//                     onChange={(e) => setNoteText(e.target.value)}
//                     className="w-full border border-indigo-200 rounded p-1 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all min-h-[40px] text-xs bg-white shadow-sm"
//                     placeholder="Add your thoughts or tips here..."
//                     rows={2}
//                   />
//                   <div className="flex justify-end gap-2">
//                     <button
//                       onClick={handleSave}
//                       disabled={saving}
//                       className="px-3 py-0.5 bg-indigo-600 text-white rounded text-xs hover:bg-indigo-700 shadow"
//                     >
//                       {saving ? "Saving..." : "Save"}
//                     </button>
//                     <button
//                       onClick={() => {
//                         setNoteText(note);
//                         setEditing(false);
//                       }}
//                       className="text-gray-600 hover:underline"
//                     >
//                       Cancel
//                     </button>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="flex justify-between items-start">
//                   <p className={`text-xs ${noteText ? "text-gray-700" : "text-gray-400 italic"}`}>
//                     {noteText || "No notes yet. Click Edit to add your notes."}
//                   </p>
//                   <button
//                     onClick={() => setEditing(true)}
//                     className="text-indigo-600 hover:underline ml-2 font-medium"
//                   >
//                     Edit
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default QuestionCard;

import React, { useEffect, useRef, useState } from "react";
import {
  LuChevronDown,
  LuPin,
  LuPinOff,
  LuSparkles,
  LuStickyNote,
} from "react-icons/lu";

const CARD_COLORS = [
  "from-cyan-50 to-blue-100 border-cyan-100",
  "from-blue-50 to-cyan-100 border-blue-100",
  "from-indigo-50 to-cyan-50 border-indigo-100",
  "from-sky-50 to-blue-50 border-sky-100",
  "from-emerald-50 to-cyan-50 border-emerald-100",
];

const QuestionCard = ({
  question = "",
  answer = "",
  note = "",
  isPinned = false,
  onTogglePin = () => {},
  onLearnMore = () => {},
  onUpdateNote = () => {},
  loadingExplanation = false,
  cardIndex = 0,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [noteText, setNoteText] = useState(note);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setNoteText(note);
  }, [note]);

  useEffect(() => {
    const resize = () => {
      if (isExpanded && contentRef.current) {
        setHeight(contentRef.current.scrollHeight + 10);
      }
    };
    resize();
    const observer = new ResizeObserver(resize);
    if (contentRef.current) observer.observe(contentRef.current);
    return () => observer.disconnect();
  }, [isExpanded, noteText, editing]);

  const handleSave = async () => {
    setSaving(true);
    await onUpdateNote(noteText);
    setSaving(false);
  };

  // Pick a color for the card
  const colorClass = CARD_COLORS[cardIndex % CARD_COLORS.length];

  return (
    <div
      className={`bg-gradient-to-br ${colorClass} rounded-xl mb-4 overflow-hidden py-4 px-5 shadow-xl shadow-gray-100/70 border group transition-all duration-200 hover:shadow-md hover:scale-[1.01]`}
    >
      <div className="flex items-start justify-between cursor-pointer">
        <div className="flex items-start gap-3.5">
          <span className="text-xs md:text-[15px] font-semibold text-cyan-500 leading-[18px]">Q</span>
          <h3
            className="text-xs md:text-[15px] font-semibold text-blue-900 mr-0 md:mr-20 drop-shadow-sm"
            onClick={() => setIsExpanded((prev) => !prev)}
          >
            {question}
          </h3>
        </div>
        <div className="flex items-center justify-end ml-4 relative gap-2">
          <button
            className={`flex items-center gap-1 text-xs font-medium px-3 py-1 rounded border transition-all ${
              isPinned
                ? "bg-yellow-100 text-yellow-800 border-yellow-100 hover:border-yellow-300"
                : "bg-gray-100 text-gray-700 border-gray-100 hover:border-gray-300"
            }`}
            onClick={onTogglePin}
          >
            {isPinned ? <LuPinOff size={14} /> : <LuPin size={14} />}
            {isPinned ? "Unpin" : "Pin"}
          </button>
          <button
            disabled={loadingExplanation}
            className="flex items-center gap-1 text-xs text-cyan-800 font-medium bg-cyan-50 px-3 py-1 rounded border border-cyan-50 hover:border-cyan-200 transition-all"
            onClick={async () => {
              setIsExpanded(true);
              const newNote = await onLearnMore();
              if (newNote) setNoteText(newNote);
            }}
          >
            <LuSparkles size={14} />
            <span className="hidden md:inline">
              {loadingExplanation ? "Generating..." : "Learn More"}
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

      {/* Expandable Answer + Notes Section */}
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          maxHeight: isExpanded ? (editing ? 'none' : `${height}px`) : '0px'
        }}
      >
        <div
          ref={contentRef}
          className="mt-4 bg-white/80 px-5 py-3 rounded-lg space-y-4 border border-blue-50"
        >
          {/* Answer Preview */}
          <div className="text-sm text-blue-800 whitespace-pre-line font-medium">
            {answer}
          </div>

          {/* Notes Section */}
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
                    className="w-full border border-indigo-200 rounded p-1 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all min-h-[40px] text-xs bg-white shadow-sm"
                    placeholder="Add your thoughts or tips here..."
                    rows={2}
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
                      className="text-gray-600 hover:underline"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-start">
                  <p className={`text-xs ${noteText ? "text-gray-700" : "text-gray-400 italic"}`}>
                    {noteText || "No notes yet. Click Edit to add your notes."}
                  </p>
                  <button
                    onClick={() => setEditing(true)}
                    className="text-indigo-600 hover:underline ml-2 font-medium"
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
