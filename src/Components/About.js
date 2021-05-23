import React from 'react'
import './About.css'


const About = () => {
   return (
      <div className='About'>
         <div>
            <h2>Description</h2>
            <p>Youtube API created by two great developers!<br />
            Enjoy the app. Feel free to contact us about any suggestions for future implementations.<br />
            We can be reached at our GitHubs linked below.</p>
         </div>
         <div>
            <h3>Ivan Castillo</h3>
            <p>Full Stack Web Developer.<br />
            Penchant for long workouts along the beach and old-school video game music.</p>
            <a href="https://github.com/IvanCastillo1986">GitHub</a>
         </div>
         <div>
            <h3>Esay Hernandez</h3>
            <p>Front-end Web Dev</p>
            {/* Github link */}
         </div>
      </div>
   )
}

export default About