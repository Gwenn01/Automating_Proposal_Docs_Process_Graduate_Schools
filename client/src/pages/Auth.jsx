import React, { useState } from "react";
import { prmsuLogo } from "../assets";
import { CustomButton, FormInput } from "../components";
import { useNavigate } from "react-router-dom";


const Auth = () => {
  const [mode, setMode] = useState("login");

  const [loginLoading, setLoginLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);


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
      alert(data.message || "Login failed");
      return;
    }

    // ✅ SUCCESS
    localStorage.setItem("user", JSON.stringify(data.user));


    // ✅ REDIRECT TO HOME
    navigate("/home");

  } catch (error) {
    console.error("LOGIN ERROR:", error);
    alert("Server error. Please try again.");
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

    alert("Registration successful!");

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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">

        {/* HEADER */}
        <div className="flex flex-col items-center mb-6">
          <img src={prmsuLogo} alt="logo" className="w-24 h-24 mb-2" />
          <h1 className="font-semibold text-center text-lg">
            G.A.D Extension Office
          </h1>
          
          <h1 className="text-xl font-semibold">{mode === "login" ? "Login" : "Register"}</h1>
        </div>

        {/* LOGIN */}
        {mode === "login" && (
          <>
            <p className="font-semibold text-md mb-1">Email:</p>
            <FormInput
              placeholder=""
              value={loginData.identifier}
              onChange={(e) =>
                setLoginData({ ...loginData, identifier: e.target.value })
              }
            />
            <p className="font-semibold text-md mb-1">Password:</p>
            <FormInput
              type="password"
              placeholder=""
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
            />

            <CustomButton
              title="Login"
              handlePress={handleLogin}
              containerStyles="mt-4"
              isLoading={loginLoading}
              loadingText="Logging in..."
            />

            <p className="text-sm text-center mt-4">
              Don’t have account? {" "}
              <span
                className="text-secondary cursor-pointer font-semibold"
                onClick={() => setMode("register")}
              >
                Register here
              </span>
            </p>
          </>
        )}

        {/* REGISTER */}
        {mode === "register" && (
          <>
            <p className="font-semibold text-sm mb-1">Full Name:</p>
            <FormInput
              placeholder=""
              onChange={(e) =>
                setRegisterData({ ...registerData, name: e.target.value })
              }
            />

            <p className="font-semibold text-md mb-1">Email:</p>
            <FormInput
              type="email"
              placeholder=""
              onChange={(e) =>
                setRegisterData({ ...registerData, email: e.target.value })
              }
            />

        <div className="flex items-center justify-center gap-4">

          {/* CAMPUS */}
          <div className="w-full">
            <p className="font-semibold text-md mb-1">Campus:</p>
            <FormInput
              type="select"
              placeholder=""
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

          {/* DEPARTMENT */}
          <div className="w-full">
            <p className="font-semibold text-md mb-1">Department:</p>
            <FormInput
              type="select"
              placeholder=""
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



            <p className="font-semibold text-md mb-1">Position:</p>
            <FormInput
              placeholder=""
              onChange={(e) =>
                setRegisterData({ ...registerData, position: e.target.value })
              }
            />

            <p className="font-semibold text-md mb-1">Password:</p>
            <FormInput
              type="password"
              placeholder=""
              onChange={(e) =>
                setRegisterData({ ...registerData, password: e.target.value })
              }
            />
            <p className="font-semibold text-md mb-1">Confirm Password:</p>
            <FormInput
              type="password"
              placeholder=""
              onChange={(e) =>
                setRegisterData({ ...registerData, password: e.target.value })
              }
            />

            <CustomButton
              title="Register"
              handlePress={handleRegister}
              containerStyles="mt-4"
              isLoading={registerLoading}
              loadingText="Registering..."
            />

            <p className="text-sm text-center mt-4">
              Already have an account?{" "}
              <span
                className="text-secondary cursor-pointer font-semibold"
                onClick={() => setMode("login")}
              >
                Login
              </span>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Auth;
