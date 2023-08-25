import { useState, useEffect } from "react";
import axios from "axios";

// Import de mes components secondaires
import Hero from "./Hero";
import Menu from "./Menu";
import MyCart from "./MyCart";

const Content = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  // Mon panier qui sera un tableau d'objets
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

  return (
    <div>
      {isLoading ? (
        <span>Chargement ...</span>
      ) : (
        <div>
          <Hero
            name={data.restaurant.name}
            description={data.restaurant.description}
            picture={data.restaurant.picture}
          />
          <main>
            <div className="container">
              <Menu cart={cart} setCart={setCart} data={data} />
              <MyCart cart={cart} setCart={setCart} />
            </div>
          </main>
        </div>
      )}
    </div>
  );
};

export default Content;
