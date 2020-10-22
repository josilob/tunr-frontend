import React, { Link } from 'react';
const Playlist = (props) => {
	const loaded = () => {
		const JSX = props.songs.map((song) => {
			const favSongJSX = song.fav ? <span color='red'>Fav</span> : <></>;
			return (
				<article>
					<p>
						{song.title} , {song.artist}, {song.time}
						&nbsp;&nbsp;
						<button
							onClick={() => {
								props.deleteSong(song);
							}}>
							X
						</button>
						{favSongJSX} &nbsp;&nbsp;
						<button
							onClick={() => {
								props.selectSong(song);
								props.history.push('/edit');
							}}>
							Edit
						</button>
					</p>
				</article>
			);
		});

		return <div>{JSX}</div>;
	};

	return props.songs && props.songs.length > 0 ? loaded() : <h1>Loading...</h1>;
};
export default Playlist;
