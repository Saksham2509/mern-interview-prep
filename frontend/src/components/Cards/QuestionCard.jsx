// import React, { useEffect, useRef, useState } from "react";
// import { LuChevronDown, LuPin, LuPinOff, LuSparkles, LuStickyNote } from "react-icons/lu";

// const QuestionCard = ({
//   question = "",
//   answer = "",
//   note = "",
//   isPinned = false,
//   onTogglePin = () => {},
//   onLearnMore = () => {},
//   onUpdateNote = () => {},
// }) => {
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [noteText, setNoteText] = useState(note);
//   const [editing, setEditing] = useState(false);
//   const [saving, setSaving] = useState(false);
//   const contentRef = useRef(null);
//   const [height, setHeight] = useState(0);

//   useEffect(() => {
//   if (isExpanded && contentRef.current) {
//     setHeight(contentRef.current.scrollHeight + 10);
//   } else {
//     setHeight(0);
//   }
// }, [isExpanded, noteText]);

//   const handleSave = async () => {
//     setSaving(true);
//     await onUpdateNote(noteText);
//     setSaving(false);
//     // setEditing(false); // Keep editing open after save
//   };

//   return (
//     <div className="bg-white rounded-lg mb-4 overflow-hidden py-4 px-5 shadow-xl shadow-gray-100/70 border border-gray-100/60 group transition-all duration-200 hover:shadow-md hover:scale-[1.01]">
//       <div className="flex items-start justify-between cursor-pointer">
//         <div className="flex items-start gap-3.5">
//           <span className="text-xs md:text-[15px] font-semibold text-gray-400 leading-[18px]">Q</span>
//           <h3
//             className="text-xs md:text-[14px] font-medium text-gray-800 mr-0 md:mr-20"
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
//             className="flex items-center gap-1 text-xs text-cyan-800 font-medium bg-cyan-50 px-3 py-1 rounded border border-cyan-50 hover:border-cyan-200 transition-all"
//             onClick={() => {
//               setIsExpanded(true);
//               onLearnMore();
//             }}
//           >
//             <LuSparkles size={14} />
//             <span className="hidden md:inline">Learn More</span>
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
//         style={{ maxHeight: `${height}px` }}
//       >
//         <div
//           ref={contentRef}
//           className="mt-4 bg-gray-50 px-5 py-3 rounded-lg space-y-4"
//         >
//           {/* Answer Preview */}
//           <div className="text-sm text-gray-700 whitespace-pre-line">{answer}</div>

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
//                   <p className={`text-xs ${note ? "text-gray-700" : "text-gray-400 italic"}`}>
//                     {note || "No notes yet. Click Edit to add your notes."}
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

// import React, { useEffect, useRef, useState } from "react";
// import { LuChevronDown, LuPin, LuPinOff, LuSparkles, LuStickyNote } from "react-icons/lu";

// const QuestionCard = ({
//   question = "",
//   answer = "",
//   note = "",
//   isPinned = false,
//   onTogglePin = () => {},
//   onLearnMore = () => {},
//   onUpdateNote = () => {},
//   loadingExplanation = false,
// }) => {
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [noteText, setNoteText] = useState(note);
//   const [editing, setEditing] = useState(false);
//   const [saving, setSaving] = useState(false);
//   const contentRef = useRef(null);
//   const [height, setHeight] = useState(0);

//   // ✅ Keep noteText in sync if external update happens
//   useEffect(() => {
//     setNoteText(note);
//   }, [note]);

//   // 🔽 Handle height animation on expand
//  useEffect(() => {
//   const resize = () => {
//     if (isExpanded && contentRef.current) {
//       setHeight(contentRef.current.scrollHeight + 10);
//     }
//   };

//   resize();

//   const observer = new ResizeObserver(resize);
//   if (contentRef.current) observer.observe(contentRef.current);

//   return () => observer.disconnect();
// }, [isExpanded, noteText, editing]);

//   const handleSave = async () => {
//     setSaving(true);
//     await onUpdateNote(noteText);
//     setSaving(false);
//     // setEditing(false); // Keep editing open after save
//   };

//   return (
//     <div className="bg-white rounded-lg mb-4 overflow-hidden py-4 px-5 shadow-xl shadow-gray-100/70 border border-gray-100/60 group transition-all duration-200 hover:shadow-md hover:scale-[1.01]">
//       <div className="flex items-start justify-between cursor-pointer">
//         <div className="flex items-start gap-3.5">
//           <span className="text-xs md:text-[15px] font-semibold text-gray-400 leading-[18px]">Q</span>
//           <h3
//             className="text-xs md:text-[14px] font-medium text-gray-800 mr-0 md:mr-20"
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
//               const newNote = await onLearnMore(); // ⬅️ expect updated note returned
//               if (newNote) setNoteText(newNote);    // ⬅️ update local note immediately
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
//           className="mt-4 bg-gray-50 px-5 py-3 rounded-lg space-y-4"
//         >
//           {/* Answer Preview */}
//           <div className="text-sm text-gray-700 whitespace-pre-line">{answer}</div>

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



