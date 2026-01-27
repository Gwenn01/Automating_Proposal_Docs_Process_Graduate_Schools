import React, { useState } from "react";
import { MessageSquare } from "lucide-react";

const CommentInput = ({ sectionName, InputValue, onCommentChange, initialComment = "" }) => {
  const [comment, setComment] = useState(initialComment);
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    setComment(value);
    onCommentChange(InputValue, value);
  };

  return (
    <div className="my-6 border-l-4 border-green-500 bg-green-50 p-4 rounded-r-lg">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-1">
          <MessageSquare className="w-5 h-5 text-green-600" />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-semibold text-green-900 mb-2">
            Reviewer's Comment - {sectionName}
          </label>
          <textarea
            value={comment}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Enter your review comments here..."
            className={`w-full px-4 py-3 border rounded-lg resize-none focus:outline-none transition-all ${
              isFocused
                ? "border-green-500 ring-2 ring-green-200 bg-white"
                : "border-gray-300 bg-white"
            }`}
            rows={4}
          />
          <p className="text-xs text-gray-500 mt-1">
            {comment.length} characters
          </p>
        </div>
      </div>
    </div>
  );
};

export default CommentInput;