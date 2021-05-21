import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './Home.css'

class Home extends Component {
	constructor() {
		super()
		this.state = {
			videos: [],
			searchVideos: '',
		}
	}

	handleSubmit = async (e) => {
		e.preventDefault()
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
		} catch (e) {
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
				<li>
					<h2>{vid.snippet.title}</h2>
					<img src={vid.snippet.thumbnails.medium.url} alt={vid.snippet.description} />
				</li>
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
					<button>Submit</button>
					<h3>No Videos</h3>
				</form>
				<ul>{allVids}</ul>
			</div>
		)
	}
}

export default Home
