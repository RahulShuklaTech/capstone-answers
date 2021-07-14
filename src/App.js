
import './App.css';
import { Login } from './components/Login';
import { MyStudents } from './components/MyStudents';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';


function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Login} />
        
        <PrivateRoute path="/mystudents" component={MyStudents} />
      </Switch>
     
    </div>
  );
}

export default App;
