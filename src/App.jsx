
import './App.css';
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import Input from './components/Input';
import List from './components/List';
import Game from './components/Game';
import Fail from './components/Fail';

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/">
          <Input/>
          <List/>
        </Route>
        <Route path="/game">
          <Game/>
        </Route>
        <Route path="/fail">
          <Fail />
        </Route>
      </Router>
      
    </div>
  );
}

export default App;
