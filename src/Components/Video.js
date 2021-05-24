import axios from 'axios'
import React from 'react'
import YouTube from 'react-youtube'


class Video extends React.Component {

    constructor(props) {    // Called props into constructor so that we can retrieve id inside the constructor
        super()
        this.state = {
            id: props.match.params.id,
            video: {}
        }
    }
    componentDidMount() {
        this.getVideoDetails()
        console.log('componentDidMount')
    }

    getVideoDetails = async () => { // This function should get video data so that we may display it under video
        const { id, video } = this.state
        const { data } = await axios.get(`https://youtube.googleapis.com/youtube/v3/videos?id=${id}&part=snippet,contentDetails,statistics&key=${process.env.REACT_APP_API_KEY}`)
        
        this.setState({
            video: data.items[0]
        })
    }
    // Write function that takes and makes comments
    

    render() {
        const { id, video } = this.state
        console.log('render')
        try {
            console.log(video.snippet.title)
        }
        catch(error) {
            console.log('could not print video.title')
        }

            return (
                <div>
                    <YouTube videoId={id} />
                    {/* <h2>{video.snippet.title}</h2> */}
                </div>
            )
    }

}

export default Video

