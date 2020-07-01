import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
//importando los componentes
import Logo from './components/Logo'
import ModalLogin from './components/ModalLogin';
import firebase from 'firebase';
import Menu from './components/Menu';


function App() {
  let path = '/';
  let loggedIn = false;
  if (firebase.auth().currentUser !== null) {
    loggedIn = true;
    path = '/mesero';
  } 
  return (
      <BrowserRouter>
        <div>
          {console.log(firebase.auth().currentUser)}
        <Switch>
          <Route path={path} exact>
          {/* {loggedIn ? <Redirect to="/mesero" /> : console.log('no hay usuario conectado')} */}
          <Logo/>
          <ModalLogin/>
          
          </Route>
          <Route path="/mesero" exact>
            <p>hola</p>
          </Route>
          <Route path="/mesero/menu-desayuno" exact component={Menu}>
            {/* <Menu/> */}
          </Route>
          <Route path="/mesero/menu-almuerzo-cena" exact>
            <p>no lo pienses más</p>
          </Route>
          <Route path="/chef" exact>
            <p>atrevete a aceptarlo</p>
          </Route>
        </Switch>
        </div>
      </BrowserRouter>
     
    );
  }
    
export default App;