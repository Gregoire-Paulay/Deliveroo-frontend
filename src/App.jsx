import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  // console.log("Render");
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://site--deliveroo-backend--hpyqm5px6d9r.code.run/"
      );
      console.log(response.data);
      setData(response.data);
      setIsLoading(false);
    };

    fetchData();
  }, []);
  return (
    <div>
      {isLoading ? (
        <span>Chargement ...</span>
      ) : (
        <div>
          <header>
            <div>
              <i className="fa-solid fa-hand-peace"></i>
              <h1>deliveroo</h1>
            </div>
            <section className="description">
              <div>
                <h2> {data.restaurant.name}</h2>
                <p>{data.restaurant.description}</p>
              </div>
              <img src={data.restaurant.picture} alt="Pain quotidien" />
            </section>
          </header>

          <main>
            <div>
              {data.categories.map((elem) => {
                return (
                  <div key={elem.name}>
                    <section>
                      <h3>{elem.name}</h3>
                      <div className="menu">
                        {elem.meals
                          ? elem.meals.map((meal) => {
                              return (
                                <div key={meal.id}>
                                  <div>
                                    <h4>{meal.title}</h4>
                                    {meal.description ? (
                                      <p>{meal.description}</p>
                                    ) : (
                                      ""
                                    )}
                                    <p className="price">{meal.price} €</p>
                                  </div>
                                  {meal.picture ? (
                                    <img src={meal.picture} alt="Image plat" />
                                  ) : (
                                    ""
                                  )}
                                </div>
                              );
                            })
                          : ""}
                      </div>
                    </section>
                  </div>
                );
              })}
            </div>

            <div className="cart">Panier</div>
          </main>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default App;
