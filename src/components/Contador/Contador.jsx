import React, { Component } from 'react';
import style from '../../components/CardsOrders/CardsIncomingOrder.module.css'
import {
  Button
} from 'reactstrap';
import firebase from 'firebase';

class Contador extends Component {
  constructor(props) {
    super(props);
    this.state = { time: {}, seconds: 0 };
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
  }


  componentDidMount() {
    const timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
  }
  secondsToTime(secs) {
    const hours = Math.floor(secs / (60 * 60));

    const divisorForMinutes = secs % (60 * 60);
    const minutes = Math.floor(divisorForMinutes / 60);

    const divisorForSeconds = divisorForMinutes % 60;
    const seconds = Math.ceil(divisorForSeconds);

    const obj = {
      h: hours,
      m: minutes,
      s: seconds,
    };
    return obj;
  }

  startTimer() {
    if (this.timer === 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  sendToFirebase = (id, minutes, seconds) => {
    console.log(id, minutes, seconds);
    firebase.firestore().collection('resumen orden').doc(`${id}`).update({
      state: 'Listo para entrega',
      readyTime: firebase.firestore.FieldValue.serverTimestamp(),
      delay: [minutes, seconds]

    }).then(() => {

      console.log('Enviado a Firebase como "Listo para entregar"');
      //window.location.reload(); //actualizar el navegador después de cambiar estado de un pedido
    })
  }

  timerHandler(id, seconds, minutes) {
    clearInterval(this.timer)
    this.sendToFirebase(id, minutes, seconds);
    //console.log('id: ' + id, 'minutos: ' + minutes, 'segundos: ' + seconds);
  }
  countDown() {
    // Remove one second, set state so a re-render happens.
    const seconds = this.state.seconds + 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds,
    });

    // Check if we're at zero.
    if (seconds === 0) {
      clearInterval(this.timer);
    }
  }

  render() {
    return (

      <div>
        <div className={style.fatherButton}>
        <Button  id={this.props.id} className={style.optionBtn} onClick={this.startTimer}>Preparando</Button>
        <Button  id={this.props.id} className={style.optionBtn} onClick={() => this.timerHandler(this.props.id, this.state.time.s, this.state.time.m)}>Terminado</Button>
        </div>
        <div className={style.time}>
         m: {this.state.time.m} s: {this.state.time.s}
         </div>
      
        

      </div>
    );
  }
}

export default Contador;