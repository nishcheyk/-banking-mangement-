// src/components/DocumentUpload.js
import React, { useState } from "react";
import axios from "axios";
import Dropzone from "react-dropzone";
import "../css/Document_upload.css";

const DocumentUpload = ({ onSuccess }) => {
  const [documentType, setDocumentType] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const onDrop = (acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      if (rejectedFiles[0].size > 2 * 1024 * 1024) {
        setMessage("File size exceeds the 2MB limit.");
      } else if (
        ![
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "image/jpeg",
          "image/png",
        ].includes(rejectedFiles[0].type)
      ) {
        setMessage("Invalid file type.");
      }
    } else {
      setFile(acceptedFiles[0]);
      setMessage("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!documentType) {
      setMessage("Please select a document type.");
      return;
    }
    if (!file) {
      setMessage("Please upload a document.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("documentType", documentType);

    try {
      const res = await axios.post("http://localhost:5000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage("File uploaded successfully!");
      setFile(null);
      setDocumentType(""); // Reset document type
      onSuccess(); // Call the onSuccess prop when upload is successful
    } catch (err) {
      setMessage("Server responded with an error.");
    }
  };

  return (
    <div className="dcontainer">
      <form onSubmit={handleSubmit}>
        <label htmlFor="document-type">Select document type:</label>
        <select
          id="document-type"
          value={documentType}
          onChange={(e) => setDocumentType(e.target.value)}
          required
        >
          <option value="">Select a document type</option>
          <option value="ID">ID</option>
          <option value="Passport">Passport</option>
          <option value="Driver's License">Driver License</option>
        </select>

        <Dropzone
          onDrop={onDrop}
          maxSize={2 * 1024 * 1024}
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
        >
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps({ className: "dropzone" })}>
              <input {...getInputProps()} />
              <p>
                <strong>Drag and drop documents here or click to upload</strong>
              </p>
            </div>
          )}
        </Dropzone>

        {file && (
          <div>
            <p>{file.name}</p>
            <button type="button" onClick={() => setFile(null)}>
              Remove file
            </button>
          </div>
        )}

        <button type="submit">Submit</button>
        {message && <div>{message}</div>}
      </form>
    </div>
  );
};

export default DocumentUpload;
