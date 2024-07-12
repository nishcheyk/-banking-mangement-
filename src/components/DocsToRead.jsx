import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "../css/pdf.css";
function DocsToRead() {
  const [openedPDFs, setOpenedPDFs] = useState(new Set());
  const navigate = useNavigate();
  const openPDF = (pdfFileName) => {
    const pdfUrl = `${window.location.origin}/PDF/${pdfFileName}`;
    window.open(pdfUrl, "_blank");
    setOpenedPDFs((prevOpenedPDFs) => {
      const newOpenedPDFs = new Set(prevOpenedPDFs);
      newOpenedPDFs.add(pdfFileName);
      return newOpenedPDFs;
    });
  };

  const allPDFsOpened = openedPDFs.size >= 3;

  const handleRegister = (e) => {
    if (!allPDFsOpened) {
      toast.error("Please open all PDFs before registering!");
    } else {
      navigate("/Registeration");
    }
  };

  return (
    <div>
      <div className="pdf-container">
        <div className="card-group">
          <div className="card" style={{ height: "270px" }}>
            {" "}
            {/* Increased height */}
            <div
              className="card-body"
              style={{ textAlign: "center", padding: "20px" }}
            >
              <h5 className="card-title">Terms and Conditions</h5>
              <p className="card-text" style={{ textAlign: "center" }}>
                This document contains the terms and conditions governing the
                use of our services.
              </p>
              <button
                onClick={() => openPDF("A.pdf")}
                className="btn btn-primary"
              >
                Open PDF
              </button>
              {openedPDFs.has("A.pdf") && (
                <span className="badge badge-success ml-2">Opened</span>
              )}
            </div>
          </div>
          <div className="card" style={{ height: "270px" }}>
            {" "}
            {/* Increased height */}
            <div
              className="card-body"
              style={{ textAlign: "center", padding: "20px" }}
            >
              <h5 className="card-title">Rules and Regulations</h5>
              <p className="card-text" style={{ textAlign: "center" }}>
                This document outlines the rules and regulations applicable to
                our platform.
              </p>
              <button
                onClick={() => openPDF("B.pdf")}
                className="btn btn-primary"
              >
                Open PDF
              </button>
              {openedPDFs.has("B.pdf") && (
                <span className="badge badge-success ml-2">Opened</span>
              )}
            </div>
          </div>
          <div className="card" style={{ height: "270px" }}>
            {" "}
            {/* Increased height */}
            <div
              className="card-body"
              style={{ textAlign: "center", padding: "20px" }}
            >
              <h5 className="card-title">Privacy Policy</h5>
              <p className="card-text" style={{ textAlign: "center" }}>
                This document explains how we collect, use, and protect your
                personal data.
              </p>
              <button
                onClick={() => openPDF("C.pdf")}
                className="btn btn-primary"
              >
                Open PDF
              </button>
              {openedPDFs.has("C.pdf") && (
                <span className="badge badge-success ml-2">Opened</span>
              )}
            </div>
          </div>
        </div>
        <br />
        <br />

        <p
          style={{
            color: allPDFsOpened ? "#28a745" : "red",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {allPDFsOpened
            ? "All PDFs are opened. You can now Register."
            : "Please open all PDFs to enable the Register button."}
        </p>
        <div className="text-center">
          {" "}
          {/* Center align the Register button */}
          <button
            onClick={handleRegister}
            className="btn btn-success"
            style={{
              width: "150px", // Reduced width
              backgroundImage: "linear-gradient(135deg, #23c4f8, #275efe)",
              border: "none",
              color: "white",
              cursor: allPDFsOpened ? "pointer" : "not-allowed",
              pointerEvents: allPDFsOpened ? "auto" : "none",
              padding: "10px",
            }}
          >
            Register
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default DocsToRead;
