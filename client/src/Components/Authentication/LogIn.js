import { useState } from "react";
import { useData } from "../../Utils/DataContext";
import { useNavigate } from "react-router-dom";

function LogIn() {
  const [login, setlogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  //state data access
  const {authToken,setAuthtoken,setUserId} = useData()
  console.log(authToken,"access from state data")
  

  async function Signup() {
    try {
      const response = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = await response.json();
      console.log(json.msg);
      if(json.msg==="Success"){
        LogIn()
      }
    } catch (error) {
      console.error('Error during signup:', error);
    }
  }

  async function Login() {
    try {
      console.log(email)
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (!response.ok) {
        console.log(response.status);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = await response.json();
      console.log(json.token);
      console.log(json.userid);
      setAuthtoken(json.token);
      setUserId(json.userid);
      navigate("/");

    } catch (error) {
      console.error('Error during signup:', error);
    }
  }

  return (
    <div className=" flex  items-center justify-center">
      <div className="bg-white p-10 rounded-2xl shadow-xl mt-6">
        <div className="flex flex-col items-center">
          {/* Logo placeholder */}
          <div className="mb-6">{/* Insert Logo Here */}</div>
          <h1 className="text-2xl font-bold mb-8">LeetCode</h1>
          <input
            type="text"
            className="w-full border border-gray-300 p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Username or E-mail"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            className="w-full border border-gray-300 p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button
            className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 mb-4"
            onClick={() => {
              login ? Login() : Signup();
            }}
          >
            {login ? "Log In" : "Sign Up"}
          </button>
          <a
            href="#forgot-password"
            className="text-blue-600 hover:underline mb-4"
          >
            {login ? "Forgot Password?" : ""}
          </a>
          <button
            className="text-blue-600 hover:underline"
            onClick={() => {
              login ? setlogin(false) : setlogin(true);
            }}
          >
            {login ? "Sign Up" : "Log In"}
          </button>
        </div>
        <div className="text-center mt-4">
          <p className="text-gray-400 text-xs">
            This site is protected by reCAPTCHA and the Google{" "}
            <a href="#privacy-policy" className="text-blue-600 hover:underline">
              Privacy Policy{" "}
            </a>
            and{" "}
            <a
              href="#terms-of-service"
              className="text-blue-600 hover:underline"
            >
              Terms of Service{" "}
            </a>
            apply.
          </p>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
