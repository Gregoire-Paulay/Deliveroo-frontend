const Menu = ({ cart, setCart, data }) => {
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
  return (
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
                          {meal.description ? <p>{meal.description}</p> : ""}
                          <div className="price">
                            <span>{meal.price} €</span>
                            {meal.popular === true && (
                              <span className="popular">⭑ Populaire</span>
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
  );
};
export default Menu;
