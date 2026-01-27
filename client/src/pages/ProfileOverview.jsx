import React, { useEffect, useState } from "react";

const ProfileOverview = () => {
  // Mock user data - replace with actual data from your backend
    const [user, setUser] = useState(null);

      useEffect(() => {
        // Get user from localStorage
        const storedUser = localStorage.getItem("user");
        
        if (!storedUser) {
          console.log("No user found, would redirect to login");
          setLoading(false);
          return;
        }
    
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        } catch (error) {
          console.error("Error parsing user data:", error);
          setLoading(false);
        }
      }, []);

  const handleLogout = () => {
    // In your real app, this would clear auth state and redirect
    alert('Logout functionality - would redirect to login page');
  };

  // Helper to get initials from name (e.g. "John Doe" -> "JD")
  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="flex flex-col items-center justify-center text-gray-500 bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold mb-2">No Profile Found</h2>
          <p className="mb-4">Please log in to view your profile.</p>
          <button 
            onClick={() => alert('Would navigate to login')}
            className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto p-4 md:p-8">
        
        {/* CARD CONTAINER */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          
          {/* BANNER HEADER */}
          <div className="h-32 md:h-48 bg-gradient-to-r from-emerald-500 to-teal-600 relative">
            {/* Optional: Add a pattern or image here if available */}
          </div>

          {/* PROFILE HEADER CONTENT */}
          <div className="px-6 md:px-10 pb-6">
            <div className="flex flex-col md:flex-row items-center md:items-end -mt-16 md:-mt-20 mb-6">
              
              {/* AVATAR */}
              <div className="relative">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white bg-gray-200 flex items-center justify-center shadow-md">
                  {user.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt="Profile" 
                      className="w-full h-full rounded-full object-cover" 
                    />
                  ) : (
                    <span className="text-4xl md:text-5xl font-bold text-gray-400">
                      {getInitials(user.fullname || user.name)}
                    </span>
                  )}
                </div>
                {/* Online Status Indicator */}
                <div className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 border-4 border-white rounded-full"></div>
              </div>

              {/* NAME & ROLE */}
              <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left flex-1">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                  {user.fullname || user.name || "User Name"}
                </h1>
                <p className="text-emerald-600 font-medium text-lg">
                  {user.position || "Instructor"}
                </p>
                <p className="text-gray-500 text-sm flex items-center justify-center md:justify-start gap-1 mt-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  {user.campus ? `${user.campus} Campus` : "PRMSU"}
                </p>
              </div>

              {/* ACTION BUTTONS */}
              <div className="mt-6 md:mt-0 flex gap-3">
                <button 
                  className="px-4 py-2 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition shadow-sm"
                  onClick={() => alert('Edit profile functionality would go here')}
                >
                  Edit Profile
                </button>
                <button 
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-50 text-red-600 font-semibold rounded-lg hover:bg-red-100 transition shadow-sm border border-red-100"
                >
                  Logout
                </button>
              </div>
            </div>

            {/* DIVIDER */}
            <hr className="border-gray-200 my-6" />

            {/* DETAILS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
              
              {/* Column 1 */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Personal Information</h3>
                
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500 uppercase tracking-wider">Email Address</span>
                  <span className="font-medium text-gray-900">{user.email || "No email provided"}</span>
                </div>

                <div className="flex flex-col">
                  <span className="text-sm text-gray-500 uppercase tracking-wider">Full Name</span>
                  <span className="font-medium text-gray-900">{user.fullname || user.name}</span>
                </div>

                <div className="flex flex-col">
                  <span className="text-sm text-gray-500 uppercase tracking-wider">Account Role</span>
                  <span className="inline-flex self-start px-2 py-1 mt-1 text-xs font-semibold text-emerald-800 bg-emerald-100 rounded-full">
                    {user.role || "User"}
                  </span>
                </div>
              </div>

              {/* Column 2 */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Academic Details</h3>
                
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500 uppercase tracking-wider">Department</span>
                  <span className="font-medium text-gray-900">{user.department || "General"}</span>
                </div>

                <div className="flex flex-col">
                  <span className="text-sm text-gray-500 uppercase tracking-wider">Campus Assignment</span>
                  <span className="font-medium text-gray-900 capitalize">{user.campus || "Main"}</span>
                </div>

                <div className="flex flex-col">
                  <span className="text-sm text-gray-500 uppercase tracking-wider">Member Since</span>
                  <span className="font-medium text-gray-900">
                    {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileOverview;