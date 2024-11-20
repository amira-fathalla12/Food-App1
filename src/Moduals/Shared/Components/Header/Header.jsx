/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import dashboard1 from "../../../../assets/header2.png";
export default function Header({title,decsription}) {
  return (
    <div className="header-container p-5 d-flex justify-content-between align-items-center">
      <div className="caption w-50 text-white">
        <h3 className="px-4">{title}</h3>
        <p className="w-75 px-4">{decsription}</p>
      </div>
      <div className="header-img">
        <img src={dashboard1} alt="header" />
      </div>
    </div>
  );
}
