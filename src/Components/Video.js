import React from 'react'
import YouTube from 'react-youtube'


function Video(props) {

    const { id } = props.match.params
    console.log(id)

    // Write function that takes and makes comments

    return (
        <div>
            <YouTube videoId={id} />
        </div>
    )
}

export default Video