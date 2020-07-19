import React, { useState, useEffect } from 'react';
import {
  Card, CardBody,
  CardTitle,
  Button
} from 'reactstrap';
import style from '../../components/CardsOrders/CardsIncomingOrder.module.css'
import olasCard from '../../assets/images/olitascard.png'
import Contador from '../Contador/Contador';
import firebase from 'firebase';

 const CardsIncomingOrders = (props) => {
   const [cardState, setCardState] = useState('');

    let parentState = props.data.orders;

    let orders = null;
    const formattingDate = (date) => {
      const formattedDate = date.toDate().toString();
      const splitDate = formattedDate.split(" ");
      return `${splitDate[4]}`;
    };


    if (parentState[0] !== undefined) {
      orders = props.data.orders.map(order => {
        let products = order.products;
        let orderId = order.id;
        
        if (order.products !== undefined) {
        let names = products.map(product => {
          return (
          <React.Fragment
              key={product.name + 1}><li>{product.name}</li></React.Fragment>
          )
        })

        return (
          <React.Fragment key={orderId}>
            <Card id={orderId}
              style={({ width: "15rem" }, { marginBottom: "4rem" })}
              className={style.motherCards}>
              <CardBody className={style.cardBody}>
                <CardTitle>
                  <p className={style.nTable}>Mesa nro. {order.table}</p>
                </CardTitle>
                <p>Hora: {formattingDate(order.date)}</p><br></br>
                <>{order.state}</>
                <ul>{names}</ul>
              </CardBody>
              <div>
                <Contador id={orderId} />
                <img src={olasCard} className={style.olasCards} alt="olas" />
              </div>
             </Card>

                
          </React.Fragment>
        );
        }
      })
    } else {
      orders = <p className={style.nohay}>No hay pedidos entrantes</p>
    }
      

    return (
      <React.Fragment>

      <h1 className={style.chef}>Chef</h1>
          <h2 className={style.incomingOrders}> Pedidos entrantes</h2>
      <div className={style.fatherCards}>
          {console.log(cardState)}
          {orders}

      </div>
      </React.Fragment>
    );

}

export default CardsIncomingOrders;