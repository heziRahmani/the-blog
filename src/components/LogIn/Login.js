import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectAllUsers } from "../users/usersSlice";
import "./login.scss";
export default function Login() {
  const [auth, setAuth] = useState("");
  const [authorName, setauthorName] = useState("");
  const [authorId, setAuthorId] = useState("");
  const users = useSelector(selectAllUsers);
  //btn hendelers
  const onAuthorChanged = (e) => setAuthorId(Number(e.target.value));
  const loginHendeler = () => {
    window.localStorage.setItem("key", "this is the auth key");
    window.localStorage.setItem("authorId", authorId);
  };

  //render
  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));
  return (
    <div className='login_container'>
      <div className='login_form'>
        <div className='select_box'>
          <label>Author</label>
          <select
            id='postAuthor'
            defaultValue={authorId}
            onChange={onAuthorChanged}>
            <option value=''></option>
            {usersOptions}
          </select>
        </div>
        <div className='input_box'>
          <label>Password</label>
          <input type={"password"} value={"1234567"} />
        </div>
      </div>
      <Link to={"/post"} onClick={loginHendeler}>
        LOG IN
      </Link>
    </div>
  );
}
