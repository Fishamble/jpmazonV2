import addDays from "date-fns/addDays";
import { ShoppingBasketContext } from "../../Hooks/useContext";
import "./BuyItBox.css";
import { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function BuyItBox({ product }) {
  const { basket, setBasket } = useContext(ShoppingBasketContext);
  const quantity = useRef();
  const itemAddedTobasketMessage = useRef(null);

  const navigate = useNavigate();
  const navigateTo = (url) => {
    navigate(url);
  };

  //calculates price before discount
  const oldPrice = () => {
    return Math.round((product.price / 85) * 100 * 100) / 100;
  };

  //Adds on two decimal places as all the API product price are whole integers
  //Added ten here so there will be no number below 10, which would be single digit €12.8 instead €12.80
  const productPrice = (price) => {
    return price + "." + (Math.floor(Math.random() * 90) + 10);
  };

  const getItemBy = () => {
    const today = new Date();
    const howManyDayForDelivery = Math.floor(Math.random() * 5) + 1;
    //A random number of days between 1 and 6 for delivery
    let deliveryDate = addDays(today, howManyDayForDelivery);
    deliveryDate = deliveryDate.toString();
    deliveryDate = deliveryDate.slice(0, deliveryDate.indexOf("2022"));
    // Make date object a string and slice off unnecessary parts
    return "Get it as soon as " + deliveryDate;
  };

  const addToBasket = (e) => {
    const itemAlreadyInBasket = basket.filter((item) => item.id === product.id);
    //dont add product to cart if it is already in.
    if (!itemAlreadyInBasket.length) {
      const productDeatailsForBasket = {
        id: product.id,
        title: product.title,
        price: product.price,
        quantity: quantity.current.value,
        thumbnail: product.thumbnail,
      };

      const updatedBasket = [...basket, productDeatailsForBasket];
      localStorage.setItem("JpmazonBasket", JSON.stringify(updatedBasket));
      setBasket(updatedBasket);

      //convoluted method of selecting the elemenet which will
      //diplay an item has been added to the cart
      // e.target.lastChild.firstChild.style.display = "inline-block";
      itemAddedTobasketMessage.current.style.display = "inline-block";
      setTimeout(() => {
        e.target.lastChild.firstChild.style.display = "none";
      }, 1500);
    }
  };

  return (
    <div className="buy-it-box">
      <div className="details-container">
        <div className="price-container">
          <span className="discount">-15%</span>
          <span className="price">EUR {productPrice(product.price)}</span>
        </div>
        <div className="rrp">
          <span>RRP</span>
          <span className="old-price"> EUR{oldPrice()}</span>
        </div>
        <div className="deliver-to">
          <i className="fa-solid fa-location-dot"></i>
          <span>Deliver to Jimmy Joe Bob - The shire N17</span>
        </div>

        <div className="stock">
          In stock
          <span className="get-item-by">{getItemBy()}</span>
        </div>
        <div className="delivery"></div>
        <div className="fastest-delivery"></div>

        <select className="quantity" name="Qty" ref={quantity}>
          <option value="1">Qty:1</option>
          <option value="2">Qty:2</option>
          <option value="3">Qty:3</option>
          <option value="4">Qty:4</option>
          <option value="5">Qty:5</option>
          <option value="6">Qty:6</option>
          <option value="7">Qty:7</option>
          <option value="8">Qty:8</option>
          <option value="9">Qty:9</option>
          <option value="10">Qty:10</option>
        </select>
      </div>
      <button
        className="add-to-basket"
        onClick={(e) => {
          addToBasket(e);
        }}
      >
        Add to Basket
        <div className="center-wrapper">
          <div className="item-added" ref={itemAddedTobasketMessage}>
            Item added to basket
          </div>
        </div>
      </button>
      <button
        className="buy-now"
        onClick={() => {
          addToBasket();
          navigateTo("/basket");
        }}
      >
        Buy now
      </button>
      <div>
        <div className="details-container-2">
          <i className="fa-solid fa-lock"></i>
          <span>Secure transaction</span>
        </div>

        <div className="dispatch">
          <div>
            <span className="c1">Dispatches from</span>
            <span>Portlaoise</span>
          </div>
          <div>
            <span className="c1">Sold by</span>
            <span>JPmazon</span>
          </div>

          <div>
            <span className="c1">Customer service</span>
            <span>Our dedicated team</span>
          </div>
          <div>
            <span className="c1">Return policy</span>
            <span className="returnable">Returnable within 30 days of reciept</span>
          </div>
        </div>
        <button className="prime">Yes baby - sign me up for JP prime</button>
      </div>
    </div>
  );
}
