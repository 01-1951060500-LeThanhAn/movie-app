import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { postComment, fetchComment } from "../../actions/fireStoreActions";
import { useStore } from "../../stored/store";
import { avatar } from "../../config/config";
import "./Comment.css";
import { AiOutlineSend } from "react-icons/ai";
import { Timestamp } from "firebase/firestore";

import CommentItem from "./CommentItem";

const Comment = ({ id }) => {
  const user = useStore((state) => state.user);
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState([]);
  const [loading, setLoading] = useState(false);

  const handlePostComment = async (e) => {
    e.preventDefault();
    if (!user) return;
    if (comment.trim() === "") return;
    setLoading(true);

    const res = await postComment({
      id: id,
      userId: user.uid,
      userName: user?.displayName,
      avatar: user.photoURL,
      content: comment,
      createdAt: Timestamp.now(),
    });

    setCommentList([...commentList, res]);
    setLoading(false);
    setComment("");
  };

  useEffect(() => {
    async function getComment() {
      const data = await fetchComment(id);
      setCommentList(data);
    }
    getComment();
  }, [id]);

  return (
    <div className="comment my-6">
      <h2 className="comment_title mb-3">Comments</h2>
      <form onSubmit={handlePostComment}>
        <div className="comment_container">
          {
            <img
              className="avatar"
              alt={user?.displayName}
              src={user ? user.photoURL : avatar}
            />
          }

          {user ? (
            <div className="comment_input">
              <input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                type="text"
                placeholder={"Enter Comment here"}
              />
            </div>
          ) : (
            <div className="error_comment">
              <h3 style={{ marginLeft: "50px" }}>
                You need
                <Link to={`/login`}>
                  <span style={{ fontSize: "18px", color: "#cd333a" }}>
                    {" "}
                    login{" "}
                  </span>
                </Link>
                to comment
              </h3>
            </div>
          )}

          <button className="send_comment" disabled={loading}>
            <AiOutlineSend />
          </button>
        </div>

        {commentList.length > 0 && (
          <div className="mb-8">
            {commentList.map((comment, index) => (
              <CommentItem
                commentList={commentList}
                setCommentList={setCommentList}
                comment={comment}
                key={index}
              />
            ))}
          </div>
        )}
      </form>
    </div>
  );
};

export default Comment;
