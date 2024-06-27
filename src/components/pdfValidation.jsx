import React, { useState } from "react";
import "../css/pdfVal.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IconButton } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

function Pdfval() {
  const [openedPDFs, setOpenedPDFs] = useState(new Set());

  const handleButtonClick = (pdfFileName) => {
    const FilePath = `${window.location.origin}/PDF/${pdfFileName}`;
    window.open(FilePath, "_blank");
    setOpenedPDFs((prevOpenedPDFs) => {
      const newOpenedPDFs = new Set(prevOpenedPDFs);
      newOpenedPDFs.add(pdfFileName);
      return newOpenedPDFs;
    });
  };

  const allPDFsOpened = openedPDFs.size >= 4;

  const handleRegisterButtonClick = () => {
    if (!allPDFsOpened) {
      toast.error("Please open all 4 PDFs before registering!");
    } else {
      // Implement your registration logic here
    }
  };

  return (
    <form>
    <div className="pdf">
      <header className="pdf-header">
        <h1>Open PDF Files</h1>
        <div className="button-container">
          <div className="button-item">
            <IconButton onClick={() => handleButtonClick("A.pdf")}>
              <span>Open A.pdf</span>
              {openedPDFs.has("A.pdf") && (
                <CheckIcon style={{ color: "green" }} />
              )}
            </IconButton>
          </div>
          <div className="button-item">
            <IconButton onClick={() => handleButtonClick("B.pdf")}>
              <span>Open B.pdf</span>
              {openedPDFs.has("B.pdf") && (
                <CheckIcon style={{ color: "green" }} />
              )}
            </IconButton>
          </div>
          <div className="button-item">
            <IconButton onClick={() => handleButtonClick("C.pdf")}>
              <span>Open C.pdf</span>
              {openedPDFs.has("C.pdf") && (
                <CheckIcon style={{ color: "green" }} />
              )}
            </IconButton>
          </div>
          <div className="button-item">
            <IconButton onClick={() => handleButtonClick("D.pdf")}>
              <span>Open D.pdf</span>
              {openedPDFs.has("D.pdf") && (
                <CheckIcon style={{ color: "green" }} />
              )}
            </IconButton>
          </div>
        </div>

        <button
          disabled={!allPDFsOpened}
          onClick={handleRegisterButtonClick}
          variant="contained"
          color="primary"
        >
          Register
        </button>
      </header>
      <ToastContainer />
    </div>
    </form>
  );
}

export default Pdfval;
