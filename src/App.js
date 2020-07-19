import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Redirect, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
//importando los componentes
import Logo from "./components/Logo/Logo.jsx";
import ModalLogin from "./components/ModalLogin/ModalLogin";
import firebase from "firebase/app";
import Menu from "./components/Menu/Menu.jsx";
import Header from "./components/Header/Header.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "reactstrap";
import style from "./App.module.css";
import diabolo from "./assets/images/diabolo.png";
import IncomingOrders from "./components/IncomingOrders/IncomingOrders";
import atras from "./assets/images/atras.png";
import OkOrders from "./components/ModalOrdenOk/OkOrders.jsx";
import close from './assets/images/cerrarsesion.png';


class App extends Component {
  state = {
    auth: false,
  };

  firebaseAuth = firebase.auth().onAuthStateChanged(() => {
    if (firebase.auth().currentUser !== null) {
      let splittedEmail = firebase.auth().currentUser.email.split("");
      let emailFirstLetter = splittedEmail[0];
      let loginRole;
      emailFirstLetter === "m" ? (loginRole = "mesero") : (loginRole = "chef");
      this.setState({
        auth: true,
        role: loginRole,
      });
    }


  });

    signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.setState({
          auth: false,
          role: null,
        });
        console.log(
          "Sesión cerrada correctamente",
          this.state.auth,
          this.state.role
        );
        alert(
          "Sesión cerrada"
        );
      });
  }
  render() {
    let path = null;
    let pathRole = null;
    if (this.state.auth) {
      if (this.state.role === "chef") {
        path = <Redirect to="/chef" />;
        pathRole = "chef";
      } else if (this.state.role === "mesero") {
        path = <Redirect to="/mesero" />;
        pathRole = "mesero";
      }
    }

    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            {this.state.role === pathRole ? path : null}
            <Logo />
            <ModalLogin />
          </Route>
          <Route path="/mesero" exact>
          {this.state.auth === false ? <Redirect to="/"></Redirect> : null}

            <Header />
             <img src={close} className={style.cerrar} onClick={() => this.signOut()} alt="cerrar"></img>
            <section className={style.mainContainer}>
              <OkOrders className={style.pedidolisto} />
              <img
                src={diabolo}
                className={style.diabolo}
                alt="Máscara de demonio japonés"
              ></img>

              <div className={style.btnContainer}>
                <h4 className={style.meseroH1}>Mesero</h4>
                <Link to="/mesero/menu-desayuno">
                  <Button className={style.optionBtn}>Menú desayuno</Button>
                  
                </Link>

                <Link to="/mesero/menu-almuerzo-cena">
                  
                  <Button className={style.optionBtn}>
                    Menú almuerzo y cena
                  </Button>
                </Link>
              </div>

            </section>
          </Route>

          <Route path="/mesero/menu-desayuno" exact>
          {this.state.auth === false ? <Redirect to="/"></Redirect> : null}
            <Header />
            <Link to="/mesero">
            <img src={atras} className={style.back} alt="atras" />

            </Link>
            <img src={close} className={style.closeto}  onClick={() => this.signOut()}></img>

            <Menu type="breakfast" />



          </Route>
          <Route path="/mesero/menu-almuerzo-cena" exact>
          {this.state.auth === false ? <Redirect to="/"></Redirect> : null}
            <Header />
            <img src={close} className={style.closeto} onClick={() => this.signOut()}></img>
            <Menu type="lunch-dinner" />


            <Link to="/mesero">
            <img src={atras} className={style.backto} alt="atras" />
            </Link>
          </Route>
          <Route path="/chef" exact>
          {this.state.auth === false ? <Redirect to="/"></Redirect> : null}
            <Header />
            <img src={close} className={style.closetochef}  onClick={() => this.signOut()}></img>

            <IncomingOrders />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;