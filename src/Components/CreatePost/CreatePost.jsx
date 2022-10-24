import { useState } from "react";
import "./Createpost.css";
import { Link } from "react-router-dom";

const CreatePost = () => {
  const [image, setImage] = useState("");
  const [text, setText] = useState();
  const [url, setUrl] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("file", url);
    data.append("upload_preset", "pel3nsyu");
    data.append("cloud_name", "dye8ruhut");
    await fetch("https://api.cloudinary.com/v1_1/dye8ruhut/upload", {
      method: "post",
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        setImage(data.url);
        console.log(image);
      })
      .catch((err) => console.log(err));

    const newData = { image: image, text: text };

    console.table([image, text]);

    await fetch("http://localhost:3000/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(newData),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return (
    <div className="create-container">
      <form onSubmit={handleSubmit}>
        <div>
          <p>Select an image you want to post</p>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setUrl(e.target.files[0])}
          />
        </div>
        <div>
          <p>Write Your Post</p>
          <textarea
            name="postText"
            value={text}
            id=""
            cols="30"
            rows="10"
            onChange={(e) => setText(e.target.value)}
            placeholder="Create a post"
          ></textarea>
        </div>
        <button onClick={handleSubmit} className="btn btn-primary">
          Post
        </button>
        {url && (
          <div>
            <img src={image} alt="" width="50px" height="75px" />
          </div>
        )}
      </form>
      <div className="go-back">
        <Link to="/homepage">Go back</Link>
      </div>
    </div>
  );
};

export default CreatePost;
