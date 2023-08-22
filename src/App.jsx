import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

import Header from "./components/Header";
import logo from "./assets/logo.png";
import Footer from "./components/Footer";

const App = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [counter, setCounter] = useState([1]);

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
    const finalCart = [...cart];
    // condition pour ajout dans le panier, si il n'existe pas on push le nouvel objet dans le tableau, sinon on incrémente son compteur de 1
    finalCart.push({ price: meal.price, title: meal.title });
    setCart(finalCart);
    setTotal(total + parseInt(meal.price));
  };

  const handleClickCounter = (index, value, meal) => {
    const counterCopy = [...counter];
    counterCopy.splice(index, 1, value);
    setCounter(counterCopy);
    setTotal(total + parseInt(meal.price));
  };

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
                {data.categories.map((elem) => {
                  return (
                    <div key={elem.name}>
                      {elem.meals.length !== 0 ? (
                        <section>
                          <h2>{elem.name}</h2>
                          <div className="menu">
                            {elem.meals.map((meal) => {
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

              <div className="cart">
                <button className="buy">Valider mon panier</button>

                {/* On veut séparer les compteur, qu'il soit indépandant */}
                {cart.map((elem, index) => {
                  return (
                    <div key={index}>
                      {counter.map((count, index) => {
                        return (
                          <div key={index}>
                            <button
                              onClick={() =>
                                handleClickCounter(index, count - 1, elem)
                              }
                            >
                              -
                            </button>
                            <p>{counter}</p>
                            <button
                              onClick={() =>
                                handleClickCounter(index, count + 1, elem)
                              }
                            >
                              +
                            </button>
                            <span>{elem.title}</span>
                            <span>{elem.price * counter}</span>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}

                {total === 0 ? (
                  <p>Votre panier est vide</p>
                ) : (
                  <div className="total">
                    <p>Total</p>
                    <p>{total} €</p>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default App;
