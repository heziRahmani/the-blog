import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getPostByUserId, selectAllPosts } from "../posts/postsSlice";
import { getUserById } from "./usersSlice";

export default function User() {
  const { userId } = useParams();
  const user = useSelector((state) => getUserById(state, userId));

  const userPosts = useSelector((state) =>
    getPostByUserId(state, Number(userId))
  );
  console.log(userPosts);
  const postTitle = userPosts.map((post) => {
    return (
      <li key={post.id}>
        <Link to={`/post/${post.id}`}>{post.title}</Link>
      </li>
    );
  });
  return (
    <section className='userPage_container'>
      <h2>{user?.name}</h2>
      <ol>{postTitle}</ol>
    </section>
  );
}
