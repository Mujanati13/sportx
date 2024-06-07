import React, { useState } from "react";
import {
  Button,
  Drawer,
  Select,
  Input,
  TimePicker,
  Space,
  message,
} from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import { getCurrentDate } from "../../../utils/helper";

const AddClient = ({ Cours, CourDetils, Salle, SalleDetils, Coach }) => {
  const [ClientData, setClientData] = useState({
    id_cour: null,
    id_coach: null,
    id_salle: null,
    capacity: null,
    jour: null,
    heure_debut: null,
    heure_fin: null,
    cour: "",
    coach: "",
    salle: "",
    genre: "",
    day_name: "",
    date_reservation: getCurrentDate(),
    nb_reservations: 0,
  });

  const [open1, setOpen1] = useState(false);

  const isRoomFormValid = () => {
    return (
      ClientData.id_cour !== null &&
      ClientData.id_coach !== null &&
      ClientData.id_salle !== null &&
      ClientData.capacity !== null &&
      ClientData.jour !== null &&
      ClientData.heure_debut !== null &&
      ClientData.heure_fin !== null &&
      ClientData.cour !== "" &&
      ClientData.coach !== "" &&
      ClientData.salle !== "" &&
      ClientData.genre !== ""
    );
  };

  const addClient = async () => {
    const authToken = localStorage.getItem("jwtToken");
    try {
      if (!isRoomFormValid()) {
        message.error("Please fill in all required fields for the chamber.");
        return;
      }
      const response = await fetch(
        "https://fithouse.pythonanywhere.com/api/seance/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify(ClientData),
        }
      );
      if (response.ok) {
        const res = await response.json();
        if (res.msg === "Added successfully!!") {
          message.success("Séance ajoutée avec succès");
          setClientData({
            id_cour: null,
            id_coach: null,
            id_salle: null,
            capacity: null,
            jour: null,
            heure_debut: null,
            heure_fin: null,
            cour: "",
            coach: "",
            salle: "",
            genre: "",
            day_name: "",
            date_reservation: getCurrentDate(),
            nb_reservations: 0,
          });
          onCloseR();
        } else {
          message.warning(res.msg);
        }
      } else {
        message.error("Error adding chamber");
      }
    } catch (error) {
      message.error("An error occurred:", error);
    }
  };

  const showDrawerR = () => {
    setOpen1(true);
  };

  const onCloseR = () => {
    setOpen1(false);
  };

  const handleRoomSubmit = () => {
    addClient();
  };

  return (
    <>
      <Button type="default" onClick={showDrawerR} icon={<UserAddOutlined />}>
        Ajout seance
      </Button>
      <Drawer
        title="Saisir un nouveau seance"
        width={720}
        onClose={onCloseR}
        closeIcon={false}
        open={open1}
        bodyStyle={{
          paddingBottom: 80,
        }}
      >
        <div className="p-3 md:pt-0 md:pl-0 md:pr-10">
          <div className="grid grid-cols-2 gap-4 mt-5">
            <div>
              <label htmlFor="civilite" className="block font-medium">
                *Cours
              </label>
              <Select
                id="Cours"
                showSearch
                value={ClientData.cour}
                placeholder="Cours"
                className="w-full"
                optionFilterProp="children"
                onChange={(value) => {
                  const cour = CourDetils.filter(
                    (sal) => sal.id_cour === value
                  );
                  ClientData.cour = cour[0].nom_cour;
                  ClientData.genre = cour[0].genre;
                  setClientData({ ...ClientData, id_cour: value });
                }}
                filterOption={(input, option) =>
                  (option?.label ?? "").startsWith(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                options={Cours}
              />
            </div>
            <div>
              <label htmlFor="civilite" className="block font-medium">
                *Salle
              </label>
              <Select
                id="Salle"
                value={ClientData.salle}
                showSearch
                placeholder="Salle"
                className="w-full"
                optionFilterProp="children"
                onChange={(value, option) => {
                  const sale = SalleDetils.filter(
                    (sal) => sal.id_salle === value
                  );
                  ClientData.capacity = sale[0].capacity;
                  setClientData({
                    ...ClientData,
                    id_salle: value,
                    salle: option.label,
                  });
                }}
                filterOption={(input, option) =>
                  (option?.label ?? "").startsWith(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                options={Salle}
              />
            </div>
            <div>
              <label htmlFor="civilite" className="block font-medium">
                *Coach
              </label>
              <Select
                id="Coach"
                showSearch
                placeholder="Coach"
                className="w-full"
                optionFilterProp="children"
                onChange={(value, option) =>
                  setClientData({
                    ...ClientData,
                    id_coach: value,
                    coach: option.label,
                  })
                }
                filterOption={(input, option) =>
                  (option?.label ?? "").startsWith(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                options={Coach}
              />
            </div>
            <div>
              <label htmlFor="civilite" className="block font-medium">
                *Jour de la semaine
              </label>
              <Select
                id="Jour de la semaine "
                showSearch
                value={ClientData.day_name}
                placeholder="Jour de la semaine "
                className="w-full"
                optionFilterProp="children"
                onChange={(value, option) =>
                  setClientData({
                    ...ClientData,
                    jour: value,
                    day_name: option.label,
                  })
                }
                filterOption={(input, option) =>
                  (option?.label ?? "").startsWith(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                options={[
                  { label: "Lundi", value: 1 },
                  { label: "Mardi", value: 2 },
                  { label: "Mercredi", value: 3 },
                  { label: "Jeudi", value: 4 },
                  { label: "Vendredi", value: 5 },
                  { label: "Samedi", value: 6 },
                  { label: "Dimanche", value: 7 },
                ]}
              />
            </div>
            <div>
              <label>Heur debut</label>
              <div>
                <TimePicker
                  className="w-full"
                  format={"HH:mm"}
                  onChange={(time) => {
                    setClientData({
                      ...ClientData,
                      heure_debut: time.format("HH:mm"),
                    });
                  }}
                />
              </div>
            </div>
            <div>
              <label>Heur de fin</label>
              <div>
                <TimePicker
                  type="Time"
                  className="w-full"
                  onChange={(time) => {
                    setClientData({
                      ...ClientData,
                      heure_fin: time.format("HH:mm"),
                    });
                  }}
                  format={"HH:mm"}
                />
              </div>
            </div>
            <div>
              <label>Capacity</label>
              <Input disabled value={ClientData.capacity} />
            </div>
          </div>
          <Space className="mt-10">
            <Button danger onClick={onCloseR}>
              Annuler
            </Button>
            <Button onClick={handleRoomSubmit} type="default">
              Enregistrer
            </Button>
          </Space>
        </div>
      </Drawer>
    </>
  );
};

export default AddClient;
