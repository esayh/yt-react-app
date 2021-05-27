import { Switch, Route } from 'react-router-dom'
import NavBar from './Components/NavBar';
import Home from './Components/Home'
import About from './Components/About'
import Video from './Components/Video'
import './App.css';

function App() {
  return (
    <div className="App">
      <NavBar />
      <main>
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
