import React, { useRef, useState, useEffect } from "react";
import { UploadCloud, FileText, Loader2 } from "lucide-react";

const FileUpload = () => {
  const fileInputRef = useRef(null);

  const [uploads, setUploads] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState("");
  const [user, setUser] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  /* ================= FETCH USER ================= */
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      console.log("LOGGED IN USER:", parsedUser);
    }
  }, []);

  /* ================= FILE SELECTION ================= */
  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFiles = (files) => {
    const file = files[0];
    if (!file) return;

    setSelectedFile(file);

    // Render immediately (READY state)
    setUploads([
      {
        id: "pending",
        name: file.name,
        progress: 0,
        speed: "",
        status: "Ready to upload",
        isUploading: false,
      },
    ]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  /* ================= BUILD FORMDATA ================= */
  const buildFormData = (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("uploaded_by", user?.id || "");
    formData.append("uploaded_by_name", user?.fullname || "");
    formData.append("uploaded_at", new Date().toISOString());
    return formData;
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = () => {
    if (!title.trim()) {
      alert("Please enter a title");
      return;
    }

    if (!selectedFile) {
      alert("Please select a file");
      return;
    }

    setIsSubmitting(true);
    uploadFile(selectedFile);
  };

  /* ================= UPLOAD LOGIC ================= */
  const uploadFile = (file) => {
    const id = Date.now();

    setUploads([
      {
        id,
        name: file.name,
        progress: 0,
        speed: "",
        status: "Uploading...",
        isUploading: true,
      },
    ]);

    const xhr = new XMLHttpRequest();
    const startTime = Date.now();

    xhr.upload.onprogress = (event) => {
      if (!event.lengthComputable) return;

      const percent = Math.round((event.loaded / event.total) * 100);
      const elapsed = (Date.now() - startTime) / 1000;
      const speed = `${Math.round((event.loaded / 1024) / elapsed)} kb/s`;

      setUploads((prev) =>
        prev.map((f) =>
          f.id === id ? { ...f, progress: percent, speed } : f
        )
      );
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        setUploads((prev) =>
          prev.map((f) =>
            f.id === id
              ? {
                  ...f,
                  progress: 100,
                  speed: "",
                  status: "Completed",
                  isUploading: false,
                }
              : f
          )
        );

        // Reset after success
        setSelectedFile(null);
        setTitle("");
      } else {
        xhr.onerror();
      }

      setIsSubmitting(false);
    };

    xhr.onerror = () => {
      setUploads((prev) =>
        prev.map((f) =>
          f.id === id
            ? { ...f, status: "Failed", isUploading: false }
            : f
        )
      );
      setIsSubmitting(false);
    };

    const formData = buildFormData(file);
    xhr.open("POST", "http://127.0.0.1:5000/api/upload");
    xhr.send(formData);
  };

  /* ================= UI ================= */
  return (
    <div className="flex-1 bg-white p-10">
      {/* Header */}
      <div className="flex justify-end items-center gap-3 mb-10">
        <span className="font-semibold text-gray-700">
          {user?.fullname || "User"}
        </span>
        <div className="w-10 h-10 rounded-full bg-blue-100 overflow-hidden border">
          <img src="https://via.placeholder.com/40" alt="profile" />
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-8">File Upload</h2>

      {/* Title */}
      <div className="mb-6">
        <label className="block text-sm font-semibold mb-2">
          Document Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter document title"
          className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Dropzone */}
        <div
          onClick={handleClick}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="cursor-pointer border-2 border-dashed border-gray-400 rounded-xl p-20 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100"
        >
          <input
            type="file"
            ref={fileInputRef}
            hidden
            onChange={(e) => handleFiles(e.target.files)}
          />
          <UploadCloud className="text-green-600 w-8 h-8 mb-4" />
          <p className="text-gray-600 font-medium">
            Click or Drag File to Select
          </p>
        </div>

        {/* Upload List */}
        <div>
          <h3 className="font-bold mb-4">Uploading</h3>

          {uploads.map((file) => (
            <div key={file.id} className="flex gap-4 items-center">
              {file.isUploading ? (
                <Loader2 className="w-6 h-6 text-green-500 animate-spin" />
              ) : (
                <FileText className="w-6 h-6 text-gray-400" />
              )}

              <div className="flex-1">
                <span className="text-sm font-medium">{file.name}</span>

                <div className="w-full bg-gray-100 rounded-full h-1.5 mt-2">
                  <div
                    className="bg-green-500 h-1.5 rounded-full transition-all"
                    style={{ width: `${file.progress}%` }}
                  />
                </div>

                <span className="text-[10px] text-gray-500 block mt-1">
                  {file.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Submit */}
      <div className="mt-8">
        <button
          onClick={handleSubmit}
          disabled={!selectedFile || isSubmitting}
          className="bg-green-600 text-white px-8 py-3 rounded-xl font-semibold disabled:opacity-50"
        >
          {isSubmitting ? "Uploading..." : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default FileUpload;
