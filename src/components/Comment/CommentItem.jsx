import React, { useState } from "react";
import "./CommentItem.css";
import { formatRelative } from "date-fns/esm";
import { db } from "../../firebase/auth";
import { deleteDoc, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useStore } from "../../stored/store";
const formatDate = (date) => {
  let formattedDate = "";
  if (date) {
    // Convert the date in words relative to the current date
    formattedDate = formatRelative(new Date(date * 1000), new Date());
    // Uppercase the first letter
    formattedDate =
      formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  }
  return formattedDate;
};

const CommentItem = ({ comment }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useStore((state) => state);
  const [edit, setEdit] = useState(false);
  const [editValue, setEditValue] = useState(comment?.content);
  const handleDeleteComment = async () => {
    const Ref = doc(db, "comments", comment.id);
    if (comment.userId === user.uid) {
      try {
        await deleteDoc(Ref);
        setLoading(true);
      } catch (err) {
        alert(err.message);
      }
      return toast.success("Delete this comment successfully");
    } else {
      return toast.error("Delete comment failed");
    }
  };

  const handleUpdateComment = async () => {
    const commentRef = doc(db, `comments/${comment.id}`);

    try {
      await updateDoc(commentRef, {
        content: editValue,
        createdAt: serverTimestamp(),
      });

      setEdit(false);
      setEditValue("");
      toast.success("Updated title comment success");
    } catch (error) {
      setEdit(false);
      toast.error(error.message);
    }
  };

  return (
    <>
      {!loading && (
        <div className="show_commtent_items" key={comment.id}>
          <div className="show_avatar">
            <img alt="avatar" src={comment.avatar} />
          </div>
          <div className="show_info">
            <div className="show_name_time">
              <h3>{comment.userName}</h3>
              <p className="time">{formatDate(comment?.createdAt?.seconds)}</p>
            </div>
            {edit ? (
              <input
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                type="text"
              />
            ) : (
              <p>{comment.content}</p>
            )}

            {edit ? (
              <p onClick={handleUpdateComment} className="update_comment">
                Update
              </p>
            ) : (
              <p onClick={() => setEdit(true)} className="update_comment ml-3">
                Edit
              </p>
            )}

            <p
              onClick={() => handleDeleteComment(comment.id)}
              className="delete_comment"
            >
              Delete
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default CommentItem;
