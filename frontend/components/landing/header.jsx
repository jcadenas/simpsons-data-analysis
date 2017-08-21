import React from 'react';
import { Link } from 'react-router-dom';

const Header = (props) => {


  return(
    <section className="header">
      <Link to="/">
        <div className="simpsons-logo-container">
          <img src={ window.images.homer_simpsons_logo } className="simpsons-logo" />
          <span>by the numbers</span>
        </div>
      </Link>
      <div className="header-contact">
        <a href="http://www.github.com/jcadenas">
          <div className="header-contact-item">GitHub</div>
        </a>
        <a href="http://www.linkedin.com/in/juliancadenas">
          <div className="header-contact-item">LinkedIn</div>
        </a>
      </div>
    </section>
  )

}

export default Header;
