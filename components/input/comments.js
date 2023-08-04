import { useEffect, useState, useContext } from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";
import NotificationContext from "../../store/notification-context";

function Comments(props) {
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [isFetchingComments, setIsFetchingComments] = useState(false);
  const notificationCtx = useContext(NotificationContext);

  useEffect(() => {
    if (showComments) {
      setIsFetchingComments(true);
      fetch(`/api/comments/${eventId}`)
        .then((res) => {
          if (res.ok) {
            return res.json();
          }

          return res.json().then((data) => {
            throw new Error(data.message || "Something went wrong");
          });
        })
        .then((data) => {
          setComments(data.comments);
          setIsFetchingComments(false);
        })
        .catch((err) => {
          res.json(err.message);
          setIsFetchingComments(false);
        });
    }
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);

    if (!showComments) {
    }
  }

  function addCommentHandler(commentData) {
    notificationCtx.showNotification({
      title: "Please wait...",
      message: "Submitting your comment...",
      status: "pending",
    });

    fetch("/api/comments/" + eventId, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        return response.json().then((data) => {
          throw new Error(
            data.message || "Your comment could not be submitted."
          );
        });
      })
      .then((data) => {
        comments.push(commentData);
        notificationCtx.showNotification({
          title: "Success",
          message: "Successfully submitted your comment",
          status: "success",
        });
      })
      .catch((err) =>
        notificationCtx.showNotification({
          title: "Error!",
          message: err.message || "Your comment could not be submitted!",
          status: "error",
        })
      );
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !isFetchingComments && <CommentList items={comments} />}
      {showComments && isFetchingComments && <p>Loading...</p>}
    </section>
  );
}

export default Comments;
