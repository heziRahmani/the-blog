import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { selectAllUsers } from "../../users/usersSlice";
import { getPostById, updatePost, deletePost } from "../postsSlice";
import "../postSection.scss";
export default function EditPost() {
  let { postId } = useParams();
  const navigate = useNavigate();
  //  selectors
  let post = useSelector((state) => getPostById(state, Number(postId)));
  const users = useSelector(selectAllUsers);

  const [title, setTitle] = useState(post?.title);
  const [content, setContent] = useState(post?.body);
  const [userId, setUserId] = useState(post?.userId);
  const [requestStatus, setRequestStatus] = useState("idle");

  const dispatch = useDispatch();

  //checkes if a post exist
  if (!post) {
    return (
      <article>
        <h3>POST NOT FOUND</h3>
      </article>
    );
  }

  //btn hendelers
  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onAuthorChanged = (e) => setUserId(Number(e.target.value));

  //save functions
  const canSave =
    Boolean(title) &&
    Boolean(content) &&
    Boolean(userId) &&
    requestStatus === "idle";
  const onSavePostClicked = () => {
    if (canSave) {
      try {
        dispatch(
          updatePost({
            id: post.id,
            title,
            body: content,
            userId,
            reaction: post.reaction,
          })
        ).unwrap();

        setTitle("");
        setContent("");
        setUserId("");
        navigate(`/`);
      } catch (err) {
        console.error("Failed to update the post", err);
      } finally {
        setRequestStatus("idle");
      }
    }
  };

  //delete post
  const onDeletPost = () => {
    // console.log("post id", post.id);
    try {
      setRequestStatus("loading");
      dispatch(deletePost({ id: post.id })).unwrap();
      setTitle("");
      setContent("");
      setUserId("");
      navigate(`/`);
    } catch (error) {
      console.log("Failed to delete the post", error);
    } finally {
      setRequestStatus("idle");
    }
  };
  //render
  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <section className='addPost_form_container'>
      <h2 className='addPost_form_header'>Edit Post</h2>
      <form className='addPost_form'>
        <div>
          <div>
            <label htmlFor='postTitle'>Post Title:</label>
            <input
              type='text'
              id='postTitle'
              name='postTitle'
              value={title}
              onChange={onTitleChanged}
            />
          </div>
          <div className='postAuthor'>
            <label htmlFor='postAuthor'>Author:</label>
            <select
              id='postAuthor'
              defaultValue={userId}
              onChange={onAuthorChanged}>
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
          <button type='button' onClick={onSavePostClicked} disabled={!canSave}>
            Save Post
          </button>
          <button type='button' onClick={onDeletPost}>
            Delete Post
          </button>
        </div>
      </form>
    </section>
  );
}
