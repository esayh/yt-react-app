import { Switch, Route } from 'react-router-dom'
import NavBar from './Components/NavBar';
import Home from './Components/Home'
import About from './Components/About'
import Video from './Components/Video'
import './App.css';

/*
This is a minor stylistic comment -- consider using the same declaration style
for all of your functional components, either regular functions as demonstrated here, or
arrow functions as demonstrated in all of your other functional components, e.g. NavBar.js
Maintaining a consistent style is a hallmark of well written production code, which includes
other aspects that I've noticed you are doing well, such as consistent indentation
and formatting.
*/
function App() {
  return (
    <div className="App">
      <NavBar />
      <main>
        /* Well done using react-route-dom to handle each view as a separate route 
        */
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/about' component={About} />
          <Route path='/videos/:id' component={Video} />
        </Switch>
      </main>
    </div>
  );
}

export default App;
