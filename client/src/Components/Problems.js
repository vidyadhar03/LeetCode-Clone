import { useContext } from "react";
import { DataContext } from "../Utils/DataContext";
import { useNavigate } from "react-router-dom";

function Problems() {
  const { problems } = useContext(DataContext);
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-3xl  rounded-ll shadow-sm my-4">
      {/* Header */}
      <div className="grid grid-cols-3 bg-gray-200 p-4 rounded-t-ll">
        <div className="font-semibold text-md">Title</div>
        <div className="font-semibold text-md text-left">Acceptance</div>
        <div className="font-semibold text-md text-left">Difficulty</div>
      </div>

      {/* Data Rows */}
      {problems.map((problem, index) => (
        <div
          key={index}
          className="grid grid-cols-3 items-center p-4 border-b border-gray-200"
        >
          {/* Title */}
          <div className="col-span-1 pr-4">
            <h3
              className="font-semibold text-md cursor-pointer hover:text-blue-500"
              onClick={() => {
                navigate(`/problem/${problem.probid}`);
              }}
            >
              {index + 1}. {problem.title}
            </h3>
          </div>

          {/* Acceptance */}
          <div className="col-span-1 text-sm text-gray-500 text-left">
            {problem.acceptance}
          </div>

          {/* Difficulty */}
          <div
            className={`col-span-1 text-sm font-semibold text-left px-2 ${
              problem.difficulty === "Easy"
                ? "text-green-500"
                : problem.difficulty === "Medium"
                ? "text-yellow-500"
                : "text-red-500"
            }`}
          >
            {problem.difficulty}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Problems;
