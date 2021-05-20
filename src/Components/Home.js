import React, { Component } from 'react'
import './Home.css'


class Home extends Component {
state = {
   videos: [],
   searchVideos: '' 
}

	render() {
		return (
			<div className='home'>
				<h2>Search for Videos</h2>
				<form action=''>
					<input type='text' placeholder='search video' />
					<button>Submit</button>
					<h3>No Videos</h3>
				</form>
			</div>
		)
	}
}

export default Home
