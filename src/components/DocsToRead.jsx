import React from 'react';

function DocsToRead() {
  return (
    <div>
        <div className="container">
          <div className="card-group">
            <div className="card">
                <div className="card-body">
                <h5 className="card-title">Doc 1</h5>
                <p className="card-text">text1.</p>
                <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
                </div>
            </div>
            <div className="card">
                <div className="card-body">
                <h5 className="card-title">Doc2</h5>
                <p className="card-text">text2.</p>
                <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
                </div>
            </div>
            <div className="card">
                <div className="card-body">
                <h5 className="card-title">Doc 3</h5>
                <p className="card-text">text3.</p>
                <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
                </div>
            </div>
          </div>
          <br />
          <br />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae earum tenetur impedit laboriosam non at! Nostrum eaque dicta suscipit ex veritatis cumque, ut saepe animi, quibusdam, facilis quia culpa! Magnam?
          </p>
        </div>
    </div>
  );
}

export default DocsToRead;