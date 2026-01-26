import React, { useState } from "react";
import { prmsuLogo } from "../assets";
import { CustomButton, FormInput } from "../components";
import { useNavigate } from "react-router-dom";


const Auth = () => {
  const [mode, setMode] = useState("login");

  const [loginLoading, setLoginLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [loginError, setLoginError] = useState("");


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
    <div className="flex min-h-screen">
      {/* LEFT SIDE - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img src={prmsuLogo} alt="PRMSU Logo" className="w-20 h-20" />
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold text-gray-900 mb-2 text-center">
            {mode === "login" ? "Sign In" : "Sign Up"}
          </h1>
          <p className="text-gray-500 text-center mb-2 text-base">Extension Office</p>
          <p className="text-gray-400 text-sm text-center mb-8">
            {mode === "login" 
              ? "Welcome back! Please enter your credentials" 
              : "Create your account to get started"}
          </p>

          {/* LOGIN FORM */}
          {mode === "login" && (
            <>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <FormInput
                    type="email"
                    placeholder="you@example.com"
                    value={loginData.identifier}
                    onChange={(e) => {
                      setLoginData({ ...loginData, identifier: e.target.value });
                      setLoginError("");
                    }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Password
                  </label>
                  <FormInput
                    type="password"
                    placeholder="••••••••"
                    value={loginData.password}
                    onChange={(e) => {
                      setLoginData({ ...loginData, password: e.target.value });
                      setLoginError("");
                    }}
                  />
                </div>

                {loginError && (
                  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                    {loginError}
                  </div>
                )}

                <CustomButton
                  title="Sign In"
                  handlePress={handleLogin}
                  containerStyles="mt-6"
                  isLoading={loginLoading}
                  loadingText="Signing in..."
                />
              </div>

              <p className="text-sm text-center mt-6 text-gray-600">
                Don't have an account?{" "}
                <span
                  className="text-emerald-600 cursor-pointer font-semibold hover:text-emerald-700 transition-colors"
                  onClick={() => {
                    setMode("register");
                    setLoginError("");
                  }}
                >
                  Sign up here
                </span>
              </p>
            </>
          )}

          {/* REGISTER FORM */}
          {mode === "register" && (
            <>
              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name
                  </label>
                  <FormInput
                    placeholder="John Doe"
                    value={registerData.name}
                    onChange={(e) =>
                      setRegisterData({ ...registerData, name: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <FormInput
                    type="email"
                    placeholder="you@example.com"
                    value={registerData.email}
                    onChange={(e) =>
                      setRegisterData({ ...registerData, email: e.target.value })
                    }
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Campus
                    </label>
                    <FormInput
                      type="select"
                      value={registerData.campus}
                      onChange={(e) =>
                        setRegisterData({ ...registerData, campus: e.target.value })
                      }
                      options={[
                        { label: "Iba Campus", value: "iba" },
                        { label: "Botolan Campus", value: "botolan" },
                      ]}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Department
                    </label>
                    <FormInput
                      type="select"
                      value={registerData.department}
                      onChange={(e) =>
                        setRegisterData({ ...registerData, department: e.target.value })
                      }
                      options={[
                        { label: "CCIT", value: "CCIT" },
                        { label: "CTHM", value: "CTHM" },
                        { label: "CIT", value: "CIT" },
                        { label: "COE", value: "COE" },
                      ]}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Position
                  </label>
                  <FormInput
                    placeholder="e.g., Professor, Instructor"
                    value={registerData.position}
                    onChange={(e) =>
                      setRegisterData({ ...registerData, position: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Password
                  </label>
                  <FormInput
                    type="password"
                    placeholder="••••••••"
                    value={registerData.password}
                    onChange={(e) =>
                      setRegisterData({ ...registerData, password: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <FormInput
                    type="password"
                    placeholder="••••••••"
                    value={registerData.confirmPassword}
                    onChange={(e) =>
                      setRegisterData({ ...registerData, confirmPassword: e.target.value })
                    }
                  />
                </div>

                <CustomButton
                  title="Create Account"
                  handlePress={handleRegister}
                  containerStyles="mt-6"
                  isLoading={registerLoading}
                  loadingText="Creating account..."
                />
              </div>

              <p className="text-sm text-center mt-6 text-gray-600">
                Already have an account?{" "}
                <span
                  className="text-emerald-600 cursor-pointer font-semibold hover:text-emerald-700 transition-colors"
                  onClick={() => setMode("login")}
                >
                  Sign in
                </span>
              </p>
            </>
          )}
        </div>
      </div>

      {/* RIGHT SIDE - Welcome Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 items-center justify-center p-12 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-60 h-60 bg-white/10 rounded-full blur-3xl"></div>
        
        <div className="text-white max-w-lg relative z-10">
          <h2 className="text-5xl font-bold mb-6 leading-tight">
            {mode === "login" ? "Welcome Back!" : "Join Us Today!"}
          </h2>
          <p className="text-emerald-50 text-lg leading-relaxed mb-10">
            {mode === "login" 
              ? "We're delighted to see you again! Access your G.A.D Extension Office account to manage programs, track activities, and collaborate with your team. Your contributions make a difference in promoting gender equality and development."
              : "Create your account to become part of the G.A.D Extension Office community. Together, we work towards advancing gender and development initiatives across our campuses. Join us in making a positive impact."}
          </p>
          
          <div className="space-y-5">
            <div className="flex items-start space-x-4 group">
              <div className="w-6 h-6 flex-shrink-0 mt-1 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-emerald-50 text-base">Access comprehensive program management tools</p>
            </div>
            <div className="flex items-start space-x-4 group">
              <div className="w-6 h-6 flex-shrink-0 mt-1 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-emerald-50 text-base">Collaborate with colleagues across campuses</p>
            </div>
            <div className="flex items-start space-x-4 group">
              <div className="w-6 h-6 flex-shrink-0 mt-1 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-emerald-50 text-base">Track and report on GAD activities seamlessly</p>
            </div>
          </div>

          {mode === "login" && (
            <div className="mt-12 pt-8 border-t border-white/20">
              <p className="text-emerald-100 text-sm">
                No account yet?{" "}
                <span 
                  className="font-semibold underline cursor-pointer hover:text-white transition-colors"
                  onClick={() => setMode("register")}
                >
                  Sign up now
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;