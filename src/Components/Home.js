import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './Home.css'



class Home extends Component {
	constructor() {
		super()
		this.state = {
			searchVideos: '',
			videos: [],
			numberOfResults: 6,
			showVid: false 
		}
	}

	handleSubmit = async (event) => {
		event.preventDefault()
		const credentials = process.env.REACT_APP_API_KEY
		const ytsearch = this.state.searchVideos
		const { numberOfResults } = this.state

		try {
			const { data } = await axios.get(
				`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=8&key=${credentials}&type=video&q=${ytsearch}&maxResults=${numberOfResults}`
			)
			this.setState({
				videos: data.items,
				searchVideos: '',
				showVid : true
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
	handleNumbers = (e) => {
		this.setState({
			numberOfResults: e.target.value
		})
	}

	render() {
		const { videos, searchVideos } = this.state
		const allVids = videos.map((vid) => {
			return (
				<Link to={`/videos/${vid.id.videoId}`} key={vid.id.videoId}>
					<div className='Info'>
						<img src={vid.snippet.thumbnails.medium.url} alt={vid.snippet.description} />
						<div>
							<h3>{vid.snippet.title}</h3>
							<p className='Description'>{vid.snippet.description}</p>
						</div>
					</div>
				</Link>
			)
		})
		return (
			<div className='home'>
				<h2>Search for Videos</h2>
				<form action='' onSubmit={this.handleSubmit}>
					<input
						type='text'
						placeholder='Search Video'
						onChange={this.handleChange}
						value={searchVideos}
					/>
					<br />
					<p>
						<label htmlFor="numOfResults">How many results? </label> 
						<input 
							onChange={this.handleNumbers} 
							type="number" 
							placeholder='6' 
							name="numOfResults" 
						/>
					</p>
					<br />
					<button>Search</button>
				</form>
				{this.state.showVid ? allVids : 'No Videos'}
			</div>
		)
	}
}

export default Home
