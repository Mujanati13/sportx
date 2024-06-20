import React, { useState, useEffect } from "react";
import {
  Table,
  Tag,
  Input,
  Modal,
  Form,
  Select,
  message,
  Popconfirm,
  Button,
  Drawer,
  Space,
  Tooltip,
} from "antd";
import {
  SearchOutlined,
  UserAddOutlined,
  DeleteOutlined,
  EyeOutlined,
  EditOutlined,
} from "@ant-design/icons";
import {
  getCurrentDate,
  isEighteenYearsApart,
  validateEmail,
  validateMoroccanPhoneNumber,
} from "../../../utils/helper";
import UploadImage from "../../../utils/uploadImages";

const TableStaff = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [update, setUpdate] = useState(null);
  const [form] = Form.useForm();
  const [open1, setOpen1] = useState(false);
  const [add, setAdd] = useState(false);
  const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false);
  const [detailsData, setDetailsData] = useState(null);
  // State for room related data
  const [ClientData, setClientData] = useState({
    civilite: "",
    nom: "",
    prenom: "",
    adresse: "",
    tel: "",
    mail: "",
    validite_CIN: "",
    cin: "",
    ville: 1,
    date_naissance: "",
    date_inscription: getCurrentDate(),
    statut: true,
    blackliste: false,
    newsletter: true,
    nom_ville: "",
    date_recrutement: "",
    password: null,
    fonction: "",
  });

  // Validation function to check if all required fields are filled for the room form
  const isFormValid = () => {
    const requiredFields = ["nom", "prenom", "date_naissance"];
    return requiredFields.every((field) => ClientData[field]);
  };
  const handleViewDetails = (record) => {
    setDetailsData(record);
    setIsDetailsModalVisible(true);
  };

  const addClient = async () => {
    // Check if the form is valid
    if (!isFormValid()) {
      message.warning("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    if (
      !validateEmail(ClientData.mail) ||
      !validateMoroccanPhoneNumber(ClientData.tel)
    ) {
      message.warning(
        "Veuillez vérifier votre email ou numéro de téléphone car il a un mauvais format."
      );
      return;
    }

    // Check if the date difference is exactly 18 years
    try {
      if (
        !isEighteenYearsApart(
          ClientData.date_naissance,
          ClientData.date_recrutement
        )
      ) {
        message.warning(
          "La différence entre date de naissance et date de recrutement n'est pas exactement de 18 ans."
        );
        return;
      }
    } catch (error) {
      message.warning(error.message);
      return;
    }

    // Convert 'ville' to integer
    ClientData.ville = parseInt(ClientData.ville);
    ClientData.validite_CIN = getCurrentDate();

    // Send the data to the server
    try {
      const response = await fetch(
        "https://fithouse.pythonanywhere.com/api/staff/",
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
        if (res.msg === "Added Successfully!!e") {
          message.success("Personnel ajouté avec succès");
          setAdd(Math.random() * 1000);
          setClientData({
            civilite: "",
            nom: "",
            prenom: "",
            adresse: "",
            tel: "",
            mail: "",
            validite_CIN: "",
            cin: "",
            ville: 1,
            date_naissance: "",
            date_inscription: getCurrentDate(),
            statut: true,
            blackliste: false,
            newsletter: true,
            nom_ville: "",
            password: null,
            date_recrutement: "",
          });
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
      console.error(error);
      message.error("Error adding chamber");
    }
  };

  const showDrawerR = () => {
    setOpen1(true);
  };

  const onCloseR = () => {
    setOpen1(false);
    setClientData({
      civilite: "",
      nom: "",
      prenom: "",
      adresse: "",
      tel: "",
      mail: "",
      validite_CIN: "",
      cin: "",
      ville: 1,
      date_naissance: "",
      date_inscription: getCurrentDate(),
      statut: true,
      blackliste: false,
      newsletter: true,
      nom_ville: "",
      date_recrutement: "",
      password: null,
      fonction: "",
    });
  };

  // Function to handle form submission in the room drawer
  const handleRoomSubmit = () => {
    addClient();
  };

  const authToken = localStorage.getItem("jwtToken"); // Replace with your actual auth token

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://fithouse.pythonanywhere.com/api/staff/",
          {
            // headers: {
            //   "Authorization": `Bearer ${authToken}`, // Include the auth token in the headers
            // },
          }
        );
        const jsonData = await response.json();

        // Ensure each row has a unique key
        const processedData = jsonData.data.map((item, index) => ({
          ...item,
          key: item.id_coach || index, // Assuming each item has a unique id, otherwise use index
        }));

        setData(processedData);
        setFilteredData(processedData);

        // Generate columns based on the desired keys
        const desiredKeys = [
          "nom",
          "prenom",
          "tel",
          "mail",
          "adresse",
          "date_recrutement",
          "",
        ];
        const generatedColumns = desiredKeys.map((key) => ({
          title: capitalizeFirstLetter(key.replace(/\_/g, " ")), // Capitalize the first letter
          dataIndex: key,
          key,
          render: (text, record) => {
            if (key === "") {
              return (
                <EyeOutlined
                  style={{ fontSize: "16px", color: "#08c" }}
                  onClick={() => handleViewDetails(record)}
                />
              );
            }
            return text;
          },
        }));
        setColumns(generatedColumns);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [authToken, update, add]);

  // Function to capitalize the first letter of a string
  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  // Handle search input change
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);
    const filtered = data.filter((item) =>
      item.nom.toLowerCase().includes(value)
    );
    setFilteredData(filtered);
  };

  // Row selection object indicates the need for row selection
  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys) => {
      setSelectedRowKeys(selectedRowKeys);
      console.log("selectedRowKeys changed: ", selectedRowKeys);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User", // Disable checkbox for specific rows
    }),
  };

  // Handle edit button click
  const handleEditClick = () => {
    if (selectedRowKeys.length === 1) {
      const clientToEdit = data.find(
        (client) => client.key === selectedRowKeys[0]
      );
      setEditingClient(clientToEdit);
      form.setFieldsValue(clientToEdit);
      setIsModalVisible(true);
    }
  };

  const handleModalSubmit = async () => {
    try {
      const values = await form.validateFields();
      const { date_naissance, newsletter, ville } = values;

      // Check if date_naissance is not empty
      if (!date_naissance) {
        message.error("Veuillez entrer la date de naissance");
        return;
      }

      // Check if newsletter is not empty
      if (newsletter === null) {
        message.error("Veuillez sélectionner l'option de newsletter");
        return;
      }

      // Add id_client to the values object
      values.id_employe = editingClient.id_employe;
      values.date_recrutement = editingClient.date_recrutement;
      values.ville = 1;
      values.validite_CIN = editingClient.validite_CIN;

      const response = await fetch(
        `https://fithouse.pythonanywhere.com/api/staff/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify(values),
        }
      );

      if (response.ok) {
        const updatedClient = await response.json();
        const updatedData = data.map((client) =>
          client.key === editingClient.key ? updatedClient : client
        );
        setUpdate(updatedData);
        setData(updatedData);
        setFilteredData(updatedData);
        message.success("staff mis à jour avec succès");
        setIsModalVisible(false);
        setEditingClient(null);
        setSelectedRowKeys([]);
        // Reset the form fields
        form.resetFields();
      } else {
        message.error("Erreur lors de la mise à jour du client");
      }
    } catch (error) {
      console.error("Error updating client:", error);
      message.error("An error occurred while updating the client");
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setEditingClient(null);
  };

  const handleDelete = async () => {
    if (selectedRowKeys.length >= 1) {
      try {
        const promises = selectedRowKeys.map(async (key) => {
          const clientToDelete = data.find((client) => client.key === key);
          console.log(clientToDelete);
          const response = await fetch(
            `https://fithouse.pythonanywhere.com/api/staff/${clientToDelete.id_employe}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`,
              },
              body: JSON.stringify(clientToDelete),
            }
          );

          if (!response.ok) {
            throw new Error(`Failed to delete client with key ${key}`);
          }
        });

        await Promise.all(promises);

        const updatedData = data.filter(
          (client) => !selectedRowKeys.includes(client.key)
        );
        setData(updatedData);
        setFilteredData(updatedData);
        setSelectedRowKeys([]);
        message.success(
          `${selectedRowKeys.length} staff(s) supprimé(s) avec succès`
        );
      } catch (error) {
        console.error("Error deleting clients:", error);
        message.error("An error occurred while deleting clients");
      }
    }
  };

  const confirm = (e) => {
    handleDelete();
    setClientData({
      civilite: "",
      nom: "",
      prenom: "",
      adresse: "",
      tel: "",
      mail: "",
      validite_CIN: "",
      cin: "",
      ville: 1,
      date_naissance: "",
      date_inscription: getCurrentDate(),
      statut: true,
      blackliste: false,
      newsletter: true,
      nom_ville: "",
      date_recrutement: "",
      password: null,
      fonction: "",
    });
  };

  const cancel = (e) => {
    console.log(e);
    setClientData({
      civilite: "",
      nom: "",
      prenom: "",
      adresse: "",
      tel: "",
      mail: "",
      validite_CIN: "",
      cin: "",
      ville: 1,
      date_naissance: "",
      date_inscription: getCurrentDate(),
      statut: true,
      blackliste: false,
      newsletter: true,
      nom_ville: "",
      date_recrutement: "",
      password: null,
      fonction: "",
    });
  };

  return (
    <div className="w-full p-2">
      <Modal
        title="Détails de l'entraîneur"
        visible={isDetailsModalVisible}
        onCancel={() => setIsDetailsModalVisible(false)}
        footer={null}
      >
        {detailsData && (
          <div>
            <p>Nom: {detailsData.nom}</p>
            <p>Prénom: {detailsData.prenom}</p>
            <p>Téléphone: {detailsData.tel}</p>
            <p>Email: {detailsData.mail}</p>
            <p>Adresse: {detailsData.adresse}</p>
            <p>Date de recrutement: {detailsData.date_recrutement}</p>
            {/* Add more details as needed */}
          </div>
        )}
      </Modal>
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center space-x-7">
          <div className="w-52">
            <Input
              prefix={<SearchOutlined />}
              placeholder="Search Staff"
              value={searchText}
              onChange={handleSearch}
            />
          </div>
          <div className="flex items-center space-x-6">
            {selectedRowKeys.length === 1 ? (
              <EditOutlined
                className="cursor-pointer"
                onClick={handleEditClick}
              />
            ) : (
              ""
            )}
            {selectedRowKeys.length >= 1 ? (
              <Popconfirm
                title="Supprimer le personnel"
                description="Êtes-vous sûr de supprimer ce personnel ?"
                onConfirm={confirm}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
              >
                <DeleteOutlined className="cursor-pointer" />{" "}
              </Popconfirm>
            ) : (
              ""
            )}
            {/* {selectedRowKeys.length >= 1 ? (
              <PrinterOutlined disabled={true} />
            ) : (
              ""
            )} */}
          </div>
        </div>
        {/* add new client  */}
        <div>
          <div className="flex items-center space-x-3">
            <Button
              type="default"
              onClick={showDrawerR}
              icon={<UserAddOutlined />}
            >
              Ajoute Satff
            </Button>
          </div>
          <Drawer
            title="Saisir un nouveau membre du personnel"
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
                          (option?.label ?? "").startsWith(input)
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
                      <label htmlFor="nom_coach" className="block font-medium">
                        *Nom
                      </label>
                      <Input
                        id="nom_coach"
                        size="middle"
                        placeholder="Nom"
                        value={ClientData.nom}
                        onChange={(e) =>
                          setClientData({
                            ...ClientData,
                            nom: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="prenom_coach"
                        className="block font-medium"
                      >
                        *Prénom
                      </label>
                      <Input
                        id="prenom_client"
                        size="middle"
                        placeholder="Prénom"
                        value={ClientData.prenom}
                        onChange={(e) =>
                          setClientData({
                            ...ClientData,
                            prenom: e.target.value,
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
                          setClientData({
                            ...ClientData,
                            adresse: e.target.value,
                          })
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
                          (option?.label ?? "").startsWith(input)
                        }
                        filterSort={(optionA, optionB) =>
                          (optionA?.label ?? "")
                            .toLowerCase()
                            .localeCompare((optionB?.label ?? "").toLowerCase())
                        }
                        options={[
                          { value: 1, label: "Fès" },
                          { value: 2, label: "Rabat" },
                          { value: 3, label: "Casablanca" },
                          { value: 4, label: "Marrakech" },
                          { value: 5, label: "Tanger" },
                          { value: 6, label: "Agadir" },
                          { value: 7, label: "Meknès" },
                          { value: 8, label: "Oujda" },
                          { value: 9, label: "Tetouan" },
                          { value: 10, label: "Safi" },
                          { value: 11, label: "El Jadida" },
                          { value: 12, label: "Khouribga" },
                          { value: 13, label: "Béni Mellal" },
                          { value: 14, label: "Nador" },
                          { value: 15, label: "Kénitra" },
                          { value: 16, label: "Taza" },
                          { value: 17, label: "Mohammedia" },
                          { value: 18, label: "Laâyoune" },
                          { value: 19, label: "Ksar El Kebir" },
                          { value: 20, label: "Settat" },
                          { value: 21, label: "Larache" },
                          { value: 22, label: "Guelmim" },
                          { value: 23, label: "Berrechid" },
                          { value: 24, label: "Ouarzazate" },
                          { value: 25, label: "Al Hoceima" },
                        ]}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="date_naissance"
                        className="block font-medium"
                      >
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
                        htmlFor="date_naissance"
                        className="block font-medium"
                      >
                        *Date de recrutement
                      </label>
                      <Tooltip title="Date de recrutement">
                        <Input
                          id="date_naissance"
                          size="middle"
                          type="date"
                          placeholder="Date de recrutement"
                          value={ClientData.date_recrutement}
                          onChange={(e) =>
                            setClientData({
                              ...ClientData,
                              date_recrutement: e.target.value,
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
                          (option?.label ?? "").startsWith(input)
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
                    <div>
                      <label htmlFor="fonction" className="block font-medium">
                        Fonction
                      </label>
                      <Select
                        id="fonction"
                        showSearch
                        placeholder="Fonctions"
                        className="w-full"
                        optionFilterProp="children"
                        onChange={(value) =>
                          setClientData({ ...ClientData, fonction: value })
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
                          {
                            value: "Coach",
                            label: "Coach",
                          },
                          {
                            value: "Recption",
                            label: "Recption",
                          },
                          {
                            value: "Commercial",
                            label: "Commercial",
                          },
                          {
                            value: "Administration",
                            label: "Administration",
                          },
                          {
                            value: "autres",
                            label: "autres",
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
        </div>
      </div>
      <Table
        loading={loading}
        pagination={{
          pageSize: 7,
          showQuickJumper: true,
        }}
        size="small"
        className="w-full mt-5"
        columns={columns}
        dataSource={filteredData}
        rowSelection={rowSelection}
      />
      <Modal
        title="Modifier l'entraîneur"
        visible={isModalVisible}
        onOk={handleModalSubmit}
        onCancel={handleModalCancel}
        okText="Soumettre" // Submit button text in French
        cancelText="Annuler" // Cancel button text in French
      >
        <div className="h-96 overflow-y-auto">
          <Form form={form} layout="vertical">
            <Form.Item name="civilite" label="Civilité">
              <Select>
                <Select.Option value="Monsieur">Monsieur</Select.Option>
                <Select.Option value="Mademoiselle">Mademoiselle</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="civilite" label="Civilité">
              <Input />
            </Form.Item>
            <Form.Item
              name="nom"
              label="Nom"
              rules={[{ required: true, message: "Please input the name!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="prenom"
              label="Prénom"
              rules={[{ required: true, message: "Please input Prénom!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="adresse" label="Adresse">
              <Input />
            </Form.Item>
            <Form.Item name="tel" label="Téléphone">
              <Input />
            </Form.Item>
            <Form.Item
              name="mail"
              label="Email"
              rules={[{ required: true, message: "Please input email!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="cin" label="CIN">
              <Input />
            </Form.Item>
            <Form.Item name="ville" label="Ville">
              <Select>
                <Select.Option value="1">Fès</Select.Option>
                <Select.Option value="2">Rabat</Select.Option>
                <Select.Option value="3">Casablanca</Select.Option>
                <Select.Option value="4">Marrakech</Select.Option>
                <Select.Option value="5">Tanger</Select.Option>
                <Select.Option value="6">Agadir</Select.Option>
                <Select.Option value="7">Meknès</Select.Option>
                <Select.Option value="8">Oujda</Select.Option>
                <Select.Option value="9">Tetouan</Select.Option>
                <Select.Option value="10">Safi</Select.Option>
                <Select.Option value="11">El Jadida</Select.Option>
                <Select.Option value="12">Khouribga</Select.Option>
                <Select.Option value="13">Béni Mellal</Select.Option>
                <Select.Option value="14">Nador</Select.Option>
                <Select.Option value="15">Kénitra</Select.Option>
                <Select.Option value="16">Taza</Select.Option>
                <Select.Option value="17">Mohammedia</Select.Option>
                <Select.Option value="18">Laâyoune</Select.Option>
                <Select.Option value="19">Ksar El Kebir</Select.Option>
                <Select.Option value="20">Settat</Select.Option>
                <Select.Option value="21">Larache</Select.Option>
                <Select.Option value="22">Guelmim</Select.Option>
                <Select.Option value="23">Berrechid</Select.Option>
                <Select.Option value="24">Ouarzazate</Select.Option>
                <Select.Option value="25">Al Hoceima</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="date_naissance"
              label="Date de naissance"
              rules={[
                { required: true, message: "Please input Date de naissance!" },
              ]}
            >
              <Input type="date" />
            </Form.Item>
            <Form.Item name="statut" label="Status">
              <Select>
                <Select.Option value={true}>Active</Select.Option>
                <Select.Option value={false}>Inactive</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="blackliste"
              valuePropName="checked"
              label="Blackliste"
              className=""
            >
              <Input type="checkbox" />
            </Form.Item>
            <Form.Item
              name="newsletter"
              valuePropName="checked"
              label="Newsletter"
            >
              <Input type="checkbox" />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default TableStaff;
