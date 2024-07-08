import React from 'react';

const handleScrollClick = () => {
  window.scrollBy({
    top: 1100,
    behavior: "smooth",
  });
};

const HeroBanner = () => {
  return (
    <section
      className="hero-banner"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'left',
        color: '#ffffff',
        height: '500px',
      }}
    >
      <div className="container">
        <div className="row align-items-center">

          <div className="col-md-6">
            <div className="hero-content text-center">
              <div style={{ textAlign: 'center' }}> 
                <h1 style={{ paddingBottom: '20px' }}>Welcome to</h1>
                <h1 style={{ paddingBottom: '20px' }}>JS BANKING SOLUTIONS</h1>
              </div>
              <p style={{ backgroundImage: 'linear-gradient(135deg, #23c4f8, #275efe)', WebkitBackgroundClip: 'text', color: 'transparent' }}>
                Your trusted partner in secure and convenient banking services.
              </p>
              <button
                type="button"
                className="btn btn-primary btn-lg mt-5 mb-5"
                onClick={handleScrollClick}
              >
                Get Started
              </button>
            </div>
          </div>

          <div className="col-md-6 text-center">
            <img
              src="/165654-banking-pic-digital-png-image-high-quality.png"
              alt="Banking Solutions"
              style={{ width: '120%', height: '120%', maxWidth: '140%', maxHeight: '120%', verticalAlign: 'middle' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
