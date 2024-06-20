import { Calendar, dayjsLocalizer } from "react-big-calendar";
import dayjs from "dayjs";
import "dayjs/locale/fr"; // Import French locale for Day.js
import { useState, useEffect } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css"; // if using DnD
// Set Day.js to use the French locale globally
dayjs.locale("fr");
const localizer = dayjsLocalizer(dayjs);
import {
  PlusOutlined,
  FileAddOutlined,
  UserAddOutlined,
  SearchOutlined,
} from "@ant-design/icons";

import {
  Button,
  Drawer,
  Space,
  Input,
  Select,
  message,
  Modal,
  DatePicker,
  Table,
} from "antd";
import "dayjs/locale/fr"; // Import French locale for Day.js

// calander
import { getCurrentDate, convertToDateTime } from "../../../utils/helper";
import Paper from "@mui/material/Paper";
import { ViewState, EditingState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  Appointments,
  AppointmentForm,
  AppointmentTooltip,
  WeekView,
  EditRecurrenceMenu,
  AllDayPanel,
  ConfirmationDialog,
} from "@devexpress/dx-react-scheduler-material-ui";

const fetchReservations = async () => {
  try {
    const response = await fetch(
      "https://fithouse.pythonanywhere.com/api/reservation/"
    );
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching reservations:", error);
    return [];
  }
};

const transformReservations = (reservations) => {
  return reservations.map((reservation) => ({
    id: reservation.id_reservation,
    id_seance: reservation.id_seance,
    title: `${reservation.cour} - ${reservation.cour}`,
    start: new Date(reservation.date_presence + "T" + reservation.heur_debut),
    end: new Date(reservation.date_presence + "T" + reservation.heure_fin),
    datestart: reservation.heur_debut,
    dateend: reservation.heure_fin,
    coach: reservation.coach,
    allDay: false,
    resource: reservation.salle,
  }));
};

