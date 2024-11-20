/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import avatar from "../../../../assets/avatar.png";

export default function Navbar({loginData}) {
  return (
    <div className='bg-white py-3 d-flex justify-content-end align-items-center'>
       <img className='mx-2' src={avatar} alt="user-img" />
       <span >{loginData?.userName}</span>
    </div>
  )
}
