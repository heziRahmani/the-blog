import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import { increaseCount } from "../posts/postsSlice";
import { FaTheRedYeti } from "react-icons/fa";
import "./navBar.scss";
export default function NavBar() {
  const dispatch = useDispatch();

  return (
    <header className='mainHeader'>
      <div className='title'>
        <h1>The Blog</h1>
        <div className='icon'>
          <FaTheRedYeti />{" "}
        </div>
      </div>
      <nav>
        <ul id='navBarList' className='navBarList'>
          <li>
            <Link to={"/"}>HOME</Link>
          </li>
          <li>
            <Link to={"post"}>ADD POST</Link>
          </li>
          <li>
            <Link to={"user"}>AUTHORS</Link>
          </li>
          <li>
            <Link to={"login"}>LOG IN</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
