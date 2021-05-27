import axios from 'axios'
import React from 'react'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt'
import YouTube from 'react-youtube'

class Video extends React.Component {
	constructor(props) {
		// Called props into constructor so that we can retrieve id inside the constructor
		super()
		this.state = {
			videoId: props.match.params.id,
			video: {},
			channelId: '',
			channel: {},
		}
	}
	componentDidMount() {
		this.getVideoDetails()
		// this.getChannelDetails()
	}

	getVideoDetails = async () => {
		const { videoId } = this.state

		try {
			const { data } = await axios.get(
				`https://youtube.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet,contentDetails,statistics&key=${process.env.REACT_APP_API_KEY}`
			)
			this.setState({
				video: data.items[0],
				channelId: data.items[0].snippet.channelId,
			})
		} catch (e) {
			console.log(e, 'Video could not be found')
		}
	}
	getChannelDetails = async () => {
		const { channelId } = this.state
		console.log(channelId)
		// const { data } = await axios.get(`https://youtube.googleapis.com/youtube/v3/channels?id=${channelId}&part=snippet&key=${process.env.REACT_APP_API_KEY}`)
		try {
			const { data } = await axios.get(
				`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelId}&key=${process.env.REACT_APP_API_KEY}`
			)
			console.log(data.items[0])
		} catch {
			console.log('could not find channel')
		}
	}

	goBack = () => {
		this.props.history.goBack()
	}
	// Write function that takes and makes comments
	// Make a panel aside for related videos. Maybe another component?

	render() {
		const { videoId, video } = this.state
		try {
			console.log(video.snippet.title)
		} catch (e) {
			console.log(e, 'Video could not be found')
		}

		return (
			<div className='Video'><br />
				<button onClick={this.goBack}>Go back</button>
                <br />
				<YouTube videoId={videoId} />
				<div>
					{/* This div is for the  */}
					{video.snippet ? <h2>{video.snippet.title}</h2> : null}
					{video.statistics ? (
						<span>
							<p>{Number(video.statistics.viewCount).toLocaleString()} views</p>
						</span>
					) : null}
					{video.statistics ? (
						<span>
							<p>
								<ThumbUpAltIcon fontSize='small' />{' '}
								{Number(video.statistics.likeCount).toLocaleString()} |{' '}
								<ThumbDownAltIcon fontSize='small' />{' '}
								{Number(video.statistics.dislikeCount).toLocaleString()}{' '}
							</p>
						</span>
					) : null}
				</div>
				<div>
					{/* Channel logo, Channel name */}
					{video.snippet ? <p>{video.snippet.channelTitle} Channel</p> : null}
					{/*channel subscribers*/}
					{/* Description */}
					{video.statistics ? video.snippet.description : null}
				</div>
			</div>
		)
	}
}

export default Video
