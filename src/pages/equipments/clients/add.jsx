import React, { useState, useEffect } from "react";
import {
  PlusOutlined,
  SearchOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import {
  Button,
  Drawer,
  Space,
  Input,
  Select,
  message,
  Modal,
  Tag,
  Tooltip,
} from "antd";
import UploadImage from "../../../utils/uploadImages";
import { getCurrentDate } from "../../../utils/helper";
// import UploadImage from "../uploadImage";

const AddNewClient = () => {
  const [open1, setOpen1] = useState(false);

  // State for room related data
  const [ClientData, setClientData] = useState({
    civilite: "",
    nom_client: "",
    prenom_client: "",
    adresse: "",
    tel: "",
    mail: "",
    cin: "",
    ville: 1,
    date_naissance: "",
    date_inscription: getCurrentDate(),
    statut: true,
    blackliste: false,
    newsletter: true,
    nom_ville: "",
    password: "",
  });

  // Validation function to check if all required fields are filled for the room form
  const isRoomFormValid = () => {
    return (
      ClientData.civilite !== "" &&
      ClientData.nom_client !== "" &&
      ClientData.prenom_client !== "" &&
      ClientData.adresse !== "" &&
      ClientData.tel !== "" &&
      ClientData.mail !== "" &&
      ClientData.cin !== "" &&
      // ClientData.ville !== "" &&
      ClientData.date_naissance !== "" &&
      ClientData.password !== ""
    );
  };

  // Function to add a new chamber
  const addClient = async () => {
    try {
      // Check if the form is valid before submitting
      if (!isRoomFormValid()) {
        message.error("Please fill in all required fields for the chamber.");
        return;
      }

      const response = await fetch(
        "https://fithouse.pythonanywhere.com/api/clients/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(ClientData),
        }
      );
      if (response.ok) {
        const res = await response.json();
        if (res.msg == "Added Successfully!!e") {
          message.success("Client added successfully");
          onCloseR();
        } else {
          message.warning(res.msg);
          console.log(res);
        }
      } else {
        console.log(response);
        message.error("Error adding chamber");
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

  // Function to handle form submission in the room drawer
  const handleRoomSubmit = () => {
    addClient();
  };

  return (
    <>
      <div className="flex items-center space-x-3">
        <Button type="default" onClick={showDrawerR} icon={<UserAddOutlined />}>
          Ajoute Client
        </Button>
      </div>
      <Drawer
        title="Saisir un nouveau client"
        width={720}
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
              <div className="mt-0 text-center pt-0 rounded-md w-full bg-slate-100">
                <UploadImage />
              </div>
              <div className="grid grid-cols-2 gap-4 mt-5">
                <div>
                  <label htmlFor="civilite" className="block font-medium">
                    *Civilité
                  </label>
                  <Select
                    id="civilite"
                    showSearch
                    placeholder="Civilité"
                    className="w-full"
                    optionFilterProp="children"
                    onChange={(value) =>
                      setClientData({ ...ClientData, civilite: value })
                    }
                    filterOption={(input, option) =>
                      (option?.label ?? "").includes(input)
                    }
                    filterSort={(optionA, optionB) =>
                      (optionA?.label ?? "")
                        .toLowerCase()
                        .localeCompare((optionB?.label ?? "").toLowerCase())
                    }
                    options={[
                      {
                        value: "Monsieur",
                        label: "Monsieur",
                      },
                      {
                        value: "Mademoiselle",
                        label: "Mademoiselle",
                      },
                    ]}
                  />
                </div>
                <div>
                  <label htmlFor="nom_client" className="block font-medium">
                    *Nom
                  </label>
                  <Input
                    id="nom_client"
                    size="middle"
                    placeholder="Nom"
                    value={ClientData.nom_client}
                    onChange={(e) =>
                      setClientData({
                        ...ClientData,
                        nom_client: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label htmlFor="prenom_client" className="block font-medium">
                    *Prénom
                  </label>
                  <Input
                    id="prenom_client"
                    size="middle"
                    placeholder="Prénom"
                    value={ClientData.prenom_client}
                    onChange={(e) =>
                      setClientData({
                        ...ClientData,
                        prenom_client: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label htmlFor="adresse" className="block font-medium">
                    Adresse
                  </label>
                  <Input
                    id="adresse"
                    size="middle"
                    placeholder="Adresse"
                    value={ClientData.adresse}
                    onChange={(e) =>
                      setClientData({ ...ClientData, adresse: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label htmlFor="tel" className="block font-medium">
                    *Téléphone
                  </label>
                  <Input
                    id="tel"
                    size="middle"
                    placeholder="Téléphone"
                    value={ClientData.tel}
                    onChange={(e) =>
                      setClientData({ ...ClientData, tel: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label htmlFor="mail" className="block font-medium">
                    *Email
                  </label>
                  <Input
                    id="mail"
                    size="middle"
                    placeholder="Email"
                    value={ClientData.mail}
                    onChange={(e) =>
                      setClientData({ ...ClientData, mail: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block font-medium">
                    *Mot de passe
                  </label>
                  <Input
                    id="password"
                    size="middle"
                    placeholder="Mot de passe"
                    value={ClientData.password}
                    onChange={(e) =>
                      setClientData({ ...ClientData, password: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label htmlFor="cin" className="block font-medium">
                    *CIN
                  </label>
                  <Input
                    id="cin"
                    size="middle"
                    placeholder="CIN"
                    value={ClientData.cin}
                    onChange={(e) =>
                      setClientData({ ...ClientData, cin: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label htmlFor="ville" className="block font-medium">
                    Ville
                  </label>
                  <Select
                    id="ville"
                    showSearch
                    placeholder="Ville"
                    className="w-full"
                    optionFilterProp="children"
                    onChange={(value) =>
                      setClientData({ ...ClientData, ville: value })
                    }
                    filterOption={(input, option) =>
                      (option?.label ?? "").includes(input)
                    }
                    filterSort={(optionA, optionB) =>
                      (optionA?.label ?? "")
                        .toLowerCase()
                        .localeCompare((optionB?.label ?? "").toLowerCase())
                    }
                    options={[
                      {
                        value: "1",
                        label: "Fes",
                      },
                      {
                        value: "2",
                        label: "Rabat",
                      },
                    ]}
                  />
                </div>
                <div>
                  <label htmlFor="date_naissance" className="block font-medium">
                    *Date de naissance
                  </label>
                  <Tooltip title="Date de naissance">
                    <Input
                      id="date_naissance"
                      size="middle"
                      type="date"
                      placeholder="Date de naissance"
                      value={ClientData.date_naissance}
                      onChange={(e) =>
                        setClientData({
                          ...ClientData,
                          date_naissance: e.target.value,
                        })
                      }
                    />
                  </Tooltip>
                </div>
                <div>
                  <label
                    htmlFor="date_inscription"
                    className="block font-medium"
                  >
                    *Date d'inscription
                  </label>
                  <Tooltip title="Date d'inscription">
                    <Input
                      id="date_inscription"
                      size="middle"
                      type="date"
                      placeholder="Date d'inscription"
                      value={ClientData.date_inscription}
                      disabled={true}
                      onChange={(e) =>
                        setClientData({
                          ...ClientData,
                          date_inscription: e.target.value,
                        })
                      }
                    />
                  </Tooltip>
                </div>
                <div>
                  <label htmlFor="statut" className="block font-medium">
                    *Status
                  </label>
                  <Select
                    id="statut"
                    className="w-full"
                    showSearch
                    placeholder="Status"
                    optionFilterProp="children"
                    onChange={(value) =>
                      setClientData({ ...ClientData, statut: value })
                    }
                    filterOption={(input, option) =>
                      (option?.label ?? "").includes(input)
                    }
                    filterSort={(optionA, optionB) =>
                      (optionA?.label ?? "")
                        .toLowerCase()
                        .localeCompare((optionB?.label ?? "").toLowerCase())
                    }
                    options={[
                      {
                        value: "1",
                        label: "Active",
                      },
                      {
                        value: "2",
                        label: "Inactive",
                      },
                    ]}
                  />
                </div>
                <div className="flex items-center mt-3">
                  <Tag
                    style={{ fontSize: 14 }}
                    htmlFor="blackliste"
                    className="font-medium ml-1 w-28 text-lg"
                  >
                    *Blackliste
                  </Tag>
                  <Input
                    id="blackliste"
                    size="middle"
                    type="checkbox"
                    checked={ClientData.blackliste}
                    onChange={(e) =>
                      setClientData({
                        ...ClientData,
                        blackliste: e.target.checked,
                      })
                    }
                  />
                </div>
                <div className="flex items-center mt-3">
                  <Tag
                    style={{ fontSize: 14 }}
                    htmlFor="newsletter"
                    className="font-medium ml-1 w-28"
                  >
                    *Newsletter
                  </Tag>
                  <Input
                    id="newsletter"
                    size="middle"
                    type="checkbox"
                    checked={ClientData.newsletter}
                    onChange={(e) =>
                      setClientData({
                        ...ClientData,
                        newsletter: e.target.checked,
                      })
                    }
                  />
                </div>
                {/* UploadImage component already included */}
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
        </div>
      </Drawer>
    </>
  );
};

export default AddNewClient;
