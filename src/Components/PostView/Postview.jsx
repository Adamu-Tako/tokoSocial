import { FiMoreHorizontal } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { FaCommentAlt } from "react-icons/fa";
import { IoIosShare } from "react-icons/io";
import { BsFillBookmarksFill } from "react-icons/bs";
import profile2 from "../../assets/images/profile-3.jpg";
import { useParams } from "react-router-dom";
import "./Postview.css";
import { useState } from "react";
import { useEffect } from "react";

const Postview = ({
  posts,
  profilePicture,
  comment,
  setComment,
  handleComment,
}) => {
  const { postId } = useParams();
  const [postComments, setPostComments] = useState();

  const getCommentData = async () => {
    let response = await fetch(" http://localhost:3000/comments");
    const c = await response.json();
    return setPostComments(c);
  };

  useEffect(() => {
    getCommentData();
  }, []);

  const postC = postComments?.filter(
    (comment) => Number(comment.postId) === Number(postId)
  );

  const post = posts?.find((post) => post.id === Number(postId));

  return (
    <div className="r-commy">
      <h1>Post</h1>
      <div className="comment-r">
        <div className="profile">
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
          <img src={post?.image} alt="" />
          <div className="post-icons">
            <div>
              <FaHeart />
              <FaCommentAlt />
              <IoIosShare />
            </div>
            <BsFillBookmarksFill />
          </div>
          <div className="post-text">
            <p className="text-bold">{post?.text}</p>
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
      {postC?.map((com) => {
        return (
          <div key={com.id} className="comment-tray">
            <div className="profile-photo">
              <img src={profilePicture} alt="" />
            </div>
            <div className="comment-slide">
              <h4>{com.fName}</h4>
              <p className="text-bold">{com.comment}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Postview;
