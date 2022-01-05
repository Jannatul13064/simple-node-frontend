
import './App.css';
import { useEffect, useRef, useState } from 'react';

function App() {
  const [users, setUsers] = useState([]);
  const nameRef = useRef();
  const emailRef = useRef();

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])

  const handleAddUsers = e => {
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const newUser = { name: name, email: email }

    ////Send data to the server-------> In the backend use app.post method ///
    fetch('http://localhost:5000/users', {
      method: 'post',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        const addedUser = data;
        const newUsers = [...users, addedUser];
        setUsers(newUsers);

      })
    emailRef.current.value = '';
    nameRef.current.value = '';

    e.preventDefault();
  }

  return (

    <div className="App">
      <div>
        <h2>Found Users: {users.length}</h2>
        <form onSubmit={handleAddUsers}>
          <input type="text" ref={nameRef} placeholder='Name' />
          <input type="email" ref={emailRef} name="" id="" placeholder='Email' />
          <input type="submit" value="Submit" />
        </form>
        <ul>
          {
            users.map(user => <li key={user.id}>{user.id}: {user.name} Email: {user.email}</li>)
          }
        </ul>
      </div>

    </div>
  );
}

export default App;
