import React, { Component } from "react";
import Product from "../Products/Product";
import DataMenu from "../../DataMenu.json";
import { Table } from "reactstrap";
import style from "./Menu.module.css";

class Menu extends Component {
  state = {

  };


  arrayProducts=[

  ]

sumTotal =(array) =>{
  let suma = 0
  array.forEach(element => {
    let multiplication = element.quantity * element.price
    suma += multiplication

  });
  return suma
}

resume = (e) =>{
let quantityProducts=e.target.value
let quantityFather= e.target.parentElement.parentElement
let quantityFatherChildren= quantityFather.childNodes
let productsName=quantityFatherChildren[0].innerText
let productPrice=quantityFatherChildren[1].outerText

 let productsResume={
   name:productsName,
   price:productPrice,
   quantity:quantityProducts,
 }
  
 if(quantityProducts > 0){
  this.arrayProducts.push(productsResume)
  console.log(this.arrayProducts)
 } else {
  let productIndex = this.arrayProducts.findIndex(product => product.name === productsResume.name)
  this.arrayProducts.splice(productIndex, 1)
  console.log(this.arrayProducts)
 }
 
 this.setState(
   {
    products:this.arrayProducts, 
    total:this.sumTotal(this.arrayProducts),
   

   }
   )
}

table = (e) => {
  let tableNumber = e.target.value
  this.setState({
    table:tableNumber
  })
}


componentDidUpdate(){
  console.log(this.state)
}

  render() {
    // Uno u otro menú se guarda aquí dependiendo del resultado del if/else if
    let currentMenu = null;
    // Condicional según la propiedad type pasada en App.js al comp. Menu
    if (this.props.type === "breakfast") {
      let menuArray = Object.entries(DataMenu[0])[0][1].products;
      currentMenu = menuArray.map((product) => {
        return (
          <React.Fragment key={product.id}>
            <Product name={product.nombre} price={product.valor} change={(e)=>this.resume(e)}/>
          </React.Fragment>
        );
      });
    } else if (this.props.type === "lunch-dinner") {
      //Esto es solo de prueba, hay que cambiarlo por el mapeo del menú almuerzo/cena
      currentMenu = (
        <React.Fragment key="alm5">
          <Product name="almuercito 1" price="$1000" qty="2" />
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <section className={style.menu}>
          <h2 className={style.menuDesayuno}> Menu Desayuno</h2>
          <span> N° Mesa </span>
          <select onChange={(e)=>this.table(e)} min={0} max={10} >
             <option value='0'>0 </option>
             <option value='1'>1 </option>
             <option value='2'>2 </option>
             <option value='3'>3 </option>
             <option value='4'>4 </option>
             <option value='5'>5 </option>
             <option value='6'>6 </option>
             <option value='7'>7 </option>
             <option value='8'>8 </option>
             <option value='9'>9 </option>
             <option value='10'>10 </option>
             </select>
          <div>
            <Table borderless className={style.menu}>
              <tbody>{currentMenu}</tbody>
            </Table>
          </div>
        </section>
      </React.Fragment>
    );
  }
}
export default Menu;