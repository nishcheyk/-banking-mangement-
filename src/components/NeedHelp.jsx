import React from "react";

function NeedHelp() {
  return (
    <div>
      <div className="container">
        {/* <div className="row"> */}
        <div className="card col-5 mx-auto my-5">
          {/* style={{width: "18rem"}} */}
          <div className="card-body">
            <h5 className="card-title">Need Help?</h5>
            <p className="card-text">
              Reach out to us. We are committed to your security and help
            </p>
            <a href="/" className="btn btn-primary">
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
