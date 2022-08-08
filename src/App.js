import './App.css';
import Nav from "./components/Nav";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import AdminDashboard from "./components/AdminDashboard";
import AllVenues from "./components/allVenues";
import EditVenue from "./components/editVenue";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { store, persistor } from './store/store';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} >
        <Router>
          <div className="App">
            {console.log(store.getState())}
            {
              store.getState().auth.isAuthenticated ? <Nav hideLogin={true}></Nav> : <Nav hideLogin={false}></Nav>
            }
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/login" exact component={Login} />
              <Route path="/register" exact component={Register} />
              <Route path="/admin" exact component={AdminDashboard} />
              <Route path="/allvenues" exact component={AllVenues}/>
              <Route path="/edit" exact component={EditVenue}/>
            </Switch>
          </div>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
