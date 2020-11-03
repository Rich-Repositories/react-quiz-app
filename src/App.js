import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Quiz from './components/game/Quiz'
import Summary from './components/game/Summary'

function App() {
  return (
    <Router>
      <Route path={'/'} exact component={Home}></Route>
      <Route path={'/quiz'} component={Quiz}></Route>
      <Route path={'/summary'} component={Summary}></Route>

    </Router>
  );
}

export default App;