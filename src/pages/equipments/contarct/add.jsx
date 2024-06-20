import React, { useState, useEffect } from "react";
import { FileAddOutlined } from "@ant-design/icons";
import { Button, Drawer, message, DatePicker, Input, Select } from "antd";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import {
  addMonths,
  formatDateToYearMonthDay,
  getCurrentDate,
} from "../../../utils/helper";
import dayjs from "dayjs";

const AddNewContract = () => {
  const [open1, setOpen1] = useState(false);
  const [clients, setClients] = useState([]);
  const [activeStep, setActiveStep] = useState(0);
  const [abonnements, setAbonnements] = useState([]);
  const [tarif, setTarif] = useState(0);

  // State for contract related data
  const [ContractData, setContractData] = useState({
    id_client: "",
    date_debut: getCurrentDate(),
    date_fin: null,
    reste: null,
    id_abn: null,
    Type: "",
    type: "",
    reduction: "",
    id_etablissement: 19,
    abonnement: "",
    Mode_reglement: "",
    description: "",
    montant: null,
    id_admin: null,
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

  const fetchAbonnements = async () => {
    try {
      const response = await fetch(
        "https://fithouse.pythonanywhere.com/api/abonnement/"
      );
      const data = await response.json();
      setAbonnements(data.data);
    } catch (error) {
      console.error("Error fetching abonnements:", error);
    }
  };

  useEffect(() => {
    // console.log(JSON.stringify(localStorage.getItem("data")));
    fetchClients();
    fetchAbonnements();
    const adminData = JSON.parse(localStorage.getItem("data"));
    const initialAdminId = adminData ? adminData[0].id_admin : ""; // Accessing the first element's id_admin
    ContractData.id_admin = initialAdminId;
  }, []);

  // Validation function to check if all required fields are filled for the contract form
  const isContractFormValid = () => {
    return ContractData.date_debut !== null && ContractData.date_fin !== null;
  };

  // Function to add a new contract
  const addContract = async () => {
    const date = new Date(ContractData.date_fin);
    // Extract the year, month, and day from the date
    const year = date.getFullYear();
    let month = date.getMonth() + 1; // Months are zero-based
    let day = date.getDate();

    ContractData.date_fin = `${year}-${month}-${day}`;
    const adminData = JSON.parse(localStorage.getItem("data"));
    const initialAdminId = adminData ? adminData[0].id_admin : ""; // Accessing the first element's id_admin
    ContractData.id_admin = initialAdminId;

    const authToken = localStorage.getItem("jwtToken"); // Replace with your actual auth token
    try {
      const response = await fetch(
        "https://fithouse.pythonanywhere.com/api/contrat/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`, // Include the auth token in the headers
          },
          body: JSON.stringify(ContractData),
        }
      );
      if (response.ok) {
        const res = await response.json();
        if (res.msg === "Added Successfully!!") {
          message.success("Contract added successfully");
          onCloseR();
        } else {
          message.warning(res.msg);
          console.log(res);
        }
      } else {
        console.log(response);
        message.error("Error adding contract");
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
    setActiveStep(0);

  };

  // stepper
  const steps = [
    {
      label: "Step 1: Informations de contrat",
      description: (
        <div className="w-full grid grid-cols-2 gap-4 mt-5">
          <div>
            <label htmlFor="dateDebut">Date de Début</label>
            <DatePicker
              id="dateDebut"
              className="w-full"
              size="middle"
              placeholder="Date de Début"
              value={dayjs(getCurrentDate())}
              disabled={true}
              onChange={(date, dateString) =>
                setContractData({ ...ContractData, date_debut: dateString })
              }
            />
          </div>
          <div>
            <label htmlFor="dateFin">Date de Fin</label>
            <DatePicker
              className="w-full"
              id="dateFin"
              size="middle"
              placeholder="Date de Fin"
              disabled={true}
              value={ContractData.date_fin && dayjs(ContractData.date_fin)}
              onChange={(date, dateString) => {
                setContractData({
                  ...ContractData,
                  date_fin: date,
                });
              }}
            />
          </div>
          <div>
            <label htmlFor="abonnement">Abonnement</label>
            <Select
              id="abonnement"
              showSearch
              className="w-full"
              placeholder="Abonnement"
              value={ContractData.abonnement}
              onChange={(value) => {
                const selectedAbonnement = abonnements.find(
                  (abonnement) => abonnement.id_abn === value
                );
                if (selectedAbonnement) {
                  const {
                    tarif,
                    duree_mois,
                    id_abn,
                    type_abonnement,
                    namecat_conrat,
                  } = selectedAbonnement;
                  const endDate = addMonths(duree_mois);
                  setContractData((prevContractData) => ({
                    ...prevContractData,
                    id_abn: id_abn,
                    date_fin: endDate,
                    tarif: tarif,
                    abonnement: `${type_abonnement} ${namecat_conrat}`, // Update abonnement here
                  }));
                  setTarif(tarif);
                }
              }}
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "").includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              options={abonnements.map((abonnement) => ({
                value: abonnement.id_abn,
                label: `${abonnement.type_abonnement} (${abonnement.namecat_conrat})`,
              }))}
            />
          </div>
          <div>
            <label htmlFor="client">Client</label>
            <Select
              id="client"
              showSearch
              value={ContractData.id_client}
              className="w-full"
              onChange={(value) =>
                setContractData({ ...ContractData, id_client: value })
              }
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
          </div>
          <div>
            <label htmlFor="reduction">Réduction</label>
            <Input
              id="reduction"
              size="middle"
              placeholder="Réduction"
              value={ContractData.reduction}
              onChange={(e) =>
                setContractData({
                  ...ContractData,
                  reduction: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label htmlFor="tarif">Tarif D'abonnement</label>
            <Input
              id="tarif"
              disabled={true}
              size="middle"
              placeholder="Tarif"
              value={ContractData.tarif}
              onChange={(e) =>
                setContractData({
                  ...ContractData,
                  tarif: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label htmlFor="type">Type</label>
            <Select
              id="type"
              showSearch
              placeholder="Type"
              value={ContractData.type} // Use ContractData.Type instead of ContractData.type
              className="w-full"
              onChange={(value) =>
                setContractData((prevContractData) => ({
                  ...prevContractData,
                  type: value,
                }))
              } // Use setContractData to update ContractData state
              options={[
                {
                  value: "Homme",
                  label: "Homme",
                },
                {
                  value: "Femme",
                  label: "Femme",
                },
              ]}
            />
          </div>
        </div>
      ),
    },
    {
      label: "Step 2: Ajouter un contrat",
      description: (
        <div className="w-full grid grid-cols-2 gap-4 mt-5">
          <div>
            <label htmlFor="montant">Montant</label>
            <Input
              id="montant"
              size="middle"
              placeholder="Montant"
              value={ContractData.montant}
              onChange={(e) => {
                const res = tarif - e.target.value;
                ContractData.reste = res;
                setContractData({
                  ...ContractData,
                  montant: e.target.value,
                });
              }}
            />
          </div>
          <div>
            <label htmlFor="resteActuel">Le rest actuel</label>
            <Input
              id="resteActuel"
              disabled={true}
              size="middle"
              placeholder="Le rest actuel"
              value={ContractData.reste}
              onChange={(e) =>
                setContractData({
                  ...ContractData,
                  reste: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label htmlFor="modeReglement">Mode de Reglement</label>
            <Select
              id="modeReglement"
              showSearch
              value={ContractData.Mode_reglement}
              className="w-full"
              placeholder="Mode de Reglement"
              onChange={(value) =>
                setContractData({ ...ContractData, Mode_reglement: value })
              }
              options={[
                {
                  value: "Especes",
                  label: "Especes",
                },
              ]}
            />
          </div>
          <div>
            <label htmlFor="typeTransaction">Type de transacation</label>
            <Select
              id="typeTransaction"
              showSearch
              className="w-full"
              value={ContractData.Type}
              placeholder="Type de transacation"
              onChange={(value) =>
                setContractData({ ...ContractData, Type: value })
              }
              options={[
                {
                  value: true,
                  label: "Entree",
                },
              ]}
            />
          </div>
        </div>
      ),
    },
    {
      label: "Step 3: Finish",
      description: (
        <div>
          <div className="mt-4">
            <h2>Contract Data</h2>
            <pre>{JSON.stringify(ContractData, null, 2)}</pre>
          </div>
        </div>
      ),
    },
  ];

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      addContract();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <>
      <div className="flex items-center space-x-3">
        <Button type="default" onClick={showDrawerR} icon={<FileAddOutlined />}>
          Ajouter Contrat
        </Button>
      </div>
      <Drawer
        title="Saisir un nouveau Contrat"
        width={720}
        onClose={onCloseR}
        closeIcon={false}
        open={open1}
        bodyStyle={{
          paddingBottom: 80,
        }}
      >
        <div>
          <Box sx={{ maxWidth: 400 }}>
            <Stepper activeStep={activeStep} orientation="vertical">
              {steps.map((step, index) => (
                <Step key={step.label}>
                  <StepLabel
                    optional={
                      index === 2 ? (
                        <Typography variant="caption">Last step</Typography>
                      ) : null
                    }
                  >
                    {step.label}
                  </StepLabel>
                  <StepContent>
                    <Typography>{step.description}</Typography>
                    <Box sx={{ mb: 2 }}>
                      <div>
                        <Button
                          variant="contained"
                          onClick={handleNext}
                          sx={{ mt: 1, mr: 1 }}
                        >
                          {index === steps.length - 1 ? "Finish" : "Continue"}
                        </Button>
                        <Button
                          className="ml-3 mt-3"
                          disabled={index === 0}
                          onClick={handleBack}
                          sx={{ mt: 1, mr: 1, ml: 2 }}
                        >
                          Back
                        </Button>
                      </div>
                    </Box>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length && (
              <Paper square elevation={0} sx={{ p: 3 }}>
                <Typography>
                  All steps completed - you&apos;re finished
                </Typography>
                <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                  Reset
                </Button>
              </Paper>
            )}
          </Box>
        </div>
      </Drawer>
    </>
  );
};

export default AddNewContract;
