import { useSelector } from "react-redux";
import { selectAllPosts, getPostError, getPostStatus } from "../postsSlice";

import { Post } from "./Post";

const PostsList = () => {
  //
  const posts = useSelector(selectAllPosts);
  const postStatus = useSelector(getPostStatus);
  const postError = useSelector(getPostError);
  // console.log(posts);

  let content;
  if (postStatus === "loading") {
    content = <p>'Loading...'</p>;
  } else if (postStatus === "succeeded") {
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));
    content = orderedPosts.map((post) => <Post key={post.id} post={post} />);
  } else if (postStatus === "faild") {
    content = <p>{postError}</p>;
  }

  return <section className='postList_section'>{content}</section>;
};
export default PostsList;
