import React, { useState } from "react";
import { prmsuLogo } from "../assets";
import { CustomButton, FormInput } from "../components";

const Auth = () => {
  const [mode, setMode] = useState("login");

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

  const handleLogin = () => {
    console.log("LOGIN DATA:", loginData);
  };

  const handleRegister = () => {
    console.log("REGISTER DATA:", registerData);
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
