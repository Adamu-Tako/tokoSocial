import React, { useState } from "react";
import "./App.css";
import CreatePost from "./Components/CreatePost/CreatePost";
import Header from "./Components/Header/Header";
import Mainslide from "./Components/MainSlide/Mainslide";
import Sidebar from "./Components/Sidebar/SideBar";
import { Routes, Route, useNavigate } from "react-router-dom";
import Signup from "./Components/Signup/Signup";
import Login from "./Components/Login/Logn";
import { useEffect } from "react";
import Postview from "./Components/PostView/Postview";

const App = () => {
  const nav = useNavigate();
  const [posts, setPosts] = useState();
  const [username, setUsername] = useState();
  const [name, setName] = useState();
  const [profilePicture, setProfilePicture] = useState();
  const [comment, setComment] = useState("");

  const setCurrentUser = async () => {
    const userId = window.localStorage.getItem("userId");
    if (!userId || userId === "undefined") {
      nav("/");
    }
    const profilesDb = await fetch("http://localhost:3000/profile")
      .then((res) => res.json())
      .then((data) => data);

    const currentUser = profilesDb.find((u) => u.userId === userId);

    if (currentUser) {
      setUsername(currentUser.username);
      setName(currentUser.name);
      setProfilePicture(currentUser.profilePicture);
    }
  };

  const handleComment = (e, postId) => {
    e.preventDefault();

    const commentData = new FormData();
    commentData.append("postId", postId);
    commentData.append("comment", comment);
    commentData.append("fName", name);
    const commentDataObj = {};
    commentData.forEach((value, key) => (commentDataObj[key] = value));
    console.log("comment", commentDataObj);

    fetch("http://localhost:3000/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(commentDataObj),
    })
      .then((res) => res.json())
      .then((data) => data);

    setComment("");
  };

  useEffect(() => {
    setCurrentUser();
  }, []);
  useEffect(() => {
    getPostData();
  }, [Mainslide, Postview]);

  const getPostData = async () => {
    let response = await fetch(" http://localhost:3000/posts");
    const p = await response.json();
    return setPosts(p);
  };

  return (
    <div className="App">
      <Routes>
        <Route
          path="/homepage"
          element={
            <>
              <Header profilePicture={profilePicture} />
              <div className="main-body">
                <Sidebar
                  setCurrentUser={setCurrentUser}
                  className="sidebar"
                  profilePicture={profilePicture}
                  name={name}
                  username={username}
                />
                <Mainslide
                  comment={comment}
                  setComment={setComment}
                  handleComment={handleComment}
                  profilePicture={profilePicture}
                  getPostData={getPostData}
                  posts={posts}
                />
              </div>
            </>
          }
        />
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/homepage/post/:postId"
          element={
            <Postview
              comment={comment}
              setComment={setComment}
              handleComment={handleComment}
              profilePicture={profilePicture}
              getPostData={getPostData}
              posts={posts}
            />
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/CreatePost" element={<CreatePost />} />
      </Routes>
    </div>
  );
};
export default App;
