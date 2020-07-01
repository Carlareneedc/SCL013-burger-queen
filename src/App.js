import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
//importando los componentes
import Logo from './components/Logo'
import ModalLogin from './components/ModalLogin/ModalLogin';
import firebase from 'firebase';
import Menu from './components/Menu';
import Header from './components/Header/Header';
import Order from './components/Order/Order';
import IncomingOrders from './components/IncomingOrders/IncomingOrders';



function App() {
  return (
      <BrowserRouter>
        <div>
        <Switch>
          <Route path="/" exact>
          {firebase.auth().currentUser !== null ? <Redirect to="/mesero" />:null}
          <Logo/>
          <ModalLogin/>
          </Route>
          <Route path="/mesero" exact>
            <Header/>
            <Order name="Charlie" product="Gyozas" total="Caleta de plata"/>
          </Route>
          <Route path="/mesero/menu-desayuno" exact>
            <Menu/>
          </Route>
          <Route path="/mesero/menu-almuerzo-cena" exact>
            <p>no lo pienses más</p>
          </Route>
          <Route path="/chef" exact>
            <Header/>
           <IncomingOrders/>

          </Route>
        </Switch>
        </div>
      </BrowserRouter>
    );
}
export default App;
