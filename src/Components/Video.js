import axios from 'axios'
import React from 'react'
import YouTube from 'react-youtube'


class Video extends React.Component {

    constructor(props) {    // Called props into constructor so that we can retrieve id inside the constructor
        super()
        this.state = {
            videoId: props.match.params.id,
            video: {},
            channelId: '',
            channel: {}
        }
    }
    componentDidMount() {
        console.log('componentDidMount')
        this.getVideoDetails()
    }

    getVideoDetails = async () => { // This function should get video data so that we may display it under video
        const { videoId } = this.state

        try {
            const { data } = await axios.get(`https://youtube.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet,contentDetails,statistics&key=${process.env.REACT_APP_API_KEY}`)
            
            const video = data.items[0]
            
            console.log(video)
            // console.log(channel)
            
            this.setState({
                video: data.items[0],
            })
        }
        catch (e) {
            console.log('Video could not be found')
        }
        try {
            const { video } = this.state
            const channelId = video.snippet.channelId
            console.log(channel)
            const { channel } = await axios.get(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelId}&key=${process.env.REACT_APP_API_KEY}`)
        }
        catch (e) {
            console.log('could not get channel')
        }
    }
    getChannelDetails = async () => {
        const { channelId } = this.state
        console.log(channelId)
        // const { data } = await axios.get(`https://youtube.googleapis.com/youtube/v3/channels?id=${channelId}&part=snippet&key=${process.env.REACT_APP_API_KEY}`)
        try {
        const { data } = await axios.get(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelId}&key=${process.env.REACT_APP_API_KEY}`)
        console.log(data.items[0])
        this.setState({
            channel: data
        })
        }
        catch {
            console.log('could not find channel')
        }
    }
    // Make a panel aside for related videos. Maybe another component?
    

    render() {
        const { videoId, video } = this.state
        console.log('render')
        try {
            console.log(video.snippet.title)
        }
        catch(error) {
            console.log('could not print video.title')
        }

            return (
                <div className='Video'>
                    <YouTube videoId={videoId} />
                    <div>
                        {video.snippet ? <h2>{video.snippet.title}</h2> : null}
                        {video.statistics ? <span><p>{Number(video.statistics.viewCount).toLocaleString()} views</p></span> : null}
                        {video.statistics ? <span><p>{Number(video.statistics.likeCount).toLocaleString()} Likes | {Number(video.statistics.dislikeCount).toLocaleString()} Dislikes</p></span> : null}
                    </div>
                    <div>
                        {/* Channel logo, Channel name */}
                        {video.snippet ? <p>{video.snippet.channelTitle} Channel</p> : null}
                        {/*channel subscribers*/}
                        {video.statistics ? video.snippet.description : null}
                    </div>
                </div>
            )
    }

}

export default Video