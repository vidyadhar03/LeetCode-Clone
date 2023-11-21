import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useData } from "../Utils/DataContext";

function NavBar() {
  const [email, setEmail] = useState("");
  const { authToken, userid } = useData();

  async function userDetails() {
    try {
      const response = await fetch("http://localhost:3000/me/" + userid, {
        method: "GET",
        headers: {
          authorization: localStorage.getItem("authToken"),
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = await response.json();
      console.log(json.email);
      setEmail(json.email);
    } catch (error) {
      console.error("Error during signup:", error);
    }
  }

  useEffect(() => {
    if (authToken) {
      userDetails();
    }
  });

  const navigate = useNavigate();
  return (
    <div className="w-screen bg-slate-50 shadow-md flex items-center justify-between px-4">
      <div
        className="text-black font-medium py-6 cursor-pointer"
        onClick={() => {
          navigate("/");
        }}
      >
        Leet Code
      </div>
      <div className="flex">
        {authToken ? (
          <div>{email}</div>
        ) : (
          <button
            className="bg-blue-200 hover:bg-blue-300 text-black rounded-xl shadow-md px-2 py-1 mx-2"
            onClick={() => {
              navigate("/login");
            }}
          >
            Sign In
          </button>
        )}
      </div>
    </div>
  );
}

export default NavBar;
