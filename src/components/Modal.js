const Modal = (props) => {
  const {id, parentId, comments, setComments} = props;

  const handleClickCancel = () => {
    document.querySelector(`#mc${id}`).classList.toggle('hidden');
  }

  const handleClickDelete = () => {
    // Search for the specific id to toggle the right modal
    document.querySelector(`#mc${id}`).classList.toggle('hidden');
    
    // Already have id of the reply
    // Already have id of the parent
      // Access the array of replies and filter it out

    // Check to see if it is a comment or reply
    const comment = comments.filter(comment => id === comment.id);
    if (comment.length !== 0) { // Is a normal comment
      setComments(comments.filter(comment => comment.id !== id));
    }
    else {  // Is a reply
      // Have access to the parent comment to be able to read in and edit it's replies property
      const parentComment = comments.filter(comment => parentId === comment.id);
      const replies = parentComment[0].replies.filter(reply => reply.id !== id);

      // Map all the existing comments to a new array while changing the parent comment's replies array with the new filtered out array and set update state
      const newComments = comments.map(comment => {
        if (parentId === comment.id) {
          return{...comment, replies: replies}
        }
        return comment;
      });
      
      setComments(newComments);
    }
  }

  return (
  <div className="modal">
    <div className="modal-item">Delete comment</div>
    <p className="modal-item">Are you sure you want to delete this comment? This will remove the comment and cannot be undone.</p>
    <button onClick={handleClickCancel} className="modal-item">NO, CANCEL</button>
    <button onClick={handleClickDelete} className="modal-item">YES, DELETE</button>
  </div>
  );
}

export default Modal;
