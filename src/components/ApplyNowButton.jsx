import React from "react";

const handleScrollClick = () => {
  window.scrollBy({
    top: 800, // Scroll down by 200 pixels (adjust as needed)
    behavior: "smooth", // Smooth scrolling animation
  });
};

function ApplyNowButton() {
  return (
    <div className="container d-flex justify-content-center">
      <button
        type="button"
        className="btn btn-primary btn-lg mt-5 mb-5"
        onClick={handleScrollClick}
      >
        Apply Now for a Loan
      </button>
    </div>
  );
}

export default ApplyNowButton;