// import React, { useEffect, useRef, useState } from "react";
// import {
//   LuChevronDown,
//   LuPin,
//   LuPinOff,
//   LuSparkles,
//   LuStickyNote,
// } from "react-icons/lu";

// const QuestionCard = ({
//   question = "",
//   answer = "",
//   note = "",
//   isPinned = false,
//   onTogglePin = () => {},
//   onLearnMore = () => {},
//   onUpdateNote = () => {},
//   loadingExplanation = false,
// }) => {
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [noteText, setNoteText] = useState(note);
//   const [editing, setEditing] = useState(false);
//   const [saving, setSaving] = useState(false);
//   const contentRef = useRef(null);
//   const [height, setHeight] = useState(0);

//   useEffect(() => {
//     const resize = () => {
//       if (isExpanded && contentRef.current) {
//         setHeight(contentRef.current.scrollHeight + 10);
//       }
//     };

//     resize(); // initial

//     const observer = new ResizeObserver(resize);
//     if (contentRef.current) observer.observe(contentRef.current);

//     return () => observer.disconnect();
//   }, [isExpanded, noteText, editing]);

//   const handleSave = async () => {
//     setSaving(true);
//     await onUpdateNote(noteText);
//     setSaving(false);
//     // setEditing(false); // Keep editing open after save
//   };

//   return (
//     <div className="bg-white rounded-lg mb-4 overflow-hidden py-4 px-5 shadow-xl shadow-gray-100/70 border border-gray-100/60 group transition-all duration-200 hover:shadow-md hover:scale-[1.01]">
//       <div className="flex items-start justify-between cursor-pointer">
//         <div className="flex items-start gap-3.5">
//           <span className="text-xs md:text-[15px] font-semibold text-gray-400 leading-[18px]">
//             Q
//           </span>
//           <h3
//             className="text-xs md:text-[14px] font-medium text-gray-800 mr-0 md:mr-20"
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
//             className="flex items-center gap-1 text-xs text-cyan-800 font-medium bg-cyan-50 px-3 py-1 rounded border border-cyan-50 hover:border-cyan-200 transition-all"
//             onClick={() => {
//               setIsExpanded(true);
//               onLearnMore();
//             }}
//             disabled={loadingExplanation}
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

//       {/* Expandable Section */}
//       <div
//         className="overflow-hidden transition-all duration-300 ease-in-out"
//         style={{ maxHeight: `${isExpanded ? height : 0}px` }}
//       >
//         <div
//           ref={contentRef}
//           className="mt-4 bg-gray-50 px-5 py-3 rounded-lg space-y-4"
//         >
//           {/* Answer */}
//           <div className="text-sm text-gray-700 whitespace-pre-line">
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
//                     ref={contentRef}
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
//                   <p
//                     className={`text-xs ${
//                       note ? "text-gray-700" : "text-gray-400 italic"
//                     }`}
//                   >
//                     {note || "No notes yet. Click Edit to add your notes."}
//                   </p>
//                   <button
//                     onClick={() => {
//                       setEditing(true);
//                       setIsExpanded(true); // stay expanded
//                     }}
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

const QuestionCard = ({
  question = "",
  answer = "",
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
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (isExpanded && contentRef.current) {
      setHeight(contentRef.current.scrollHeight + 10);
    } else {
      setHeight(0);
    }
  }, [isExpanded, noteText, editing]);

  useEffect(() => {
    setNoteText(note); // Keep synced
  }, [note]);

  const handleSave = async () => {
    setSaving(true);
    await onUpdateNote(noteText);
    setSaving(false);
    // setEditing(false); // Keep editing open after save
  };

  return (
    <div className="bg-white rounded-lg mb-4 overflow-hidden py-4 px-5 shadow-xl shadow-gray-100/70 border border-gray-100/60 group transition-all duration-200 hover:shadow-md hover:scale-[1.01]">
      <div className="flex items-start justify-between cursor-pointer">
        <div className="flex items-start gap-3.5">
          <span className="text-xs md:text-[15px] font-semibold text-gray-400 leading-[18px]">Q</span>
          <h3
            className="text-xs md:text-[14px] font-medium text-gray-800 mr-0 md:mr-20"
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
            onClick={() => {
              setIsExpanded(true);
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

      {/* Expandable Content */}
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: `${height}px` }}
      >
        <div
          ref={contentRef}
          className="mt-4 bg-gray-50 px-5 py-3 rounded-lg space-y-4"
        >
          {/* Answer Section */}
          <div className="text-sm text-gray-700 whitespace-pre-line">{answer}</div>

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
                      className="text-gray-600 hover:underline"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-start">
                  <p
                    className={`text-xs whitespace-pre-wrap ${
                      note ? "text-gray-700" : "text-gray-400 italic"
                    }`}
                  >
                    {note || "No notes yet. Click Edit to add your notes."}
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
