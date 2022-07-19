import React from "react";
import PostAuthor from "../PostAuthor";
import TimeAgo from "../TimeAgo";

import { Link } from "react-router-dom";
import ReactionButtons from "../ReactionButtons";
export const Post = ({ post }) => {
  // console.log(post.body);
  return (
    <article className='singlePost_box'>
      <h3>{post.title}</h3>
      <p>{post.body.substring(0, 60)}</p>
      <p className='postCredit'>
        <Link to={`post/${post.id}`}>View Full Post</Link>
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>
      <ReactionButtons post={post} />
    </article>
  );
};
