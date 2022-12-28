import React, { useEffect, useState } from 'react';

import Comment from './components/Comment';
import TextArea from './components/TextArea';

import data from './data.json';

function App() {
  // useState hook to keep comments and replies updated
  const [comments, setComments] = useState([]);

  // Initialize comments, sort by highest score descending
  useEffect(() => {
    // Check for localStorage first, if nothing then use json file
    const localData = localStorage.getItem('comments');

    (localData !== '[]') ? setComments(JSON.parse(localData)) : setComments(data.comments.sort((a, b) => (a.score < b.score) ? 1 : -1));

  }, []);

  // Every time our comments state changes, sort by score descending
  useEffect(() => {
    comments.sort((a, b) => (a.score < b.score) ? 1 : -1);
    localStorage.setItem('comments', JSON.stringify(comments));
  }, [comments]);

  return (
    <main className="app">
      {comments && comments.map(comment => {
        return (
          <Comment
            key={comment.id}
            id={comment.id}
            content={comment.content}
            createdAt={comment.createdAt}
            score={comment.score}
            user={comment.user}
            currentUser={data.currentUser}
            parentComment={comment}
            comments={comments}
            setComments={setComments}
            replies={comment.replies}
          />
        );
      })}
      <TextArea
        currentUser={data.currentUser}
        comments={comments}
        setComments={setComments}
      />
    </main>
  );
}

export default App;
