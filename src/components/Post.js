import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../utils/firebase.config";
import CommentPost from "./CommentPost";
import Delete from "./Delete";

const Post = ({ post, user }) => {
  const [edit, setEdit] = useState(false);
  const [editMess, setEditMess] = useState(null);

  const dateFormater = (date) => {
    let newDate = Math.floor(
      (new Date() - new Date(date)) / (1000 * 3600 * 24)
    );
    if (newDate === 0) {
      return "aujourd'hui";
    } else if (newDate === 1) {
      return "il y a 1 jour";
    } else {
      return "il y a" + newDate + "jours";
    }
  };

  const handleEdit = () => {
    setEdit(false);
    if (editMess) {
      updateDoc(doc(db, "posts", post.id), { message: editMess });
    }
  };
  return (
    <div className="post">
      <div className="post-header">
        <div className="left-part">
          <div className="title">
            <span>{post.author[0]}</span>
            <h2>{post.author}</h2>
          </div>
          <h5>posté {dateFormater(post.date)}</h5>
        </div>
        {post.authorId === user?.uid && (
          <div className="right-part">
            <span onClick={() => setEdit(!edit)}>
              <i className="fa-solid fa-pen-to-square"></i>
            </span>
            <span>
              <Delete postId={post.id} />
            </span>
          </div>
        )}
      </div>
      {edit ? (
        <>
          <textarea
            autoFocus
            value={editMess ? editMess : post.message}
            onChange={(e) => setEditMess(e.target.value)}
          ></textarea>
          <button className="edit-btn" onClick={() => handleEdit()}>
            Modifier message
          </button>
        </>
      ) : (
        <p>{editMess ? editMess : post.message}</p>
      )}
      <CommentPost post={post} />
    </div>
  );
};

export default Post;
