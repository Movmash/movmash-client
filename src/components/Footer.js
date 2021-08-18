import React from 'react'
import "./stylesheets/Footer.css";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import TwitterIcon from "@material-ui/icons/Twitter";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
function Footer() {
    return (
      <div className="footer">
        <div className="footer__boundary"></div>
        <div className="footer__text">
          <span>
            Made with{" "}
            <span role="img" aria-label="heart">
              ♥️
            </span>{" "}
            in India
          </span>
          <div className="footer__socialLinks">
            {/* <div className="social_icon">
              
            </div> */}
            <a
              href="https://www.instagram.com/movmash/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <InstagramIcon />{" "}
            </a>
            <a
              href="https://www.facebook.com/movmash.official"
              rel="noopener noreferrer"
              target="_blank"
            >
              <FacebookIcon />
            </a>
            <a
              href="https://www.linkedin.com/company/movmash"
              rel="noopener noreferrer"
              target="_blank"
            >
              <LinkedInIcon />
            </a>
            <a
              href="https://twitter.com/movmashofficial"
              rel="noopener noreferrer"
              target="_blank"
            >
              <TwitterIcon />
            </a>
          </div>
          <span className="copyrightText">Copyright © Movmash, Inc. 2021</span>
          <div className="footer__help_support">
            <a
              href="https://www.facebook.com/groups/214835117253052"
              rel="noopener noreferrer"
              target="_blank"
            >
              <HelpOutlineIcon /> <span>Help & support</span>
            </a>
          </div>
        </div>
        {/* <div className="footer__help_support">
          <a
            href="https://www.facebook.com/groups/214835117253052"
            rel="noopener noreferrer"
            target="_blank"
          >
            <HelpOutlineIcon /> <span>Help & support</span>
          </a>
        </div>
      */}
      </div>
    );
}

export default Footer
