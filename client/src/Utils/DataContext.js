import React, { useState, useEffect, useContext } from "react";

export const DataContext = React.createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [problems, setProblems] = useState([]);
  const [authToken, setAuthtoken] = useState(null);
  const [userid, setUserId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/problems");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProblems(data.problems);
        console.log(data)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);


  return (
    <DataContext.Provider value={{ problems, setProblems,authToken, setAuthtoken,userid, setUserId }}>
      {children}
    </DataContext.Provider>
  );
};
