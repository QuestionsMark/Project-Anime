import React, { useEffect, useState } from 'react';

function App() {

  const [response, setResponse] = useState('');

  const callAPI = () => {
    // https://question-mark-project-anime.herokuapp.com

    fetch('https://question-mark-project-anime.herokuapp.com', {
      method: 'GET'
    })
      .then(res => res.text())
      .then(res => {
        setResponse(res);
      })
  }

  useEffect(() => {
    callAPI();
  }, []);

  return (
    <>
      <h1>Do dzieła!</h1>
      <h2>{response}</h2>
    </>
  );
}

export default App;
