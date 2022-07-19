import { set } from "date-fns";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { reactionAdded, reactionReduced } from "../posts/postsSlice";

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

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button
        key={name}
        type=''
        className='reactionButton'
        onClick={() => {
          if (!reactionTuggle) {
            dispatch(reactionAdded({ postId: post.id, reaction: name }));
            setReactionTuggle(!reactionTuggle);
          } else if (reactionTuggle) {
            dispatch(reactionReduced({ postId: post.id, reaction: name }));
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
