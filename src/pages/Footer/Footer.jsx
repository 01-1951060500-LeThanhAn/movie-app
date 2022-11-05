import React from 'react';
import "./Footer.css"
// import  AiFillYoutube from "react-icons";
// import BsGithub from "react-icons/bs";
// import BsFacebook from "react-icons"
import * as Bs from "react-icons/bs"
import * as Ai from "react-icons/ai" 
function Footer() { 
  return (
    <div className="footer">
    <p className="footer_name">Le Thanh An</p>
    <p className="footer_contact">
      <a href="https://github.com/01-1951060500-LeThanhAn/" className="github logo">
        <Bs.BsGithub />
      </a>
      <a className="facebook logo">
       <Bs.BsFacebook />
      </a>
      <a className="youtube logo">
      <Ai.AiFillYoutube />
      </a>
    </p>
  </div>
  )
};

export default Footer;
