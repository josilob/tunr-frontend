import React from 'react';
import './App.css';
import Header from './Header.js';
import { Route, Link, Switch } from "react-router-dom";
import Form from './Form'
import Display from './Display'
import {BrowserRouter as Router} from 'react-router-dom';

function App() {
  const url = "https://tunr-backend-alex-t1.herokuapp.com/"

  const [songData, setSongData] = React.useState([])

  const emptySong = {
    title: "",
    artist: "",
    time: ""
  };

  const [selectedSong, setSelectedSong] = React.useState(emptySong)

  //fetch songs
  const getSongs =() => {
    fetch(url + "/songs/")
    .then(response => response.json())
    .then(data=>{
      setSongData(data)
    })
  }

  //get songs on page load
  React.useEffect(() => {
    getSongs()
  }, [])

  //create songs
  const handleCreate = (newSong) => {
    fetch(url + "/songs/", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newSong)
    })
    .then(response => getSongs())
  }

  //update songs
  const handleUpdate = (song) => {
    fetch(url + "/songs/" + song._id, {
      method: "put",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(song)
    })
    .then(response => getSongs())
  }

  //select song
  const selectSong = (song) => {
    setSelectedSong(song)
  }

  //delete song
  const deleteSong = (song) => {
    fetch(url ="/songs/" + song._id, {
      method: "delete",
    })
    .then((response)=>getSongs())
  }
  
  return (
    <Router>
    <div className="App">    
     <Header />
      <h3>ADD A NEW Song</h3>
      <main>
        <Switch>
          <Route exact path="/" render={(rp) => (<Display {...rp} songs={songData} selectSong={selectSong} deleteSong={deleteSong}/>)} />
          <Route
            exact
            path="/create"
            render={(rp) => (
              <Form {...rp} label="create" song={emptySong} handleSubmit={handleCreate} />
            )}
          />
          <Route
            exact
            path="/edit"
            render={(rp) => (
              <Form {...rp} label="update" song={selectedSong} handleSubmit={handleUpdate} />
            )}
          />
        </Switch>
        <Link to="/create">
        <button>ADD NEW SONG</button>
      </Link>
      </main>
    </div>
    </Router>
  );
}
export default App;
