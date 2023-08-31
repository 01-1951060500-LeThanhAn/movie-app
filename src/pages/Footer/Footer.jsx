import React from 'react';
import "./Footer.css"

import * as Bs from "react-icons/bs"

function Footer() { 
  return (
    <div className="bg-black d-flex justify-between text-white px-8 py-[20px] items-center">
    <p className="footer_name">Le Thanh An</p>
    <p className="flex items-center">
      <a href="https://github.com/01-1951060500-LeThanhAn/" className="text-3xl ">
        <Bs.BsGithub />
      </a>
      <a href="https://github.com/01-1951060500-LeThanhAn/" className="text-blue-600 text-3xl ml-3">
       <Bs.BsFacebook />
      </a>
    
    </p>
  </div>
  )
};

export default Footer;
