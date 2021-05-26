import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './Home.css'

// For every video in videos returned by the search result:
	// Write a function that takes video ID and GETs video data response from the api
	// For each video id submitted, we should get:
		// 	video channel logo
		// 	video rating
		// 	how many years uploaded


class Home extends Component {
	constructor() {
		super()
		this.state = {
			searchVideos: '',
			videos: [],
			number: '',
			toggleWelcome: true
		}
	}

	handleSubmit = async (event) => {
		event.preventDefault()
		const credentials = process.env.REACT_APP_API_KEY
		const ytsearch = this.state.searchVideos

		try {
			const { data } = await axios.get(
				`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&key=${credentials}&type=video&q=${ytsearch}`
			)
			console.log(data)
			this.setState({
				videos: data.items,
				searchVideos: '',
			})
		} catch (error) {
			this.setState({
				videos: [],
				searchVideos: '',
			})
		}
	}

	handleChange = (e) => {
		this.setState({
			searchVideos: e.target.value,
		})
	}

	render() {
		const { videos, searchVideos } = this.state
		const allVids = videos.map((vid) => {

			return (
            <Link to={`/videos/${vid.id.videoId}`} key={vid.id.videoId}>
				{/* <li> */}
				<div>
					<img src={vid.snippet.thumbnails.medium.url} alt={vid.snippet.description} />
					<div>
						<h3>{vid.snippet.title}</h3>
						<p>{vid.snippet.description}</p>
					</div>
				</div>
				{/* </li> */}
            </Link>
			)
		})
		return (
			<div className='home'>
				<h2>Search for Videos</h2>
				<form action='' onSubmit={this.handleSubmit}>
					<input
						type='text'
						placeholder='search video'
						onChange={this.handleChange}
						value={searchVideos}
					/>
					<input type="number" name="" id="" />
					<button>Submit</button>
				</form>
				{allVids}
			</div>
		)
	}
}

export default Home
