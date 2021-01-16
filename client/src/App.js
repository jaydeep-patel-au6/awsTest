import React, { useEffect, createContext,useReducer,useContext } from "react";
import NavBar from "./components/Navbar";
import Home from "./components/screens/Home";
import Signin from "./components/screens/SignIn";
import Profile from "./components/screens/Profile";
import Signup from "./components/screens/Signup"; 
import UserProfile from "./components/screens/UserProfile";
import ScrapRequest1 from './components/screens/ScrapRequest'
import AdminData from './components/Admin/admin_Data'
import ScrapStatus from './components/screens/ScrapData'
import { BrowserRouter, Switch, Route, Link,useHistory } from "react-router-dom";
import CretePost from "./components/screens/CreatePost";
import { reducer, initialState } from './reducers/userReducer'
import "./App.css";
import Reset from './components/screens/Reset'
import NewPassword from './components/screens/NewPassword'

//shopping cart
import Shopping from './ShoppingCart/Components/Home'


//Creating context
export var UserContext = createContext();

var Routing = () => {

  var history=useHistory()
  var {state,dispatch}=useContext(UserContext)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
    }else{
      if(!history.location.pathname.startsWith('/reset'))
           history.push('/signin')
    }
  },[])
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/signin">
        <Signin />
      </Route>
      <Route exact path="/profile">
        <Profile />
      </Route>
      <Route exact path="/signup">
        <Signup />
      </Route>
      <Route exact path="/create">
        <CretePost />
      </Route>
      <Route exact path="/profile/:userid">
        <UserProfile />
      </Route>
      <Route exact path="/scrapRequest">
        <ScrapRequest1 />
      </Route>
      <Route exact path="/adminData">
        <AdminData />
      </Route>
      <Route exact path="/ScrapDetails">
        <ScrapStatus />
      </Route>
      <Route exact path="/shopping">
        <Shopping/>
      </Route>
      <Route exact path="/reset">
        <Reset/>
      </Route>
      <Route path="/reset/:token">
        <NewPassword />
      </Route>
    </Switch>
  );
};

function App() {
  var [state,dispatch]=useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
      <NavBar />
      <Routing/>
    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
