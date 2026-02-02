import React from "react";

const ReviewerComment = ({
  title = "Reviewer’s Comment",
  comment = "",
  reviewerName = "Reviewer",
}) => {
  const hasComment = comment && comment.trim().length > 0;

  return (
    <div className="w-full mt-6">
      {/* Title */}
      <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-500 pb-1">
        {title}
      </h2>

      <div className="mt-4 bg-gray-100 border border-gray-300 rounded-md p-4 shadow-sm">
        {/* Comment Box */}
        <div className="bg-white border border-gray-300 rounded-md p-4 min-h-[60px]">
          <p
            className={`text-sm ${
              hasComment ? "text-gray-800" : "text-gray-500 italic"
            }`}
          >
            {hasComment ? comment : "No comment provided."}
          </p>
        </div>

        {/* Reviewer Name */}
        <p className="mt-2 text-sm text-gray-600 text-right">
          — <span className="font-medium">{reviewerName}</span>
        </p>
      </div>
    </div>
  );
};

export default ReviewerComment;
