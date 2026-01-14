import React from 'react';
import { UploadCloud, FileText } from 'lucide-react';

const FileUpload = () => {
  const uploads = [
    { name: "Papers.docx", progress: 40, speed: "80kb/sec", status: "40% done" },
    { name: "Papers.docx", progress: 40, speed: "90kb/sec", status: "40% done" },
    { name: "Papers.docx", progress: 70, speed: "90kb/sec", status: "70% done" },
    { name: "Papers.docx", progress: 100, speed: "", status: "Completed" },
  ];

  const handleUpload = async () => {
  

  try {
    

  } catch (error) {
    
  } finally {
   
  }
};

  return (
    <div className="flex-1 bg-white p-10">
      {/* Header User Profile */}
      <div className="flex justify-end items-center gap-3 mb-10">
        <span className="font-semibold text-gray-700">Arnel Gwen Nuqui</span>
        <div className="w-10 h-10 rounded-full bg-blue-100 overflow-hidden border border-gray-200">
          <img src="https://via.placeholder.com/40" alt="profile" />
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-8">File Upload</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Dropzone */}
        <div className="border-2 border-dashed border-gray-400 rounded-xl p-20 flex flex-col items-center justify-center bg-gray-50">
          <div className="w-16 h-16 bg-white border border-green-500 rounded-xl flex items-center justify-center mb-4">
            <UploadCloud className="text-green-600 w-8 h-8" />
          </div>
          <p className="text-gray-600 font-medium">Drag Files to Upload</p>
        </div>

        {/* Uploading List */}
        <div>
          <h3 className="font-bold mb-4">Uploading</h3>
          <div className="space-y-6">
            {uploads.map((file, idx) => (
              <div key={idx} className="flex gap-4">
                <FileText className="w-8 h-8 text-gray-400" />
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">{file.name}</span>
                    <span className="text-[10px] text-gray-400">{file.speed}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5">
                    <div 
                      className="bg-green-500 h-1.5 rounded-full" 
                      style={{ width: `${file.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-[10px] text-gray-500 mt-1 block">{file.status}</span>
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