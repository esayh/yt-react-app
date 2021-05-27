import axios from 'axios'
import React from 'react'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt'
import YouTube from 'react-youtube'

class Video extends React.Component {

    constructor(props) {    // Called props into constructor so that we can retrieve id inside the constructor
        super()
        this.state = {
            videoId: props.match.params.id,
            video: {},
            channel: {}
        }
    }
    componentDidMount() {
        console.log('componentDidMount')
        this.getVideoDetails()
    }

    getVideoDetails = async () => { // This function gets both video AND channel data
        const { videoId } = this.state

        try {
            await axios.get(`https://youtube.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet,contentDetails,statistics&key=${process.env.REACT_APP_API_KEY}`)
            .then(response => response.data.items[0])
            .then(async response => {
                let channel = await axios.get(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${response.snippet.channelId}&key=${process.env.REACT_APP_API_KEY}`)
                console.log(response)
                console.log(channel.data)
                this.setState({
                    video: response,
                    channel: channel.data.items[0]
                })
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
		const { videoId, video, channel } = this.state

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
				<div className='ChannelDetails'>
					{/* Channel logo, Channel name */}
                    {channel.snippet ? <img src={channel.snippet.thumbnails.default.url} alt='channel logo'/> : <p>Channel Logo</p> }
					{video.snippet ? <p>{video.snippet.channelTitle} Channel</p> : null}
					{/*channel subscribers*/}
                    {channel.statistics ? (
                        <p>{Number(channel.statistics.subscriberCount).toLocaleString()}</p>
                    ) : null}
					{/* Description */}
					{video.snippet ? <p>{video.snippet.description}</p> : null}
				</div>
			</div>
		)
	}
}

export default Video
