import { useSelector } from 'react-redux';
import {Route,Redirect} from 'react-router-dom'


export default function PrivateRoute({ children, ...rest }) {
    
    let user = useSelector(state => state.login.user)
// console.log("user frl  ",user)
    return (
      <Route
        {...rest}
        render={({ location }) =>
        
         user.email !== ""  ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }