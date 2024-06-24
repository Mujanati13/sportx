import React, { useState, useEffect } from "react";
import { Space, Table, Select, Modal, Form, Input, Button } from "antd";
import { EyeOutlined, EditOutlined } from "@ant-design/icons";

const TableEtablissement = () => {
  const [data, setData] = useState([]);
  const [add, Setadd] = useState();
  const [loading, setLoading] = useState(false);
  const [columns, setColumns] = useState([]);
  const [visibleModal, setVisibleModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [form] = Form.useForm();
  const authToken = localStorage.getItem("jwtToken"); // Replace with your actual auth token

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://fithouse.pythonanywhere.com/api/etablissements",
          {
            headers: {
              Authorization: `Bearer ${authToken}`, // Include the auth token in the headers
            },
          }
        );
        const jsonData = await response.json();
        setData(jsonData.data);

        // Generate columns based on the desired keys
        const desiredKeys = [
          "nom_etablissement",
          "adresse_etablissement",
          "teletablissement",
          "mailetablissement",
          "sitewebetablissement",
          "nb_clients",
          "",
        ];
        const generatedColumns = desiredKeys.map((key) => ({
          title: capitalizeFirstLetter(key.replace(/\_/g, " ")), // Capitalize the first letter
          dataIndex: key,
          key,
          render: (text, record) => {
            if (key === "Modifier") {
              return (
                <Button
                  className="mt-5"
                  type="default"
                  icon={<EditOutlined onClick={handleEdit} />}
                  onClick={handleEdit}
                >
                  dd
                </Button>
              );
            }
            if (key === "") {
              return (
                <span>
                  <EyeOutlined
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setSelectedRecord(record);
                      setVisibleModal(true);
                      setEditMode(false);
                    }}
                  />
                </span>
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
  }, [authToken, add]);

  // Function to capitalize the first letter of a string
  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleModalCancel = () => {
    setVisibleModal(false);
    setSelectedRecord(null);
  };

  const handleEdit = () => {
    setEditMode(true);
    form.setFieldsValue(selectedRecord);
  };

  const handleFormSubmit = async (values) => {
    try {
      const response = await fetch(
        `https://fithouse.pythonanywhere.com/api/etablissements/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            ...values,
            id_etablissement: selectedRecord.id_etablissement,
          }),
        }
      );
      const updatedRecord = await response.json();
      setData((prevData) =>
        prevData.map((item) =>
          item.id_etablissement === updatedRecord.id_etablissement
            ? updatedRecord
            : item
        )
      );
      setVisibleModal(false);
      setSelectedRecord(null);
      Setadd(Math.random() * 10000);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <div>
      <Table
        loading={loading}
        size="large"
        className="w-full"
        columns={columns}
        dataSource={data}
        rowKey="id_etablissement" // Use id_etablissement as rowKey to avoid key warnings
      />
      <Modal
        visible={visibleModal}
        onCancel={handleModalCancel}
        footer={null}
        title={selectedRecord?.nom_etablissement}
      >
        {selectedRecord && !editMode && (
          <div>
            <p>Adresse: {selectedRecord.adresse_etablissement}</p>
            <p>Ville: {selectedRecord.ville}</p>
            <p>Téléphone: {selectedRecord.teletablissement}</p>
            <p>Email: {selectedRecord.mailetablissement}</p>
            <p>Description: {selectedRecord.description}</p>
            <p>
              Site web:{" "}
              <a
                href={selectedRecord.sitewebetablissement}
                target="_blank"
                rel="noopener noreferrer"
              >
                {selectedRecord.sitewebetablissement}
              </a>
            </p>
            <p>
              Facebook:{" "}
              <a
                href={selectedRecord.facebook}
                target="_blank"
                rel="noopener noreferrer"
              >
                {selectedRecord.facebook}
              </a>
            </p>
            <p>
              Instagram:{" "}
              <a
                href={selectedRecord.instagrame}
                target="_blank"
                rel="noopener noreferrer"
              >
                {selectedRecord.instagrame}
              </a>
            </p>
            <p>WhatsApp: {selectedRecord.watsapp}</p>
            <p>Nombre de clients: {selectedRecord.nb_clients}</p>
            <p>
              <img
                className="w-full h-80 mt-4"
                src={`https://fithouse.pythonanywhere.com/media/${selectedRecord.image}`}
                alt="Etablissement"
                style={{ width: "100%", height: "auto" }}
              />
            </p>
            {!JSON.parse(localStorage.getItem(`data`))[0].id_coach && (
              <Button
                className="mt-5"
                type="primary"
                icon={<EditOutlined />}
                onClick={handleEdit}
              >
                Modifier
              </Button>
            )}
          </div>
        )}
        {selectedRecord && editMode && (
          <Form
            form={form}
            layout="vertical"
            onFinish={handleFormSubmit}
            initialValues={selectedRecord}
          >
            <Form.Item name="nom_etablissement" label="Nom Etablissement">
              <Input />
            </Form.Item>
            <Form.Item name="adresse_etablissement" label="Adresse">
              <Input />
            </Form.Item>
            <Form.Item name="ville" label="Ville">
              <Select>
                <Select.Option value="1">Fes</Select.Option>
                <Select.Option value="2">Rabat</Select.Option>
                <Select.Option value="2">Rabat</Select.Option>
                <Select.Option value="3">Casablanca</Select.Option>
                <Select.Option value="4">Marrakech</Select.Option>
                <Select.Option value="5">Agadir</Select.Option>
                <Select.Option value="6">Tangier</Select.Option>
                <Select.Option value="7">Meknes</Select.Option>
                <Select.Option value="8">Oujda</Select.Option>
                <Select.Option value="9">Kenitra</Select.Option>
                <Select.Option value="10">Tetouan</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="teletablissement" label="Téléphone">
              <Input />
            </Form.Item>
            <Form.Item name="mailetablissement" label="Email">
              <Input />
            </Form.Item>
            <Form.Item name="description" label="Description">
              <Input />
            </Form.Item>
            <Form.Item name="sitewebetablissement" label="Site Web">
              <Input />
            </Form.Item>
            <Form.Item name="facebook" label="Facebook">
              <Input />
            </Form.Item>
            <Form.Item name="instagrame" label="Instagram">
              <Input />
            </Form.Item>
            <Form.Item name="watsapp" label="WhatsApp">
              <Input />
            </Form.Item>
            <Form.Item name="nb_clients" label="Nombre de Clients">
              <Input disabled={true} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Sauvegarder
              </Button>
            </Form.Item>
          </Form>
        )}
      </Modal>
    </div>
  );
};

export default TableEtablissement;
