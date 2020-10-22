import React from 'react';
import './App.css';
import Header from './Header.js';
import { Route, Link, Switch } from 'react-router-dom';
import Form from './Form';
import Playlist from './Playlist';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
	const url = 'https://tunr-backend-alex-t1.herokuapp.com';

	const emptySong = {
		title: '',
		artist: '',
		time: '',
	};
	const [songData, setSongData] = React.useState(emptySong);

	const [selectedSong, setSelectedSong] = React.useState(emptySong);

	//fetch songs
	const getSongs = () => {
		fetch(url + '/songs/')
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				setSongData(data);
			});
	};

	//get songs on page load
	React.useEffect(() => {
		getSongs();
	}, []);

	//create songs
	const handleCreate = (newSong) => {
		fetch(url + '/songs/', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newSong),
		}).then((response) => getSongs());
	};

	//update songs
	const handleUpdate = (song) => {
		fetch(url + '/songs/' + song._id, {
			method: 'put',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(song),
		}).then((response) => getSongs());
	};

	//select song
	const selectSong = (song) => {
		setSelectedSong(song);
	};

	//delete song
	const deleteSong = (song) => {
		fetch((url = '/songs/' + song._id), {
			method: 'delete',
		}).then((response) => getSongs());
	};

	return (
		<Router>
			<div className='App'>
				<Header />

				<h3>ADD A NEW Song</h3>
				<main>
					<Switch>
						<Route
							exact
							path='/'
							render={(rp) => (
								<div>
									<Playlist
										songs={songData}
										deleteSong={deleteSong}
										selectSong={selectSong}
									/>
									<Form
										{...rp}
										label='Add New Song'
										song={emptySong}
										handleSubmit={handleCreate}
									/>
								</div>
							)}
						/>
						<Route
							exact
							path='/edit'
							render={(rp) => (
								<Form
									{...rp}
									label='Save'
									song={selectedSong}
									handleSubmit={handleUpdate}
								/>
							)}
						/>
					</Switch>
				</main>
			</div>
		</Router>
	);
}
export default App;
