import React from 'react';
import { Link } from 'react-router-dom';

const Header = (props) => {


  return(
    <section className="header">
      <Link to="/">
        <div className="simpsons-logo-container">
          <img src={ window.images.homer_simpsons_logo } className="simpsons-logo" />
          <span className="logo-text">by the numbers</span>

        </div>
      </Link>
      <div className="header-contact">
        <div className="header-contact-item">GitHub</div>
        <div className="header-contact-item">LinkedIn</div>
      </div>
    </section>
  )

}

export default Header;
