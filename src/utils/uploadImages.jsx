import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload, Button, message } from "antd";

const UploadImage = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);

  const handleCancel = () => setPreviewOpen(false);

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || (file.url ? file.url.substring(file.url.lastIndexOf("/") + 1) : ''));
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const handleUploadImage = async () => {
    // Check if there is a file to upload
    if (fileList.length === 0) {
      message.error("No files to upload.");
      return;
    }

    const file = fileList[0]; // Only upload the first file
    const formData = new FormData();
    formData.append("uploadedFile", file.originFileObj);
    console.log('====================================');
    console.log(formData);
    console.log('====================================');
    try {
      const response = await fetch(
        "https://fithouse.pythonanywhere.com/api/saveImage/",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const res = await response.json();
        console.log("====================================");
        console.log(res);
        console.log("====================================");
        message.success("Image uploaded successfully");
      } else {
        const errorResponse = await response.json();
        message.error(`File upload failed: ${errorResponse.detail}`);
      }
    } catch (error) {
      console.error("Error during file upload:", error);
      message.error("File upload failed");
    }
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <>
      <Upload
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        beforeUpload={() => false} // Prevent automatic upload
      >
        {fileList.length >= 1 ? null : uploadButton}
      </Upload>
      {/* <Button
        className="cursor-pointer"
        onClick={handleUploadImage}
        style={{ marginTop: 8 }}
      >
        Upload
      </Button> */}
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img
          alt="example"
          style={{
            width: "100%",
            alignContent: "center",
            alignItems: "center",
          }}
          src={previewImage}
        />
      </Modal>
    </>
  );
};

export default UploadImage;
