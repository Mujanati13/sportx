import React, { useState, useEffect } from "react";
import {
  PlusOutlined,
  FileAddOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import {
  Button,
  Drawer,
  Space,
  Input,
  Select,
  message,
 
} from "antd";
import dayjs from "dayjs";
import "dayjs/locale/fr"; // Import French locale for Day.js
import { getCurrentDate } from "../../../utils/helper";

dayjs.locale("fr");

const AddNewReservation = () => {
  const [open1, setOpen1] = useState(false);
  const [clients, setClients] = useState([]);
  const [Cour, setCour] = useState([]);
  const [Seance, setSeance] = useState([]);
  const [selectedSeance, setSelectedSeance] = useState([]);
  const [ReservationData, setReservationData] = useState({
    id_client: null,
    id_seance: null,
    date_operation: getCurrentDate(),
    date_presence: null,
    status: null,
    presence: null,
    motif_annulation: null,
  });

  const fetchClients = async () => {
    try {
      const response = await fetch(
        "https://fithouse.pythonanywhere.com/api/clients/"
      );
      const data = await response.json();
      setClients(data.data);
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };
  const fetchCours = async () => {
    const authToken = localStorage.getItem("jwtToken"); // Replace with your actual auth token

    try {
      const response = await fetch(
        "https://fithouse.pythonanywhere.com/api/cours/",
        {
          headers: {
            Authorization: `Bearer ${authToken}`, // Include the auth token in the headers
          },
        }
      );
      const data = await response.json();
      setCour(data.data);
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };

  const fetchSeance = async (id_client, cour_id) => {
    const authToken = localStorage.getItem("jwtToken");
    if (id_client && cour_id) {
      try {
        const response = await fetch(
          `https://fithouse.pythonanywhere.com/api/seance/?cour_id=${cour_id}&client_id=${id_client}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        const data = await response.json();
        console.log(data);
        setSeance(data.data);
      } catch (error) {
        console.error("Error fetching seance:", error);
      }
    }
  };

  useEffect(() => {
    fetchClients();
    fetchCours();
  }, []);

  const isReservationFormValid = () => {
    return (
      ReservationData.date_presence !== "" &&
      ReservationData.heur_debut !== "" &&
      ReservationData.heure_fin !== ""
    );
  };

  const addReservation = async () => {
    try {
      if (!isReservationFormValid()) {
        message.error(
          "Please fill in all required fields for the reservation."
        );
        return;
      }
      ReservationData.id_seance = selectedSeance.id_seance
      ReservationData.date_presence = selectedSeance.date_reservation
      const response = await fetch(
        "https://fithouse.pythonanywhere.com/api/reservation/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(ReservationData),
        }
      );
      if (response.ok) {
        const res = await response.json();
        if (res.msg === "Added Successfully!!") {
          message.success("Reservation added successfully");
          onCloseR();
        } else {
          message.warning(res.msg);
          console.log(res);
        }
      } else {
        console.log(response);
        message.error("Error adding reservation");
      }
    } catch (error) {
      console.log(error);
      message.error("An error occurred:", error);
    }
  };

  const showDrawerR = () => {
    setOpen1(true);
  };

  const onCloseR = () => {
    setOpen1(false);
  };

  const handleReservationSubmit = () => {
    addReservation();
  };

  return (
    <>
      <div className="flex items-center space-x-3">
        <Button type="default" onClick={showDrawerR} icon={<FileAddOutlined />}>
          Ajouter Réservation
        </Button>
      </div>
      <Drawer
        title="Saisir un nouveau Réservation"
        // width={720}
        size="default"
        onClose={onCloseR}
        closeIcon={false}
        open={open1}
        bodyStyle={{
          paddingBottom: 80,
        }}
      >
        <div>
          <div className="p-3 md:pt-0 md:pl-0 md:pr-10">
            <div className="">
              <div className="grid grid-cols-2 gap-4 mt-5">
                <Select
                  showSearch
                  onChange={(value) => {
                    setReservationData({ ...ReservationData, id_client: value });
                    fetchSeance(value, ReservationData.cour);
                  }}
                  placeholder="Client"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "").includes(input)
                  }
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? "")
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? "").toLowerCase())
                  }
                  options={clients.map((client) => ({
                    value: client.id_client,
                    label: `${client.nom_client} ${client.prenom_client}`,
                  }))}
                />

                <Select
                  showSearch
                  onChange={(value) => {
                    setReservationData({ ...ReservationData, cour: value });
                    fetchSeance(ReservationData.client, value);
                  }}
                  placeholder="Cours"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "").includes(input)
                  }
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? "")
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? "").toLowerCase())
                  }
                  options={Cour.map((cour) => ({
                    value: cour.id_cour,
                    label: `${cour.nom_cour}`,
                  }))}
                />
                <Select
                  showSearch
                  onChange={(value) => {
                    const selectedSeance = Seance.find(
                      (seance) => seance.id_seance === value
                    );
                    setSelectedSeance(selectedSeance)
                    setReservationData({
                      ...ReservationData,
                      id_seance: value,
                    });
                  }}
                  placeholder="Seance"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "").includes(input)
                  }
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? "")
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? "").toLowerCase())
                  }
                  options={Seance.map((seance) => ({
                    value: seance.id_seance,
                    label: `${seance.coach}`,
                  }))}
                />
              </div>
            </div>
            <Space className="mt-10">
              <Button danger onClick={onCloseR}>
                Annuler
              </Button>
              <Button onClick={handleReservationSubmit} type="default">
                Enregistrer
              </Button>
            </Space>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default AddNewReservation;
