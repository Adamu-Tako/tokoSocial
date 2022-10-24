import { MdCreate } from "react-icons/md";
import { FiMoreHorizontal } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { FaCommentAlt } from "react-icons/fa";
import { IoIosShare } from "react-icons/io";
import { BsFillBookmarksFill } from "react-icons/bs";
import profile2 from "../../assets/images/profile-3.jpg";
import { Link, useNavigate } from "react-router-dom";
import "./Mainslide.css";
import { useState } from "react";
import { useEffect } from "react";

const Mainslide = ({
  posts,
  profilePicture,
  comment,
  handleComment,
  setComment,
}) => {
  const nav = useNavigate();
  const [likeCount, setLikeCount] = useState({});
  const [updateCount, setUpdateCount] = useState(0);
  const userId = window.localStorage.getItem("userId");

  const likePostAndUpdateCount = (postId) => {
    handleAddLike(postId);
    getPostLikes();
  };

  const handleAddLike = async (postId) => {
    let response = await fetch(" http://localhost:3000/postLikes");
    const postLikesDb = await response.json();

    const found = postLikesDb.find((likes) => likes.postId === postId);

    if (!found) {
      //TODO: send post request with new obj
      const likeData = new FormData();
      likeData.users = [userId];
      likeData.postId = postId;
      console.log(likeData);

      await fetch(`http://localhost:3000/postLikes/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(likeData),
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
      return;
    }

    // if user already liked post
    if (found && found.users?.includes(userId)) return;

    found.users?.push(userId);

    await fetch(`http://localhost:3000/postLikes/${found.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(found),
    });

    setUpdateCount(updateCount + 1);
  };

  // handleAddLike()

  const getPostLikes = async () => {
    let response = await fetch(" http://localhost:3000/postLikes");
    const postLikesDb = await response.json();

    postLikesDb.forEach((likes) => {
      const { postId } = likes;
      likeCount[postId] = likes.users?.length;
      setLikeCount({ ...likeCount });
    });
  };

  useEffect(() => {
    getPostLikes();
    // eslint-disable-next-line
  }, [updateCount]);

  return (
    <main>
      <div className="search-bar">
        <MdCreate />
        <input type="text" placeholder="Create a new post" />
        <div className="btn btn-primary">
          <Link style={{ color: "white" }} to="/CreatePost">
            Create Post
          </Link>
        </div>
      </div>

      {posts?.map((post) => {
        return (
          <div className="post" key={post.id}>
            <div
              className="profile"
              onClick={() => nav(`/homepage/post/${post.id}`)}
            >
              <div className="proffile-name">
                <div className="profile-photo">
                  <img src={profile2} alt="" />
                </div>
                <div>
                  <h3>Muhammad Kabir</h3>
                  <p className="text-muted">Maldives, 2 HOURS AGO</p>
                </div>
              </div>
              <FiMoreHorizontal />
            </div>
            <div className="post-body">
              <img src={post.image} alt="" />
              <div className="post-icons">
                <div>
                  <FaHeart onClick={() => likePostAndUpdateCount(post.id)} />
                  <p>{likeCount[post.id] || 0}</p>
                  <FaCommentAlt />
                  <IoIosShare />
                </div>
                <BsFillBookmarksFill />
              </div>
              <div
                className="post-text"
                onClick={() => nav(`/homepage/post/${post.id}`)}
              >
                <p className="text-bold">{post.text}</p>
              </div>
            </div>
            <div className="comment-box">
              <div className="profile-photo">
                <img src={profilePicture} alt="" />
              </div>
              <div className="comment-input">
                <input
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Write a comment..."
                />
                <button
                  className="btn btn-primary"
                  onClick={(e) => handleComment(e, post.id)}
                >
                  Comment
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </main>
  );
};

export default Mainslide;
