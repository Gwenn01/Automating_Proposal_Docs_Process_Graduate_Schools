import React from "react";
import { X } from "lucide-react";

const API_BASE = "http://127.0.0.1:5000";

const DocumentViewerModal = ({ isOpen, onClose, documentUrl }) => {
  if (!isOpen || !documentUrl) return null;

  // Normalize Windows backslashes
  const normalizedPath = documentUrl.replace(/\\/g, "/");

  // Final URL → matches Flask route
  const fullUrl = `${API_BASE}/${normalizedPath}`;

  const extension = fullUrl.split(".").pop().toLowerCase();
  const isPDF = extension === "pdf";
  const isWord = ["doc", "docx"].includes(extension);

  const googleViewerUrl = `https://docs.google.com/gview?url=${encodeURIComponent(
    fullUrl
  )}&embedded=true`;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-md p-6">
      <div className="bg-white w-full max-w-5xl h-[90vh] rounded shadow-xl flex flex-col">

        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h3 className="font-bold text-lg">Document Viewer</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            <X />
          </button>
        </div>

        {/* Viewer */}
        <div className="flex-1 bg-gray-100">
          {isPDF && (
            <iframe
              src={fullUrl}
              title="PDF Viewer"
              className="w-full h-full border-0"
            />
          )}

          {isWord && (
            <iframe
              src={googleViewerUrl}
              title="Word Viewer"
              className="w-full h-full border-0"
            />
          )}

          {!isPDF && !isWord && (
            <div className="flex items-center justify-center h-full text-gray-500">
              Unsupported file format
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentViewerModal;
