import AddPostForm from "../components/posts/postCrud/AddPostForm";
import PostsList from "../components/posts/PostList/PostsList";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import SinglePost from "../components/posts/SinglePost";
import EditPost from "../components/posts/postCrud/EditPost";
import "./AppGeneralStyle.scss";
import UsersList from "../components/users/UsersList";
import User from "../components/users/User";
import Login from "../components/LogIn/Login";
function App() {
  return (
    <Routes>
      {/* main routs */}
      <Route path='/' element={<Layout />}>
        <Route index element={<PostsList />} />
        {/* log in */}
        <Route path='login' element={<Login />} />
        {/* post routs */}
        <Route path='post'>
          <Route index element={<AddPostForm />} />
          <Route path=':postId' element={<SinglePost />} />
          <Route path='edit/:postId' element={<EditPost />} />
        </Route>
        {/* user routs */}
        <Route path='user'>
          <Route index element={<UsersList />} />
          <Route path=':userId' element={<User />} />
        </Route>
        {/* Catch all: 404 */}
        <Route path='*' element={<Navigate to={"/"} replace />} />
      </Route>
    </Routes>
  );
}

export default App;
