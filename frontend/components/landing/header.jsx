import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component{

  constructor(props) {
    super(props)
    this.toggleAudioMute = this.toggleAudioMute.bind(this);
    this.displayVolume = this.displayVolume.bind(this);
    this.state = {
      muted: false
    }
  }

  toggleAudioMute(e) {
    e.stopPropagation();
    let audioElement = document.getElementById('theme_song');
    audioElement.muted = !audioElement.muted;

    this.setState({
      muted: !this.state.muted
    });

  }

  displayVolume() {
    if (this.state.muted) {
      return (
        <img
          src={ window.icons.volume_muted }
          className="volume-control"
          onClick = {this.toggleAudioMute} />
      );
    } else {
      return (
        <img
          src={ window.icons.volume_unmuted }
          className="volume-control"
          onClick = {this.toggleAudioMute} />
      );
    }
  }

  render() {
    return(
      <section className="header">
        <div className="header-left-side">
          <Link to="/">
            <div className="simpsons-logo-container">
              <img src={ window.images.homer_simpsons_logo } className="simpsons-logo" />
              <span className="header-header-text">by the numbers</span>
            </div>
          </Link>
          {this.displayVolume()}
        </div>
        <div className="header-right-side">
          <div className="header-right-side-container">
            <span className="created-by">created by:</span><span className="creator">Julian Cadenas</span>
            <div className="header-contact">
              <a href="http://www.github.com/jcadenas/simpsons-data-analysis"
                className="contact-item-container">
                <i className="fa fa-github header-contact-item" aria-hidden="true"></i>
              </a>
              <a href="http://www.linkedin.com/in/juliancadenas"
                className="contact-item-container">
                <i className="fa fa-linkedin header-contact-item last-header-contact-item" aria-hidden="true"></i>
              </a>
            </div>
          </div>
        </div>
      </section>
    )
  }

}

export default Header;
