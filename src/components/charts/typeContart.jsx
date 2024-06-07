import React, { useEffect, useState } from "react";
import { Pie } from "@ant-design/plots";

const TypeContart = () => {
  const [data, setData] = useState([]);
  const [labels, setLabels] = useState([]);
  const authToken = localStorage.getItem("jwtToken"); // Replace with your actual auth token

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch authentication token from your authentication mechanism

        const response = await fetch(
          "https://fithouse.pythonanywhere.com/api/clients/contracts/type/",
          {
            headers: {
              Authorization: authToken,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        setData(result.data);
        setLabels(result.labels);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  const config = {
    data: data.map((value, index) => ({ value, name: labels[index] })),
    angleField: "value",
    colorField: "name",
    legend: false,
    innerRadius: 0.6,
    labels: [
      { text: "name", style: { fontSize: 10, fontWeight: "bold", fill: "#000" } }, // Set fill color to black (#000)
      {
        text: (d, i, data) => (i < data.length - 3 ? d.value : ""),
        style: {
          fontSize: 5,
          dy: 12,
        },
      },
    ],
    style: {
      stroke: "#ffffff",
      inset: 1,
      radius: 10,
      color: "#000" 
    },
    scale: {
      color: {
        palette: "spectral",
        offset: (t) => t * 0.8 + 0.1,
      },
    },
    height: 250,
  };

  return <Pie {...config} />;
};

export default TypeContart;
