import React, { useState, useRef } from "react";
import { prmsuLogo } from "../assets";
import { CustomButton, FormInput } from "../components";
import { useNavigate } from "react-router-dom";
import { motion as Motion, AnimatePresence } from "framer-motion";


const Auth = () => {
  const [mode, setMode] = useState("login");

  const [loginLoading, setLoginLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [loginData, setLoginData] = useState({
    identifier: "",
    password: "",
  });

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    campus: "",
    department: "",
    position: "",
    password: "",
  });

  const navigate = useNavigate();


const handleLogin = async () => {
  if (loginLoading) return;

  setLoginLoading(true);
  setLoginError(""); // Clear previous errors

  try {
    const response = await fetch("http://127.0.0.1:5000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: loginData.identifier,
        password: loginData.password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setLoginError(data.message || "Invalid email or password");
      return;
    }

    // ✅ SUCCESS
    localStorage.setItem("user", JSON.stringify(data.user));

    // ✅ REDIRECT TO HOME
    navigate("/home");

  } catch (error) {
    console.error("LOGIN ERROR:", error);
    setLoginError("Server error. Please try again.");
  } finally {
    setLoginLoading(false);
  }
};

const handleRegister = async () => {
  if (registerLoading) return;

  setRegisterLoading(true);
  console.log("REGISTER DATA:", registerData);

  try {
    const response = await fetch("http://127.0.0.1:5000/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullname: registerData.name,
        email: registerData.email,
        password: registerData.password,
        role: "instructor",
        campus: registerData.campus,
        department: registerData.department,
        position: registerData.position,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Registration failed");
      return;
    }

    setRegisterData({
      name: "",
      email: "",
      campus: "",
      department: "",
      position: "",
      password: "",
    });

    setMode("login");

  } catch (error) {
    console.error("REGISTER ERROR:", error);
    alert("Server error. Please try again.");
  } finally {
    setRegisterLoading(false);
  }
};

  return (
    <div className="flex min-h-screen bg-slate-50 antialiased overflow-hidden">
      
      {/* LEFT SIDE - The Form */}
      <div className="w-full lg:w-[45%] flex items-center justify-center p-6 lg:p-10 bg-white z-20 shadow-2xl min-h-screen">
        <div className="w-full max-w-md">
          {/* Logo Section - Compacted margins */}
         <Motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center space-x-4 mb-8 pb-6 border-b border-slate-100"
          >
            {/* Modern Logo Container */}
            <div className="relative">
              <div className="p-2.5 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl shadow-inner border border-emerald-100/50">
                <img src={prmsuLogo} alt="PRMSU Logo" className="w-10 h-10 object-contain filter drop-shadow-sm" />
              </div>
              {/* Subtle status indicator for a "Portal" feel */}
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-white rounded-full flex items-center justify-center shadow-sm">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              </div>
            </div>

            {/* Text Content - Flex column keeps them together */}
            <div className="flex flex-col justify-center">
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-bold text-slate-900 tracking-tight leading-none">
                  {mode === "login" ? "Welcome Back" : "Create Account"}
                </h1>
                <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] font-bold rounded-md uppercase tracking-wider">
                  v2.0
                </span>
              </div>
              <p className="text-slate-400 font-semibold mt-1.5 tracking-[0.05em] uppercase text-[9px] flex items-center">
                <span className="w-4 h-[1px] bg-emerald-200 mr-2"></span>
                Extension Office Portal
              </p>
            </div>
          </Motion.div>

          {/* Form Container */}
          <Motion.div layout className="space-y-4">
            <AnimatePresence mode="wait">
              {mode === "login" ? (
                <Motion.div
                  key="login"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider ml-1">Email Address</label>
                    <FormInput
                      ref={emailRef}
                      type="email"
                      placeholder="name@university.edu"
                      value={loginData.identifier}
                      onChange={(e) => setLoginData({ ...loginData, identifier: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider ml-1">Password</label>
                    <FormInput
                      ref={passwordRef}
                      type="password"
                      placeholder="••••••••"
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    />
                  </div>
                </Motion.div>
              ) : (
                <Motion.div
                  key="register"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  /* REMOVED: max-h and overflow-y-auto to prevent inner scroll */
                  className="grid grid-cols-2 gap-x-3 gap-y-3"
                >
                  {/* Full Name */}
                  <div className="space-y-1 col-span-2">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider ml-1">Full Name</label>
                    <FormInput 
                      placeholder="John Doe" 
                      value={registerData.name} 
                      onChange={(e) => setRegisterData({...registerData, name: e.target.value})} 
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1 col-span-2">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider ml-1">Email Address</label>
                    <FormInput 
                      type="email" 
                      placeholder="you@example.com" 
                      value={registerData.email} 
                      onChange={(e) => setRegisterData({...registerData, email: e.target.value})} 
                    />
                  </div>

                  {/* Campus & Department Row */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider ml-1">Campus</label>
                    <FormInput 
                      type="select" 
                      options={[{label: "Iba", value: "iba"}, {label: "Botolan", value: "botolan"}]} 
                      value={registerData.campus} 
                      onChange={(e) => setRegisterData({...registerData, campus: e.target.value})} 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider ml-1">Dept.</label>
                    <FormInput 
                      type="select" 
                      options={[{label: "CCIT", value: "CCIT"}, {label: "CTHM", value: "CTHM"}]} 
                      value={registerData.department} 
                      onChange={(e) => setRegisterData({...registerData, department: e.target.value})} 
                    />
                  </div>

                  {/* Position */}
                  <div className="space-y-1 col-span-2">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider ml-1">Position</label>
                    <FormInput 
                      placeholder="Instructor" 
                      value={registerData.position} 
                      onChange={(e) => setRegisterData({...registerData, position: e.target.value})} 
                    />
                  </div>

                  {/* Password Row */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider ml-1">Password</label>
                    <FormInput 
                      type="password" 
                      placeholder="••••" 
                      value={registerData.password} 
                      onChange={(e) => setRegisterData({...registerData, password: e.target.value})} 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider ml-1">Confirm</label>
                    <FormInput 
                      type="password" 
                      placeholder="••••" 
                      value={registerData.confirmPassword} 
                      onChange={(e) => setRegisterData({...registerData, confirmPassword: e.target.value})} 
                    />
                  </div>
                </Motion.div>
              )}
            </AnimatePresence>

            {/* Error Message */}
            {loginError && (
              <Motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-red-50 border border-red-100 text-red-600 px-4 py-2 rounded-xl text-[11px] font-medium"
              >
                {loginError}
              </Motion.div>
            )}

            {/* Action Button */}
            <CustomButton
              title={mode === "login" ? "Sign In" : "Create Account"}
              handlePress={mode === "login" ? handleLogin : handleRegister}
              containerStyles="w-full py-3 bg-slate-900 hover:bg-emerald-600 text-white rounded-xl shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              isLoading={loginLoading || registerLoading}
            />

            {/* Switch Mode Button */}
            <p className="text-center text-slate-500 font-medium text-xs">
              {mode === "login" ? "New here?" : "Joined already?"}
              <button 
                type="button"
                onClick={() => {
                  setMode(mode === "login" ? "register" : "login");
                  setLoginError("");
                }}
                className="ml-2 text-emerald-600 font-bold hover:text-emerald-700 underline-offset-2 hover:underline transition-all"
              >
                {mode === "login" ? "Create account" : "Sign in"}
              </button>
            </p>
          </Motion.div>
        </div>
      </div>

      {/* RIGHT SIDE - Premium Mesh Panel */}
      <div className="hidden lg:flex lg:w-[55%] relative bg-[#0a0f1a] overflow-hidden items-center justify-center p-20">
        
        {/* Animated Mesh Blobs */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-600/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[0%] w-[400px] h-[400px] bg-teal-500/10 rounded-full blur-[100px]"></div>

        {/* Glassmorphism Card */}
        <Motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 w-full max-w-lg p-10 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl"
        >
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold tracking-widest uppercase">
            Platform Statistics
          </div>
          
          <h2 className="text-5xl font-bold text-white leading-[1.1] mb-6">
            Modern G.A.D <br />
            <span className="text-emerald-400">Management.</span>
          </h2>
          
          <p className="text-slate-400 text-lg leading-relaxed mb-10">
            {mode === "login" 
              ? "Access your dashboard to monitor extension programs and gender development initiatives across all campuses."
              : "Join our network of educators dedicated to campus development and community extension services."}
          </p>

          <div className="space-y-4">
            <FeatureRow text="Real-time Activity Reporting" />
            <FeatureRow text="Automated Compliance Tracking" />
            <FeatureRow text="Inter-Campus Collaboration" />
          </div>
        </Motion.div>

        {/* Subtle decorative grid */}
        <div className="absolute inset-0 opacity-[0.15] pointer-events-none" 
             style={{ backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`, backgroundSize: '40px 40px' }}>
        </div>
      </div>
    </div>
  );
};

const FeatureRow = ({ text }) => (
  <div className="flex items-center space-x-3 group">
    <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center group-hover:bg-emerald-500 transition-colors duration-300">
      <svg className="w-3.5 h-3.5 text-emerald-400 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
      </svg>
    </div>
    <span className="text-slate-300 font-medium group-hover:text-white transition-colors">{text}</span>
  </div>
);

export default Auth;