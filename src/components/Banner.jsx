import React from 'react';

const handleScrollClick = () => {
  window.scrollBy({
    top: 920,
    behavior:"smooth",
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
        height: '300px',
        width:'100%',
        margin:' 20px',
        marginTop :'6%',
        transform: 'scale(0.9)', /* Scale down the entire container */
        transformOrigin: 'center'
      }}
    >
      <div className="banner-container" style={{ width: '100%', maxWidth: '1200px' }}>
        <div className="row align-items-center" style={{ width: '100%', margin: '0 auto'}}>
          <div className="col-md-6" style={{ padding: '0 15px' }}>
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
          <div className="col-md-6 text-center" style={{ padding: '0 15px' }}>
            <img
              src="/165654-banking-pic-digital-png-image-high-quality.png"
              alt="Banking Solutions"
              style={{ width: '100%', height: 'auto', maxWidth: '100%', verticalAlign: 'middle' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
