import React, { useState, useRef } from 'react';

import REPLY from '../images/icon-reply.svg';
import DELETE from '../images/icon-delete.svg';
import EDIT from '../images/icon-edit.svg';

import Reply from './Reply';
import Modal from './Modal';
import TextArea from './TextArea';

const Comment = (props) => {
  const {id, content, createdAt, score, user, currentUser, comments, setComments, replies} = props;
  const IMAGE = user.image.webp || user.image.png;
  // Render elements depending on if it's the user
  const isSameUser = (currentUser.username === user.username);

  // scoreRef to keep track of score, useState to keep page rendered and updated.
  // addRef and subRef to change pointer events for score
  const [commentScore, setCommentScore] = useState(score);
  const [isEditing, setIsEditing] = useState(false);
  const [isReplying, setIsReplying] =  useState(false);
  
  const scoreRef = useRef(commentScore);
  const addRef = useRef(null);
  const subRef = useRef(null);
  const contentRef = useRef(content);

  // TODO: Persisted score through local storage can still be updated by the same user(i.e. user can keep upvoting or downvoting if they keep refreshing)
  // *May be easier if we added an extra property to each object in the JSON file that tells whether or not the score has been increased or decreased already by the signed in user
  // Although, it may be possible to be done if we created another localStorage object to hold a key pair value with each comment's id and a string value to tell when it was higher or lower than it's original.
  // Get comment from json file and compare scores
    // Do things if equal
    // Otherwise do things if >
    // Otherwise do things if <

  const handleClickScore = (e) => {
    // Make the button unclickable and can only be +-1 of the initial score
    if (scoreRef.current === score) {
      e.currentTarget.classList.toggle('pointer-events-none');
    }
    if (e.target.firstChild.textContent === "Plus") {
      scoreRef.current += 1;
      if (subRef.current.classList.contains('pointer-events-none')) {
        subRef.current.classList.toggle('pointer-events-none');
      }
    }
    else if (e.target.firstChild.textContent === "Minus") {
      scoreRef.current -= 1;
      if (addRef.current.classList.contains('pointer-events-none')) {
        addRef.current.classList.toggle('pointer-events-none');
      }
    }


    setCommentScore(scoreRef.current);

    //Store score in comments
    setComments(comments.map(comment => {
      if (id === comment.id) {
        return {...comment, score: scoreRef.current};
      }
      else {
        return comment;
      }
    }));
  }

  const handleClickDelete = () => {
    document.querySelector(`#mc${id}`).classList.toggle('hidden');
  }

  const handleClickReply = () => {
    setIsReplying(!isReplying);
  }

  const handleClickEdit = (e) => {
    // Use state to change whether a comment is being edited or not, use ternary operator to change between <textarea> and <p>
    // Maybe have to give html id's to each comment and reply container to append inside of them
    setIsEditing(!isEditing);
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setIsEditing(!isEditing);
    // Want to setComments to update the text
    setComments(comments.map(comment => {
      if (comment.id === id) {
        // Edit this comment
        return {...comment, content: contentRef.current.value}
      }
      return comment;
    }))
  }

  // If I wanted to do the dynamic timestap bonus challenge:
    // Get the initial date of when a comment was posted, would maybe have to simulate and edit the JSON file?
    // Get the current date
    // Subtract the two dates and depending on how long it was, add the appropriate string suffixes

  return(
    <div className="comment-container">
      <div className="comment">
        <div className="author">
          <img className="profile-pic" src={IMAGE} alt="profile headshot"/>
          <div className="name">{user.username}</div>
          {isSameUser ? <div className="you">you</div> : ""}
          <div className="created">{createdAt}</div>
        </div>
        {!isEditing ? <p className="content">{content}</p> 
        : <form className="form-edit" onSubmit={handleOnSubmit}>
            <textarea ref={contentRef} defaultValue={content}/>
            <button className="form-edit-btn">UPDATE</button>
          </form>
        }
        <div className="score-container">
          <button className='group icon-btn p-1' ref={addRef} onClick={handleClickScore}><svg className="icon" width="11" height="11" fill="#C5C6EF" xmlns="http://www.w3.org/2000/svg"><title>Plus</title><path d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"/></svg></button>
          <div className="score">{commentScore} </div>
          <button className='group icon-btn' ref={subRef} onClick={handleClickScore}><svg className='icon' width="11" height="3" fill="#C5C6EF" xmlns="http://www.w3.org/2000/svg"><title>Minus</title><path d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z"/></svg></button>
        </div>
        <div className="controls">
        {isSameUser ? 
          "" :
          <button className="control-container" onClick={handleClickReply}>
            <img src={REPLY} alt="reply" />
            <div className="reply-text">Reply</div>
          </button>}
          {isSameUser ?
          <button className="control-container" onClick={handleClickDelete}>
            <img src={DELETE} alt="delete" />
            <div className="delete-text">Delete</div>
          </button>
          : ""}
          {isSameUser ?
          <button className="control-container" onClick={handleClickEdit}>
            <img src={EDIT} alt="edit" />
            <div className="edit-text">Edit</div>
          </button>
          : ""}
        </div>
      </div>

      {isReplying ? <TextArea 
      currentUser={currentUser}
      parentId={id}
      parentUserName={user.username}
      comments={comments}
      setComments={setComments}
      replies={replies}
      isReplying={true}
      setIsReplying={setIsReplying}
      margin={'mt-4'}/> : ''}

      {replies.length !== 0 ? <div className="replies-list">
        {replies && replies.length !== 0 && replies.map(reply => {
          return (
            <Reply
            key={reply.id}
            id={reply.id}
            parentId={id}
            replyingTo={reply.replyingTo}
            content={reply.content}
            createdAt={reply.createdAt}
            score={reply.score}
            user={reply.user}
            currentUser={currentUser}
            comments={comments}
            setComments={setComments}
            replies={replies}
            />
          );
        })}
      </div> 
      : ""}

      {isSameUser ? <div className='modal-container hidden' id={`mc${id}`}>
          <div className="modal-bg"></div>
          <Modal 
            id={id}
            parentId={null}
            comments={comments}
            setComments={setComments}
          />
        </div>
      : ''}
  </div>
  );
}

export default Comment;
