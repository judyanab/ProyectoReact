import React from 'react';
import './App.css';
import HomePage from './Page/HomePage';
import DetallePage from './Page/DetallePage';
import Error404 from './Page/Error404';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//importacion de mi contextProvider
import { PetsContextProvider } from './context/PetsContext';

function App() {
  return (
    <PetsContextProvider>
        <Router>
          <Switch>
            <Route exact path="/" component={HomePage}/>
            <Route path="/update/:id" component={HomePage}/>
            <Route path="/detail/:id" component={DetallePage}/>
            <Route path="*" component={Error404} />
          </Switch>
        </Router>
    </PetsContextProvider>
  );
}

export default App;
