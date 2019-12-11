import React, { useState, useEffect } from "react";
import "./App.css";
import Home from "./views/Home";
import { Switch, Route } from "react-router-dom";
import Contact from "./views/Contact";
import Destination from "./views/Destination";
import Login from "./views/Login";
import Register from "./views/register";
import ForgetPass from "./views/ForgetPass";
import RecoverPass from "./views/RecoverPass";
import Adminpage from "./views/Adminpage";
import UpdateTour from "./views/UpdateTour";
import ErrorPage from "./views/ErrorPage"
import TourInfo from "./views/TourInfo";
import ImageTour from "./views/ImageTour";
import CreateTicketExp from "./views/CreateTicketExp";
import UpdateImages from "./views/UpdateImages";

function App() {
  // get from url 
  // get from storage
  const [user, setUser] = useState(null);

  
  const accessToken =
    window.location.search.split("=")[0] === "?api_key"
      ? window.location.search.split("=")[1]
      : null;

  const [token, setToken] = useState(localStorage.getItem("token")||accessToken); // not sure token is valid, call getUser to check token
  
  useEffect(() => {
    getUser();
    
  }, []);

  

  const getUser = async () => {
    const res = await fetch("https://127.0.0.1:5000/getuser", {
      headers: {
        Authorization: `Token ${token}`
      }
    });
    const data = await res.json();
    if (res.ok) {
      setUser({ name: data.name, role: data.role });
      localStorage.setItem('token', token)
    }

    // window.history.replaceState({}, document.title, "/");
  };

  return (
    <Switch>

    

      <Route
        path="/"
        exact
        render={() => <Home user={user} setUser={setUser} token={token}/>}
      />
      
      <Route
        path="/tours/:id"
        exact
        render={() => <UpdateTour/>}
      />
      
      <Route
        path="/destinations"
        exact
        render={() => <Destination user={user} setUser={setUser} token={token}/>}
      />
      <Route
        path="/destinations/:id"
        exact
        render={() => <TourInfo user={user} setUser={setUser} token={token}/>}
      />
      <Route
        path="/dadmin"
        exact
        render={() => <Adminpage user={user} setUser={setUser} token={token}  />}
      />
      <Route
        path="/contact"
        exact
        render={() => <Contact user={user} setUser={setUser} token={token} />}
      />
      


      <Route
        path="/login"
        render={() => <Login user={user} setUser={setUser} />}
      />
      <Route path="/register" component={Register}  />
      <Route path="/error" component={ErrorPage}  />


      <Route
      path="/forget"
      exact
      render={() => <ForgetPass />}
    />
    
      <Route
      path="/pictures/:id"
      exact
      render={() => <UpdateImages />}
    />
    
      <Route
      path="/new_password/:token"
      exact
      render={() => <RecoverPass/>}
    />
      <Route
      path="/tours/:id/pictures"
      exact
      render={() => <ImageTour/>}
    />
  
      <Route
      path="/products/:id/info"
      exact
      render={() => <CreateTicketExp/>}
    />
  
    

  
    

    </Switch>
  );
}

export default App;
