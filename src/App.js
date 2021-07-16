
import './App.css';
import { Login } from './components/Login';
import { MyStudents } from './components/MyStudents';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './components/Dashboard';
import StudentPage from './components/StudentPage';
import StudentAnswer from './components/StudentAnswer';


function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Login} />
        
        <PrivateRoute path="/mystudents" component={MyStudents} />
        <PrivateRoute path="/dashboard/:session" component={Dashboard} />
        <Route exact path= "/student/:id/:session" component= {StudentPage} />
        <Route exact path= "/student/answers" component= {StudentAnswer} />
      </Switch>
     
    </div>
  );
}

export default App;
