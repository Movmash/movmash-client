import React from 'react'
import "./stylesheets/Footer.css";
function Footer() {
    return (
      <div className="footer">
        <div className="footer__boundary"></div>
        <div className="footer__text">
          <span>Made with <span role="img" aria-label="heart">♥️</span> in India</span>
          <span className="copyrightText">Copyright © Movmash, Inc. 2021</span>
        </div>
      </div>
    );
}

export default Footer
