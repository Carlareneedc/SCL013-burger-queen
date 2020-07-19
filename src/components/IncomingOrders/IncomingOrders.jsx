import React, { Component } from "react";
import CardsIncomingOrders from "../CardsOrders/CardsIncomingOrders.jsx";
import firebase from "firebase";
import style from "../../components/IncomingOrders/IncomingOrders.module.css";
class IncomingOrders extends Component {
  state = {
    orders: [{}],
  };

  arr = [];


  componentDidMount() {
    const db = firebase.firestore();
    db.collection("resumen orden").where('state', '==', 'Pendiente').orderBy('timestamp', 'asc').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.arr.push({
          products: doc.data().information,
          id: doc.id,
          state: doc.data().state,
          date: doc.data().timestamp,
          table: doc.data().table,
        });
      });
      this.setState({
        orders: this.arr,
      });
    });

  }

    
  

  render() {
    return (
      <React.Fragment>
        <div className={style.container}>
          <CardsIncomingOrders data={this.state} />
          {/* {console.log(this.state.orders[0].id)} */}
        </div>
      </React.Fragment>    
    );
  }
}

export default IncomingOrders;