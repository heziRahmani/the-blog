import { set } from "date-fns";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  reactionAdded,
  reactionReduced,
  selectAllPosts,
} from "../posts/postsSlice";

const reactionEmoji = {
  thumbsUp: "👍",
  wow: "😮",
  heart: "❤️",
  rocket: "🚀",
  coffee: "☕",
};

const ReactionButtons = ({ post }) => {
  const [reactionTuggle, setReactionTuggle] = useState(false);
  const dispatch = useDispatch();

  // console.log(post);
  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button
        key={name}
        type=''
        className='reactionButton'
        onClick={() => {
          console.log(name);
          console.log(post.reactions[name]);
          if (post.reactions[name] > 0) {
            dispatch(reactionReduced({ postId: post.id, reaction: name }));
            setReactionTuggle(!reactionTuggle);
          } else if (post.reactions[name] == 0) {
            dispatch(reactionAdded({ postId: post.id, reaction: name }));
            setReactionTuggle(!reactionTuggle);
          }
        }}>
        {emoji} {post.reactions[name]}
      </button>
    );
  });

  return <div className='btn_container'>{reactionButtons}</div>;
};
export default ReactionButtons;
