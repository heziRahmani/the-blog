import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom";
import "./index.css";
import App from "./App/App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { fetchPosts } from "./components/posts/postsSlice";
import { fetchUsers } from "./components/users/usersSlice";

// by fetching the data hear we able to saty in the page after refres
store.dispatch(fetchPosts());
store.dispatch(fetchUsers());
{
  /* /* ==> allow nested routes */
}
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={<App />}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
