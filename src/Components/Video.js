import React from 'react'
import YouTube from 'react-youtube'

function Video(props) {
	const { id } = props.match.params
	
	return (
		<div>
			<button >Back</button>
			<YouTube videoId={id} />
		</div>
	)
}

export default Video


