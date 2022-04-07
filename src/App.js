import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './App.css';
import axios from 'axios';

function App() {
  const [socket, setSocket] = useState(null);
  const [id,setId] = useState(-1);
  useEffect(() => {
    const newSocket = io(`http://localhost:3001`,{ transports : ['websocket'] });
    setSocket(newSocket);
    //return () => newSocket.close();
  }, [setSocket]);

  const enter = (e) =>{
    e.preventDefault()
    const idClient = document.getElementById('id').value;
    setId(parseInt(idClient))
    socket.emit('user-conected',{
        id:parseInt(idClient),
        socket_id: socket.id
    })
  }

  if(socket!== null){
    socket.on("connect", () => {
      socket.on('reaction', (data) =>{
        console.log(data)
      })
    });
  }
  
  const rec_1 = () =>{
    socket.emit('reaction',{
      publication_id: 1,
      reaction_type: 1,
      reaction_userid: id
    })
  }

  const rec_2 = () =>{
    socket.emit('reaction',{
      publication_id: 2,
      reaction_type: 1,
      reaction_userid: id
    })
  }

  const rec_3 = () =>{
    socket.emit('reaction',{
      publication_id: 3,
      reaction_type: 1,
      reaction_userid: id
    })
  }

  const out = async () => {
    if(id !== -1) {
      await axios.get(`http://localhost:3001/users/${id}/disconnected`);
      setId(-1);
    }
  }

  return (
    <div className="App">
      <div className='container'>
        <div>
          <button onClick={rec_1}>Reacción 1</button>
          <button onClick={rec_2}>Reacción 2</button>
          <button onClick={rec_3}>Reacción 3</button>
        </div>
        <div className='login'>
          <form>
            <input id='id' type={'text'} placeholder='id'></input>
            <button onClick={enter}>Ingresar</button>
            <button onClick={out}>Salir</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
