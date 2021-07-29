
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Input from './components/Input';
import List from './components/List';

function App() {
  return (
    <div className="App">
      <Router>
      <Route exact path="/">
          <Input/>
          <List/>
        </Route>
      </Router>
    </div>
  );
}

export default App;
