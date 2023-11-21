import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useData } from "../Utils/DataContext";

function ProblemDescription() {
  const { probid } = useParams();
  const [problem, setProblem] = useState(null);
  const [submission, setSubmission] = useState("");
  const [submissions, setSubmissions] = useState(null);
  const { authToken, userid } = useData();

  async function getProblem() {
    const response = await fetch("http://localhost:3000/problem/" + probid, {
      method: "GET",
    });

    const json = await response.json();
    setProblem(json.problem);
  }

  async function getSubmissions() {
    const response = await fetch("http://localhost:3000/submissions/" + probid, {
      method: "GET",
    });

    const json = await response.json();
    setSubmissions(json.submissions);
  }


  // async function getSubmissions() {
  //   try {
  //     const response = await fetch(
  //       "http://localhost:3000/submissions/" + probid,
  //       {
  //         method: "GET",
  //         headers: {
  //           authorization: authToken,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }

  //     const json = await response.json();
  //     console.log(json.submissions, "problem submissions");
  //     setSubmissions(json.submissions);
  //   } catch (error) {
  //     console.error("Error during signup:", error);
  //   }
  // }

  
  async function SubmitProblem() {
    try {
      const response = await fetch("http://localhost:3000/submissions", {
        method: "POST",
        headers: {
          authorization: authToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          problemId: probid,
          submission: submission,
          userid: userid,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = await response.json();
      console.log(json);
      // getSubmissions();
    } catch (error) {
      console.error("Error during signup:", error);
    }
  }

  useEffect(() => {
    getProblem();
    getSubmissions();
  });

  if (!problem) {
    return <div>Loading problem description or problem not found...</div>;
  }

  return (
    <div className="flex flex-row">
      <div className="flex-1 overflow-y-auto border-r-2 p-6 h-screen">
        <h1 className="text-black font-bold text-xl">{problem.title}</h1>
        <div
          className={`text-sm font-semibold text-left mt-2 ${
            problem.difficulty === "Easy"
              ? "text-green-500"
              : problem.difficulty === "Medium"
              ? "text-yellow-500"
              : "text-red-500"
          }`}
        >
          {problem.difficulty}
        </div>
        <div className="mt-2">{problem.description}</div>
        <div className="">
          {problem.testcases.map((testcase, index) => (
            <div key={index}>
              <div className="text-black font-semibold mt-4">
                Example {index + 1}
              </div>
              <div className="border-l-2 px-4 font-serif">
                <div className="flex flex-row mt-2">
                  <div className="text-black font-bold mr-2">Input:</div>
                  {testcase.Input}
                </div>
                <div className="flex flex-row">
                  <div className="text-black font-bold mr-2">Output:</div>
                  {testcase.Output}
                </div>
                <div className="flex flex-col">
                  <div className="text-black font-bold">Explaination:</div>
                  {testcase.Explaination}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="border-t-2 mt-8"></div>
        <div className="">
          <div className="text-lg  mt-4 font-semibold">Submissions</div>
          {submission ? (
            <div>
              {submissions.map((lsubmission, key) => (
                <div key={key} className="p-2 m-2 flex flex-row">
                  <div className="text-bold">{lsubmission.userId}</div>
                  <div className="ml-2">{lsubmission.submission}</div>
                </div>
              ))}
            </div>
          ) : (
            <div>No submissions present</div>
          )}
        </div>
      </div>
      <div className="flex-1 flex flex-col h-screen">
        <h2>Code Here</h2>
        <div className="flex-1 p-2">
          <textarea
            className="w-full h-full p-1 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-1 focus:ring-blue-200"
            placeholder="Code Here..."
            onChange={(e) => {
              setSubmission(e.target.value);
            }}
          />
        </div>
        <div className="p-2">
          <button
            className="bg-green-400 hover:bg-green-500 text-black rounded-xl shadow-md px-2 py-1 mx-2"
            onClick={() => {
              SubmitProblem();
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProblemDescription;
