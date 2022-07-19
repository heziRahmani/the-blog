import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import "./layout.scss";
export default function Layout() {
  // const tuggleHendeler = () => {
  //   const navBarList = document.getElementById("navBarList");
  //   navBarList.classList.remove("navBarList");
  //   navBarList.classList.add("navBarOpen");
  // };
  function tuggleHendeler() {
    const icon = document.querySelector(".icon");
    const sideBar = document.querySelector("#navBarList");

    icon.classList.toggle("open");

    sideBar.classList.toggle("navBarOpen");
  }
  return (
    <div className='layout_container'>
      <div className='tuggleSideBar_box'>
        {/* <button className='tuggle_btn'> */}
        <div className='icon navBar_tuggle_icon' onClick={tuggleHendeler}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        {/* </button> */}
      </div>
      <NavBar />
      <Outlet />
    </div>
  );
}
