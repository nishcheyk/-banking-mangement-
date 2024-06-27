import React from 'react'

const handleScrollClick = () => {
  window.scrollBy({
    top: 800, // Scroll down by 200 pixels (adjust as needed)
    behavior: 'smooth', // Smooth scrolling animation
  });
};


function ApplyNow() {

  return (
    <div>
        <button type="button" class="btn btn-primary btn-lg my-5" onClick={handleScrollClick}>Apply Now for a Loan</button>
    </div>
  )
}

export default ApplyNow