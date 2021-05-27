import React from 'react'
import './About.css'
import GitHubIcon from '@material-ui/icons/GitHub'

const About = () => {
	return (
		<div className='About'>
			<div>
				<h2>Description</h2>
				<p>
					Youtube API application created by two great developers!
					<br />
					Enjoy the app. Feel free to contact us about any suggestions for future
					implementations.
					<br />
					We can be reached at our GitHubs linked below.
				</p>
				<hr />
			</div>
			<div>
				<h3>Ivan Castillo</h3>
				<p>
					Full Stack Web Developer.
				</p>
				<p>
					Penchant for long workouts along the beach and old-school video game music.
				</p>
				<GitHubIcon
					onClick={() => window.open('https://github.com/IvanCastillo1986')}
					style={{ color: '#2ED2E6', cursor: 'pointer' }}
				/>
			</div>
			<div>
				<h3>Esay Hernandez</h3>
				<p>Full Stack Web Dev</p>
				<p>
					When I'm not building apps like this one you can find me planning my next road trip
					or hiking up a mountain.
				</p>
				<GitHubIcon
					onClick={() => window.open('https://github.com/esayh')}
					style={{ color: '#2ED2E6', cursor: 'pointer' }}
				/>
			</div>
		</div>
	)
}

export default About
