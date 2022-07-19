import {
  createAsyncThunk,
  createSelector,
  createSlice,
  nanoid,
} from "@reduxjs/toolkit";
import { sub } from "date-fns";
import axios from "axios";

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts?_limit=15";
const initialState = {
  posts: [],
  status: "idle", //idle | loading | succeeded | faild
  error: null,
};

//get data from the API
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const responce = await axios.get(POSTS_URL);

  return responce.data;
});
//add new post
export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  async (initialPost) => {
    // try {
    const response = await axios.post(POSTS_URL, initialPost);
    // console.log(response.data);
    return response.data;
    // } catch (error) {
    //   return error.message;
    // }
  }
);
//update
export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async (initialPost) => {
    const { id } = initialPost;
    try {
      const response = await axios.put(`${POSTS_URL}/${id}`, initialPost);
      //   console.log(response.data);
      return response.data;
    } catch (error) {
      //   console.log(initialPost); // only for testing Redux!
      //   return error.message;
      return initialPost;
    }
  }
);

//delete
export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (initialPost) => {
    const { id } = initialPost;
    try {
      const response = await axios.delete(`${POSTS_URL}/${id}`);

      //   console.log(initialPost);
      if (response?.status === 200) return initialPost;
      return `${response?.status}: ${response?.statusText}`;
    } catch (err) {
      return err.message;
    }
  }
);

///slice start

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    //the opertion moved to the thunk
    // postAdded: {
    //   reducer(state, action) {
    //     state.posts.push(action.payload);
    //   },
    //   prepare(title, body, userId) {
    //     //adds the mising fields to the API then adds them to the action
    //     return {
    //       payload: {
    //         id: nanoid(),
    //         title,
    //         body,
    //         date: new Date().toISOString(),
    //         userId,
    //         reactions: {
    //           thumbsUp: 0,
    //           wow: 0,
    //           heart: 0,
    //           rocket: 0,
    //           coffee: 0,
    //         },
    //       },
    //     };
    //   },
    // },
    //TODO: make sure that the reaction can only be add ones
    reactionAdded(state, action) {
      //addds one to the selected reaction
      const { postId, reaction } = action.payload;
      const existingPost = state.posts.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
    reactionReduced(state, action) {
      //addds one to the selected reaction
      const { postId, reaction } = action.payload;
      const existingPost = state.posts.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]--;
      }
    },
  },
  extraReducers(build) {
    //async awith reducers
    build
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        let min = 1;
        const loadPosts = action.payload.map((post) => {
          post.date = sub(new Date(), { minutes: min++ }).toISOString();
          post.reactions = {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
          };
          return post;
        });
        state.posts = state.posts.concat(loadPosts);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "faild";
        state.error = action.error.message;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        action.payload.userId = Number(action.payload.userId);
        action.payload.date = new Date().toISOString();
        action.payload.reactions = {
          thumbsUp: 0,
          wow: 0,
          heart: 0,
          rocket: 0,
          coffee: 0,
        };

        // console.log(action.payload);
        state.posts = [...state.posts, action.payload];
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log("update cold not fulfild");
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        action.payload.date = new Date().toISOString();
        action.payload.reactions = {
          thumbsUp: 0,
          wow: 0,
          heart: 0,
          rocket: 0,
          coffee: 0,
        };
        const posts = state.posts.filter((post) => post.id !== id);
        state.posts = [...posts, action.payload];
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log("sumthing went wrong");
          console.log(action.payload);
          return;
        }
        let { id } = action.payload;
        let posts = state.posts.filter((post) => post.id !== id);
        console.table(posts);
        state.posts = posts;
      });
  },
});

//selectors
export const selectAllPosts = (state) => state.posts.posts;
export const getPostStatus = (state) => state.posts.status;
export const getPostError = (state) => state.posts.error;

export const getPostById = (state, postId) =>
  state.posts.posts.find((post) => post.id === postId);

export const getPostByUserId = createSelector(
  [selectAllPosts, (state, userId) => userId],
  (posts, userId) => posts.filter((post) => post.userId == userId)
);
//export reducers
export const { reactionAdded, increaseCount, reactionReduced } =
  postsSlice.actions;

export default postsSlice.reducer;
