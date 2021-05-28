import axios from 'axios'
import React from 'react'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt'
import YouTube from 'react-youtube'
import './Video.css'

class Video extends React.Component {

    constructor(props) {    // Called props into constructor so that we can retrieve id inside the constructor
        super()
        this.state = {
            videoId: props.match.params.id,
            video: {},
            channel: {},
			width: window.innerWidth
        }
    }
    componentDidMount() {
        console.log('componentDidMount')
        this.getVideoDetails()
		
		window.addEventListener('resize', () => {
			this.getWidth()
		})
    }

	getWidth = () => {
		this.setState({
			width: window.innerWidth
		})
	}
    getVideoDetails = async () => { // This function gets both video AND channel data
        const { videoId } = this.state

        try {
            const video = await axios.get(`https://youtube.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet,contentDetails,statistics&key=${process.env.REACT_APP_API_KEY}`)
            .then(response => response.data.items[0])
            const channel = await axios.get(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${video.snippet.channelId}&key=${process.env.REACT_APP_API_KEY}`)
            .then(response => response.data.items[0])
			
			this.setState({
				video: video,
				channel: channel
			})
        }
        catch (e) {
            console.log('Video could not be found')
        }
    }
    
	goBack = () => {
		this.props.history.goBack()
	}
	// Write function that takes and makes comments
	// Make a panel aside for related videos. Maybe another component?

	render() {
		const { videoId, video, channel, width } = this.state

		let opts = {
			width: '960',
			height: '585'
		}
		if (width < 1150 && width > 815) {	//default size
			opts = {
				width: '640',
				height: '390'
			}
		} else if (width <= 815) {
			opts = {
				width: '320',
				height: '195'
			}
		}

		return (
			<div className='Video'><br />
				<button onClick={this.goBack}>Go back</button>
                <br />

				<div className='Player-wrapper'>
					<YouTube 
						videoId={videoId}
						opts={opts}
					/>
				</div>

				<div>
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
				<hr />
				<div className='ChannelDetails'>
                    {channel.snippet ? <img src={channel.snippet.thumbnails.default.url} alt='channel logo'/> : <p>Channel Logo</p> }
					<div>
						{video.snippet ? <p>{video.snippet.channelTitle} Channel</p> : null}
                    	{channel.statistics ? <p>{Number(channel.statistics.subscriberCount).toLocaleString()} subscribers</p> : null}
					</div>
				</div>
				{video.snippet ? <p className='Description'>{video.snippet.description}</p> : null}
			</div>
		)
	}
}

export default Video
