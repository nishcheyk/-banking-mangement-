import React from "react";

function ProgressBar() {
  return (
    <div>
      <div className="container mb-5">
          <div class="progress">
            <div
              class="progress-bar"
              role="progressbar"
              aria-valuenow="0"
              aria-valuemin="0"
              aria-valuemax="100"
              style={{width: "00%"}}
            >
              0% Complete
            </div>
          </div>
      </div>
    </div>
  );
}

export default ProgressBar;
