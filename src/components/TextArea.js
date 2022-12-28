import React, { useRef } from 'react';

const TextArea = (props) => {
  const {id, currentUser, parentId, parentUserName, comments, setComments, replies, isReplying, setIsReplying, margin} = props;
  const IMAGE = currentUser.image.webp || currentUser.image.png;

  const commentRef = useRef(null);

  // Next time: Overcomplicated, could have just been a counter that never decreases.
  const getLastId = () => {
    // Go through each comment and check each id for highest
    // ONLY HAVE TO LOOK AT THE LAST REPLY
    let lastId = comments[0].id;
    comments.forEach(comment => {
      if ((comment.replies.length === 0 && comment.id > lastId)) { // If replies is empty and id is larger, set lastId
        lastId = comment.id;
      }
      else if (comment.replies.length > 0 && comment.replies[comment.replies.length - 1].id > lastId) { // If comment has replies and the last reply's id is greater than lastId, set lastId
        lastId = comment.replies[comment.replies.length - 1].id;
      }
    });
    return lastId;
  }

  const newComment = () => {
    const newComment = {
      id: getLastId() + 1,
      content: commentRef.current.value,
      createdAt: "now",
      score: 0,
      user: currentUser,
      replies: []
    }
    setComments(comments => [...comments, newComment]);
    commentRef.current.value = "";
  }

  const removeFirstWord = () => {
    // Get rid of the replyingTo @ from the ref, otherwise it will keep duplicating the parent's username in the reply content. Split using empty space, then remove the first word
    const indexOfSpace = commentRef.current.value.indexOf(' ');

    if (indexOfSpace === -1) {
      return '';
    }

    commentRef.current.value = commentRef.current.value.substring(indexOfSpace + 1);
  }

  const newReply = () => {
    removeFirstWord();

    const newReply = {
      id: getLastId() + 1,
      content: commentRef.current.value,
      createdAt: "now",
      score: 0,
      replyingTo: parentUserName,
      user: currentUser
    }
    // Access parent comment, and append to replies list, set comments, empty out commentRef, set isReplying to false
    replies.push(newReply);

    // Check to see if it is a comment or reply
    const comment = comments.filter(comment => id === comment.id);
    if (comment.length !== 0) { // Is a normal comment
      setComments(comments.map(comment => {
        if (comment.id === parentId) {
          return {...comment, replies: replies};
        }
        return comment;
      }));
    }
    else {  // Is a reply
      // Map all the existing comments to a new array while changing the parent comment's replies array with the new filtered out array and set update state
      const newComments = comments.map(comment => {
        if (parentId === comment.id) {
          return{...comment, replies: replies}
        }
        return comment;
      });
      
      setComments(newComments);
    }

    commentRef.current.value = "";
    setIsReplying(false);
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();
    !isReplying ? newComment()
    : newReply();
  }

  return (
    <form className={`textarea-container ${margin}`} onSubmit={handleOnSubmit}>
      <img className="profile-pic" src={IMAGE} alt="profile headshot" />
      <textarea ref={commentRef} defaultValue={isReplying ? "@" + parentUserName + " " : ""} placeholder="Add a comment..."></textarea>
      <button type="submit" className="textarea-btn">{!isReplying ? "SEND" : "REPLY"}</button>
    </form>
  );
}

export default TextArea;
