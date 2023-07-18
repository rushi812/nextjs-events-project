import { useContext, useEffect, useState } from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";
import NotificationContext from "../../../store/notification-context";

function Comments(props) {
  const notificationCtx = useContext(NotificationContext);

  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);

  useEffect(() => {
    if (showComments) {
      setLoadingComments(true);
      fetch(`/api/comments/${eventId}`)
        .then((res) => {
          if (res.ok) return res.json();

          return res.json().then((data) => {
            throw new Error(data.message ?? "Something went wrong!");
          });
        })
        .then((data) => {
          setLoadingComments(false);
          if (data?.comments?.length) {
            setComments(data.comments);
          }
        })
        .catch((error) => {
          setLoadingComments(false);
          notificationCtx.showNotification({
            title: "Error!",
            message: error.message ?? "Something went wrong!",
            status: "error",
          });
        });
    }
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    notificationCtx.showNotification({
      title: "Adding Comment...!!",
      message: "Adding new comment, please wait.",
      status: "pending",
    });
    fetch(`/api/comments/${eventId}`, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) return res.json();

        return res.json().then((data) => {
          throw new Error(data.message ?? "Something went wrong!");
        });
      })
      .then((data) => {
        notificationCtx.showNotification({
          title: "Success!",
          message: "Successfully added comment",
          status: "success",
        });
      })
      .catch((error) => {
        notificationCtx.showNotification({
          title: "Error!",
          message: error.message ?? "Something went wrong!",
          status: "error",
        });
      });
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && (
        <>
          <NewComment onAddComment={addCommentHandler} />
          {!loadingComments ? (
            <CommentList comments={comments} />
          ) : (
            <p>
              <i>Comments loading...!</i>
            </p>
          )}
        </>
      )}
    </section>
  );
}

export default Comments;
