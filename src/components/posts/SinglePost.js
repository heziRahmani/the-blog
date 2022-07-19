import React from "react";

import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import PostAuthor from "./PostAuthor";

import TimeAgo from "./TimeAgo";
import { getPostById } from "./postsSlice";
import ReactionButtons from "./ReactionButtons";
import "./postSection.scss";
export default function SinglePost() {
  let { postId } = useParams();

  let post = useSelector((state) => getPostById(state, Number(postId)));
  const authorId = window.localStorage.getItem("authorId");
  const authKey = window.localStorage.getItem("key");

  //
  if (!post) {
    return (
      <article>
        <h3>POST NOT FOUND</h3>
      </article>
    );
  }

  //render
  const renderLink =
    authorId == post.userId ? (
      <Link to={`/post/edit/${post.id}`}>Edit</Link>
    ) : (
      ""
    );

  return (
    <section className='postList_section'>
      <article className='singlePost_box'>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
        <p className='postCredit'>
          {renderLink}
          <PostAuthor userId={post.userId} />
          <TimeAgo timestamp={post.date} />
          <Link to={"/"}>BACK</Link>
        </p>
        <ReactionButtons post={post} />
      </article>
    </section>
  );
}
