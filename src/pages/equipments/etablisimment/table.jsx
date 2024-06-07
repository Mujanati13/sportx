import React, { useState, useEffect } from "react";
import { Space, Table, Tag } from "antd";

const TableEtablisimment = () => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const authToken =  localStorage.getItem("jwtToken"); // Replace with your actual auth token

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://fithouse.pythonanywhere.com/api/etablissements",
          {
            headers: {
              "Authorization": `Bearer ${authToken}`, // Include the auth token in the headers
            },
          }
        );
        const jsonData = await response.json();
        setData(jsonData.data);

        // Generate columns based on the desired keys
        const desiredKeys = [
          "nom_etablissement",
          "ville",
          "teletablissement",
          "mailetablissement",
          "sitewebetablissement",
          "nb_clients",
        ];
        const generatedColumns = desiredKeys.map((key) => ({
          title: capitalizeFirstLetter(key.replace(/\_/g, " ")), // Capitalize the first letter
          dataIndex: key,
          key,
          render: (text, record) => {
            if (key === "sitewebetablissement") {
              return <a href={text} target="_blank" rel="noopener noreferrer">{text}</a>;
            }
            return text;
          },
        }));
        setColumns(generatedColumns);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [authToken]);

  // Function to capitalize the first letter of a string
  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <Table size="large" className="w-full" columns={columns} dataSource={data} />
  );
};

export default TableEtablisimment;