import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

import Header from "./components/Header";
import logo from "./assets/logo.png";
import Footer from "./components/Footer";

const App = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  //mon panier qui sera un tableau d'objets
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://site--deliveroo-backend--hpyqm5px6d9r.code.run/"
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  const handleClickAddCart = (meal) => {
    // condition pour ajout dans le panier, si il n'existe pas on push le nouvel objet dans le tableau, sinon on incrémente son compteur de 1
    const finalCart = [...cart];
    const mealInCart = finalCart.find((element) => element.id === meal.id);

    if (mealInCart) {
      mealInCart.quantity++;
    } else {
      const obj = { ...meal, quantity: 1 };
      finalCart.push(obj);
    }
    setCart(finalCart);
  };

  const handleClickCounterPlus = (meal) => {
    const cartCopy = [...cart];
    meal.quantity++;
    setCart(cartCopy);
  };

  const handleClickCounterMinus = (meal) => {
    const cartCopy = [...cart];
    const mealInCart = cartCopy.find((element) => element.id === meal.id);

    if (mealInCart.quantity > 1) {
      meal.quantity--;
    } else {
      const index = cartCopy.indexOf(mealInCart);
      cartCopy.splice(index, 1);
    }
    setCart(cartCopy);
  };

  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    total += cart[i].price * cart[i].quantity;
  }

  return (
    <div>
      {isLoading ? (
        <span>Chargement ...</span>
      ) : (
        <div>
          <header>
            <div className="container">
              <img src={logo} alt="Logo deliveroo" />
            </div>
          </header>

          <section className="description">
            <div className="container">
              <div>
                <h1> {data.restaurant.name}</h1>
                <p>{data.restaurant.description}</p>
              </div>
              <img src={data.restaurant.picture} alt="Pain quotidien" />
            </div>
          </section>

          <main>
            <div className="container">
              <section className="col-left">
                {data.categories.map((category) => {
                  return (
                    <div key={category.name}>
                      {category.meals.length !== 0 ? (
                        <section>
                          <h2>{category.name}</h2>
                          <div className="menu">
                            {category.meals.map((meal) => {
                              return (
                                <article
                                  key={meal.id}
                                  onClick={() => {
                                    handleClickAddCart(meal);
                                  }}
                                >
                                  <div>
                                    <h3>{meal.title}</h3>
                                    {meal.description ? (
                                      <p>{meal.description}</p>
                                    ) : (
                                      ""
                                    )}
                                    <div className="price">
                                      <span>{meal.price} €</span>
                                      {meal.popular === true && (
                                        <span className="popular">
                                          ⭑ Populaire
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                  {meal.picture ? (
                                    <img src={meal.picture} alt="Image plat" />
                                  ) : (
                                    ""
                                  )}
                                </article>
                              );
                            })}
                          </div>
                        </section>
                      ) : (
                        ""
                      )}
                    </div>
                  );
                })}
              </section>

              <section className="cart">
                {cart.length === 0 ? (
                  <div>
                    <p>Validez votre panier</p>
                    <p>Votre panier est vide</p>
                  </div>
                ) : (
                  <div>
                    <button>Valider mon panier</button>
                    {cart.map((meal, index) => {
                      return (
                        <div key={meal.id} className="my-cart">
                          <button onClick={() => handleClickCounterMinus(meal)}>
                            -
                          </button>
                          <p>{meal.quantity}</p>
                          <button onClick={() => handleClickCounterPlus(meal)}>
                            +
                          </button>
                          <span>{meal.title}</span>
                          <span>
                            {(Number(meal.price) * meal.quantity).toFixed(2)} €
                          </span>
                        </div>
                      );
                    })}

                    <div className="total">
                      <p>Total</p>
                      <p>{total.toFixed(2)} €</p>
                    </div>
                  </div>
                )}
              </section>
            </div>
          </main>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default App;
