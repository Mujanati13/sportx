import React, { useState, useEffect } from "react";
import { Button, Spin } from "antd"; // Import Spin component for loading animation
import { BookOutlined } from "@ant-design/icons";

function Reservations() {
  const [numberOfReservations, setNumberOfReservations] = useState(0);
  const [loading, setLoading] = useState(true); // State to manage loading animation

  useEffect(() => {
    async function fetchReservations() {
      try {
        const response = await fetch("https://fithouse.pythonanywhere.com/api/reservation/");
        if (response.ok) {
          const data = await response.json();
          setNumberOfReservations(data.data.length);
        } else {
          console.error("Failed to fetch reservations:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching reservations:", error);
      } finally {
        // Set loading to false after fetching is done, regardless of success or failure
        setLoading(false);
      }
    }

    fetchReservations();
  }, []);

  return (
    <div className="w-[22%] h-60 bg-white shadow-sm rounded-md">
      <div className="w-full h-36 bg-white border border-red-100 bottom-1 rounded-md p-3">
        <div className="flex items-center space-x-2">
          <div className="h-10 w-10 rounded-full bg-orange-200 flex justify-center ">
            <BookOutlined className="text-lg" />
          </div>
          <div className="text-sm font-medium">Reservations</div>
        </div>
        {loading ? ( // Conditional rendering of loading animation
          <div className="p-2 flex flex-col justify-center w-full mt-5">
            <Spin size="large" /> {/* Display Spin component while loading */}
          </div>
        ) : (
          <div className="p-2 flex  items-center space-x-1 w-full mt-5">
            <div>Reservations:</div> <span className="font-medium text-sm">{numberOfReservations}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Reservations;
