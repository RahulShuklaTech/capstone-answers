
import './App.css';
import { Login } from './components/Login';
import { MyStudents } from './components/MyStudents';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './components/Dashboard';


function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Login} />
        
        <PrivateRoute path="/mystudents" component={MyStudents} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
      </Switch>
     
    </div>
  );
}

export default App;
