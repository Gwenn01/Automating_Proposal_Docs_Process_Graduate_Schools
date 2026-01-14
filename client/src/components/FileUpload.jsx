import React, { useRef, useState } from "react";
import { UploadCloud, FileText } from "lucide-react";

const FileUpload = () => {
  const fileInputRef = useRef(null);
  const [uploads, setUploads] = useState([]);

  // Click to upload
  const handleClick = () => {
    fileInputRef.current.click();
  };

  // Handle selected files
  const handleFiles = (files) => {
    const fileArray = Array.from(files);

    fileArray.forEach((file) => uploadFile(file));
  };

  // Drag & drop
  const handleDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const uploadFile = (file) => {
    const id = Date.now() + Math.random();

    const newFile = {
      id,
      name: file.name,
      progress: 0,
      speed: "",
      status: "Uploading...",
    };

    setUploads((prev) => [...prev, newFile]);

    const xhr = new XMLHttpRequest();
    const startTime = Date.now();

    xhr.upload.onprogress = (event) => {
      if (!event.lengthComputable) return;

      const percent = Math.round((event.loaded / event.total) * 100);
      const elapsed = (Date.now() - startTime) / 1000;
      const speed = `${Math.round((event.loaded / 1024) / elapsed)} kb/s`;

      setUploads((prev) =>
        prev.map((f) =>
          f.id === id
            ? { ...f, progress: percent, speed }
            : f
        )
      );
    };

    xhr.onload = () => {
      setUploads((prev) =>
        prev.map((f) =>
          f.id === id
            ? { ...f, progress: 100, speed: "", status: "Completed" }
            : f
        )
      );
    };

    xhr.onerror = () => {
      setUploads((prev) =>
        prev.map((f) =>
          f.id === id
            ? { ...f, status: "Failed" }
            : f
        )
      );
    };

    const formData = new FormData();
    formData.append("file", file);

    // 🔧 CHANGE THIS TO YOUR BACKEND ENDPOINT
    xhr.open("POST", "http://127.0.0.1:5000/api/upload");
    xhr.send(formData);
  };

  return (
    <div className="flex-1 bg-white p-10">
      {/* Header */}
      <div className="flex justify-end items-center gap-3 mb-10">
        <span className="font-semibold text-gray-700">Arnel Gwen Nuqui</span>
        <div className="w-10 h-10 rounded-full bg-blue-100 overflow-hidden border">
          <img src="https://via.placeholder.com/40" alt="profile" />
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-8">File Upload</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Dropzone */}
        <div
          onClick={handleClick}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="cursor-pointer border-2 border-dashed border-gray-400 rounded-xl p-20 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition"
        >
          <input
            type="file"
            ref={fileInputRef}
            hidden
            multiple
            onChange={(e) => handleFiles(e.target.files)}
          />

          <div className="w-16 h-16 bg-white border border-green-500 rounded-xl flex items-center justify-center mb-4">
            <UploadCloud className="text-green-600 w-8 h-8" />
          </div>

          <p className="text-gray-600 font-medium">
            Click or Drag Files to Upload
          </p>
        </div>

        {/* Upload List */}
        <div>
          <h3 className="font-bold mb-4">Uploading</h3>
          <div className="space-y-6">
            {uploads.map((file) => (
              <div key={file.id} className="flex gap-4">
                <FileText className="w-8 h-8 text-gray-400" />
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">{file.name}</span>
                    <span className="text-[10px] text-gray-400">
                      {file.speed}
                    </span>
                  </div>

                  <div className="w-full bg-gray-100 rounded-full h-1.5">
                    <div
                      className="bg-green-500 h-1.5 rounded-full transition-all"
                      style={{ width: `${file.progress}%` }}
                    />
                  </div>

                  <span className="text-[10px] text-gray-500 mt-1 block">
                    {file.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
