import { DualAxes } from "@ant-design/plots";
import React, { useState, useEffect } from "react";
import moment from 'moment';

const DemoDualAxes = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false); // State to manage loading status
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const authToken = localStorage.getItem("jwtToken");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true when fetching data starts
      try {
        const response = await fetch(
          `https://fithouse.pythonanywhere.com/api/reservations/date/course/?start_date=2024-05-01&end_date=2024-06-01`,
          {
            headers: {
              Authorization: authToken,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();

        // Helper function to get the week number and year from a date
        const getWeek = (date) => {
          const m = moment(date);
          return `${m.year()}-W${m.week()}`;
        };

        // Format the API data to aggregate by week
        const weeklyData = {};

        Object.entries(jsonData).forEach(([date, courses]) => {
          const week = getWeek(date);
          if (!weeklyData[week]) {
            weeklyData[week] = { value: 0, count: 0 };
          }
          weeklyData[week].value += Object.values(courses).reduce(
            (acc, val) => acc + val,
            0
          );
          weeklyData[week].count += Object.values(courses).reduce(
            (acc, val) => acc + val,
            0
          );
        });

        const formattedData = Object.entries(weeklyData)
          .map(([week, { value, count }]) => ({
            year: week,
            value,
            count,
          }))
          .sort(
            (a, b) =>
              moment(a.year, "YYYY-WW").toDate() -
              moment(b.year, "YYYY-WW").toDate()
          );

        setData(formattedData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false); // Set loading to false when data fetching is complete
      }
    };

    fetchData();
  }, []); // Fetch data when startDate or endDate changes

  const data1 = [
    { year: "1991", value: 3, count: 10 },
    { year: "1992", value: 4, count: 4 },
    { year: "1993", value: 3.5, count: 5 },
    { year: "1994", value: 5, count: 5 },
    { year: "1995", value: 4.9, count: 4.9 },
    { year: "1996", value: 6, count: 35 },
    { year: "1997", value: 7, count: 7 },
    { year: "1998", value: 9, count: 1 },
    { year: "1999", value: 13, count: 20 },
  ];

  const config = {
    data,
    xField: "year",
    legend: true,
    height: 330,
    children: [
      {
        type: "line",
        yField: "value",
        style: {
          stroke: "#5B8FF9",
          lineWidth: 2,
        },
        axis: {
          y: {
            title: "value",
            style: { titleFill: "#5B8FF9" },
          },
        },
      },
      {
        type: "line",
        yField: "count",
        style: {
          stroke: "#5AD8A6",
          lineWidth: 2,
        },
        axis: {
          y: {
            position: "right",
            title: "count",
            style: { titleFill: "#5AD8A6" },
          },
        },
      },
    ],
  };
  return <DualAxes {...config} />;
};

export default DemoDualAxes;