export const TableReservation = () => {
  const [data, setData] = useState([]);
  const [currentDate] = useState(getCurrentDate());
  const [addedAppointment, setAddedAppointment] = useState({});
  const [appointmentChanges, setAppointmentChanges] = useState({});
  const [editingAppointment, setEditingAppointment] = useState(undefined);
  const [add, setAdd] = useState();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isModalVisible1, setIsModalVisible1] = useState(false);


  const openCustomForm = (appointmentData) => {
    setEditingAppointment(appointmentData);
    console.log(JSON.stringify(appointmentData.id));
    handleEditClickCalander(JSON.stringify(appointmentData.id));
    setIsFormVisible(true);
  };

  const handleEditClickCalander = (id) => {
    if (true) {
      console.log(data);
      const clientToEdit = data.find((client) => client.key == id);
      console.log(clientToEdit);
      if (clientToEdit != undefined) {
        setIsModalVisible1(true);
      }
      setEditingClient(clientToEdit);
      form.setFieldsValue(clientToEdit);
      // setIsModalVisible(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, [add]);

  const fetchData = async () => {
    const authToken = localStorage.getItem("jwtToken"); // Remplacez par votre véritable jeton d'authentification

    try {
      const response = await fetch(
        "https://fithouse.pythonanywhere.com/api/reservation/",
        {
          headers: {
            Authorization: `Bearer ${authToken}`, // Inclure le jeton d'authentification dans les en-têtes
          },
        }
      );

      const data = await response.json();

      const convertToDate = (date_presence, heur_debut) => {
        const [year, month, day] = date_presence.split("-").map(Number);
        const [hours, minutes, seconds] = heur_debut.split(":").map(Number);
        return new Date(year, month - 1, day, hours, minutes, seconds);
      };

      // Outputs: Mon Jun 17 2024 14:30:00 GMT+0100 (GMT+01:00)

      console.log(data);
      //   console.log(data.data);
      // const formattedData = data.data.map((item) => ({
      //   id: item.id_seance,
      //   title: `${item.cour} - ${item.cour}`,
      //   startDate: convertToDateTime(item).startDate,
      //   endDate: convertToDateTime(item).endDate,
      // }));

      const formattedData = data.data.map((reservation) => ({
        id: reservation.id_reservation,
        id_seance: reservation.id_seance,
        title: `${reservation.cour} - ${reservation.cour}`,
        startDate: convertToDate(
          reservation.date_presence,
          reservation.heur_debut
        ),
        endDate: convertToDate(
          reservation.date_presence,
          reservation.heure_fin
        ),
        // datestart: reservation.heur_debut,
        // dateend: reservation.heure_fin,
        coach: reservation.coach,
        allDay: false,
        resource: reservation.salle,
      }));
      setData(formattedData);
      console.log(formattedData);
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
    }
  };

  const commitChanges = ({ added, changed, deleted }) => {
    setData((prevData) => {
      let updatedData = prevData;
      if (added) {
        const startingAddedId =
          updatedData.length > 0
            ? updatedData[updatedData.length - 1].id + 1
            : 0;
        updatedData = [...updatedData, { id: startingAddedId, ...added }];
      }
      if (changed) {
        updatedData = updatedData.map((appointment) =>
          changed[appointment.id]
            ? { ...appointment, ...changed[appointment.id] }
            : appointment
        );
      }
      if (deleted !== undefined) {
        updatedData = updatedData.filter(
          (appointment) => appointment.id !== deleted
        );
      }
      return updatedData;
    });
  };

  //----------------
  const [events, setEvents] = useState([]);
  const [open1, setOpen1] = useState(false);
  const [clients, setClients] = useState([]);
  const [Cour, setCour] = useState([]);
  const [Seance, setSeance] = useState([]);
  const [SeancInfos, SetSeancInfos] = useState([]);
  const [selectedSeance, setSelectedSeance] = useState([]);
  const [event, setevent] = useState([]);
  const [selectedEventIdSeance, setSelectedEventIdSeance] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);
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
    setSelectedSeance([]);
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
      ReservationData.id_seance = selectedSeance.id_seance;
      ReservationData.date_presence = selectedSeance.date_reservation;
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
          message.success("Réservation ajoutée avec succès");
          setAdd(Math.random() * 1000);
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
    setSelectedSeance([]);
  };

  const handleReservationSubmit = () => {
    addReservation();
    setSelectedSeance([]);
  };

  useEffect(() => {
    const fetchAndTransformReservations = async () => {
      const reservations = await fetchReservations();
      const transformedEvents = transformReservations(reservations);
      setEvents(transformedEvents);
    };

    fetchAndTransformReservations();
  }, [add]);

  const fetchClientParSeance = async (e) => {
    console.log("====================================");
    console.log(e);
    console.log("====================================");
    const authToken = localStorage.getItem("jwtToken");
    try {
      const response = await fetch(
        `https://fithouse.pythonanywhere.com/api/Etudiant_by_resevation?id_seance=${e.id_seance}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      const data = await response.json();
      console.log(data); // You can handle the fetched client data here
      setSelectedEventIdSeance(data.data);
    } catch (error) {
      console.error("Error fetching client data:", error);
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };
  const handleModalCancel2 = () => {
    setIsModalVisible2(false);
  };
  const handleModal2 = () => {
    setIsModalVisible2(true);
  };

  useEffect(() => {
    const dataSource = selectedEventIdSeance.map((obj) => ({
      key: obj.id_client, // or any unique identifier
      fullName: `${obj.nom_client} ${obj.prenom_client}`,
      mail: obj.mail,
    }));
    setevent(dataSource);
  }, [selectedEventIdSeance]);

  return (
    <div className="w-full p-2">
      <div className="flex items-center justify-between mt-3">
        <div className=" w-52">
          <Input prefix={<SearchOutlined />} placeholder="Search Reservation" />
        </div>
        <div>
          <>
            <div className="flex items-center space-x-3">
              <Button
                type="default"
                onClick={showDrawerR}
                icon={<FileAddOutlined />}
              >
                Ajouter Réservation
              </Button>
            </div>
            <Drawer
              title="Saisir une nouvelle réservation"
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
                      <div className="flex flex-col">
                        <label htmlFor="">Client</label>
                        <Select
                          className="w-full"
                          showSearch
                          onChange={(value) => {
                            setReservationData({
                              ...ReservationData,
                              id_client: value,
                            });
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
                              .localeCompare(
                                (optionB?.label ?? "").toLowerCase()
                              )
                          }
                          options={clients.map((client) => ({
                            value: client.id_client,
                            label: `${client.nom_client} ${client.prenom_client}`,
                          }))}
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="">Cours</label>
                        <Select
                          className="w-full"
                          showSearch
                          onChange={(value) => {
                            setReservationData({
                              ...ReservationData,
                              cour: value,
                            });
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
                              .localeCompare(
                                (optionB?.label ?? "").toLowerCase()
                              )
                          }
                          options={Cour.map((cour) => ({
                            value: cour.id_cour,
                            label: `${cour.nom_cour}`,
                          }))}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col mt-5">
                      <label htmlFor="">Seance</label>
                      <Select
                        className="w-full"
                        showSearch
                        disabled={Seance.length <= 0}
                        onChange={(value) => {
                          const selectedSeance = Seance.find(
                            (seance) => seance.id_seance === value
                          );
                          setSelectedSeance(selectedSeance);
                          console.log("====================================");
                          console.log(selectedSeance);
                          console.log("====================================");
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
                          label: `${seance.cour} ${seance.day_name} ${seance.heure_debut} ${seance.heure_fin}`,
                        }))}
                      />
                    </div>
                    <div className="mt-5">
                      <label htmlFor="">Creneau</label>
                      <input
                        disabled={true}
                        className="w-full"
                        value={selectedSeance.date_reservation}
                      />
                    </div>
                    <div>
                      Du {selectedSeance.heure_debut} à{" "}
                      {selectedSeance.heure_fin}
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
        </div>
      </div>
      <div className="mt-5">
        {/* <Calendar
          localizer={localizer}
          onDoubleClickEvent={(e) => {
            setIsModalVisible(true);
            fetchClientParSeance(e);
            SetSeancInfos(e);
          }}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 400 }}
          messages={{
            date: "Date",
            time: "Heure",
            event: "Événement",
            allDay: "Toute la journée",
            week: "Semaine",
            work_week: "Semaine de travail",
            day: "Jour",
            month: "Mois",
            previous: "Précédent",
            next: "Suivant",
            yesterday: "Hier",
            tomorrow: "Demain",
            today: "Aujourd'hui",
            agenda: "Agenda",
            noEventsInRange: "Aucun événement dans cette période.",
            showMore: (total) => `+ ${total} de plus`,
          }}
        /> */}
        <Paper>
          <Scheduler data={data} height={410}>
            <ViewState currentDate={currentDate} />
            <EditingState
              onCommitChanges={commitChanges}
              addedAppointment={addedAppointment}
              onAddedAppointmentChange={setAddedAppointment}
              appointmentChanges={appointmentChanges}
              onAppointmentChangesChange={setAppointmentChanges}
              editingAppointment={editingAppointment}
              onEditingAppointmentChange={setEditingAppointment}
            />
            <WeekView startDayHour={8} endDayHour={24} />
            <AllDayPanel />
            <EditRecurrenceMenu />
            <ConfirmationDialog />
            <Appointments />
            <AppointmentTooltip showOpenButton showDeleteButton />
            <AppointmentForm />
          </Scheduler>
        </Paper>
      </div>
      <Modal
        title={"List des clients"}
        visible={isModalVisible2}
        onOk={handleModalCancel2}
        onCancel={handleModalCancel2}
      >
        <div className="h-96 overflow-y-auto mt-10">
          <Table
            columns={[
              {
                title: "Nom",
                dataIndex: "fullName",
                key: "fullName",
              },
              {
                title: "Mail",
                dataIndex: "mail",
                key: "mail",
              },
            ]}
            dataSource={event}
            pagination={false}
            bordered
            // style={{ height: "400px", overflowY: "auto" }}
            size="small"
          />
        </div>
      </Modal>

      <Modal
        title={"Informations sur la séance"}
        visible={isModalVisible}
        onOk={handleModalCancel}
        onCancel={handleModalCancel}
      >
        <div className="h-96 overflow-y-auto mt-10">
          <div>
            <span className="font-medium">Cour</span>:{" "}
            {SeancInfos.title && SeancInfos.title}
          </div>
          <div>
            <span className="font-medium">Heur debut</span>:{" "}
            {SeancInfos.datestart}
          </div>
          <div>
            <span className="font-medium">Heur de fine</span>:{" "}
            {SeancInfos.dateend}
          </div>
          <div>
            <span className="font-medium">Salle</span>:{" "}
            {SeancInfos.resource && SeancInfos.resource}
          </div>

          <div className="h-96 overflow-y-auto mt-10">
            <div>List des clients</div>
            <Table
              columns={[
                {
                  title: "Nom",
                  dataIndex: "fullName",
                  key: "fullName",
                },
                {
                  title: "Mail",
                  dataIndex: "mail",
                  key: "mail",
                },
              ]}
              dataSource={event}
              pagination={false}
              bordered
              // style={{ height: "400px", overflowY: "auto" }}
              size="small"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};
