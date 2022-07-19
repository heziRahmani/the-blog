import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addNewPost, postAdded } from "../postsSlice";
import { selectAllUsers } from "../../users/usersSlice";
import "../postSection.scss";
import { useNavigate } from "react-router-dom";
const AddPostForm = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  const [addrequestStatus, setAddRequestStatus] = useState("idle");
  const users = useSelector(selectAllUsers);
  const navigate = useNavigate();
  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onAuthorChanged = (e) => setUserId(e.target.value);

  // auth
  const authKey = window.localStorage.getItem("key");
  console.log(authKey);
  useEffect(() => {
    if (authKey === null) {
      navigate(`/login`);
    }
  }, [authKey]);

  //save functions
  const canSave =
    Boolean(title) &&
    Boolean(content) &&
    Boolean(userId) &&
    addrequestStatus === "idle";
  const onSavePostClicked = () => {
    try {
      if (canSave) {
        setAddRequestStatus("pending");
        dispatch(addNewPost({ title, body: content, userId })).unwrap();
        setTitle("");
        setContent("");
        setUserId("");
        navigate(`/`);
      }
    } catch (error) {
      console.error("Failed to add the post", error);
    } finally {
      setAddRequestStatus("idle");
    }
  };

  //render
  const usersOptions = users
    .filter((user) => {
      return user.id == window.localStorage.getItem("authorId");
    })
    .map((user) => {
      console.log(user);
      return (
        <option key={user.id} value={user.id}>
          {user.name}
        </option>
      );
    });

  return (
    <section className='addPost_form_container'>
      <h2 className='addPost_form_header'>Add a New Post</h2>
      <form className='addPost_form'>
        <div>
          <div className='inputBox'>
            <label htmlFor='postTitle'>Post Title:</label>
            <input
              type='text'
              id='postTitle'
              name='postTitle'
              value={title}
              onChange={onTitleChanged}
            />
          </div>
          <div className='inputBox postAuthor'>
            <label htmlFor='postAuthor'>Author:</label>
            <select id='postAuthor' value={userId} onChange={onAuthorChanged}>
              <option value=''></option>
              {usersOptions}
            </select>
          </div>
        </div>
        <div className='postTxt'>
          <label htmlFor='postContent'>Content:</label>
          <textarea
            rows={10}
            id='postContent'
            name='postContent'
            value={content}
            onChange={onContentChanged}
          />
        </div>
        <div className='btnBox'>
          <button
            className='formBtn'
            type='button'
            onClick={onSavePostClicked}
            disabled={!canSave}>
            Save Post
          </button>
        </div>
      </form>
    </section>
  );
};
export default AddPostForm;
