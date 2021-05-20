import { Switch, Route } from 'react-router-dom'
import NavBar from './Components/NavBar';
import Home from './Components/Home'
import About from './Components/About'
import './App.css';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Switch>
      <Route exact path={'/'} component={Home} />
      <Route path={'/about'} component={About}/>
      </Switch>
    </div>
  );
}

export default App;
