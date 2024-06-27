import React from "react";

function NeedHelp() {
  return (
    <div>
      <div className="container">
        {/* <div className="row"> */}
        <div class="card col-5 mx-auto my-5">
          {/* style={{width: "18rem"}} */}
          <div class="card-body">
            <h5 class="card-title">Need Help?</h5>
            <p class="card-text">
              Reach out to us. We are committed to your security and help
            </p>
            <a href="/" class="btn btn-primary">
              Contact Us
            </a>
          </div>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
}

export default NeedHelp;
