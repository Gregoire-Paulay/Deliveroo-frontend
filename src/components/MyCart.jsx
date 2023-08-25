const MyCart = ({ cart, setCart }) => {
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
  const shipping = 2.5;

  return (
    <section className="cart">
      {cart.length === 0 ? (
        <div>
          <p>Validez votre panier</p>
          <p>Votre panier est vide</p>
        </div>
      ) : (
        <div>
          <button>Valider mon panier</button>
          <div>
            {cart.map((meal) => {
              return (
                <div key={meal.id} className="my-cart">
                  <button onClick={() => handleClickCounterMinus(meal)}>
                    <i className="fa-solid fa-minus"></i>
                  </button>
                  <p>{meal.quantity}</p>
                  <button onClick={() => handleClickCounterPlus(meal)}>
                    <i className="fa-solid fa-plus"></i>
                  </button>
                  <span>{meal.title}</span>
                  <span>
                    {(Number(meal.price) * meal.quantity).toFixed(2)} €
                  </span>
                </div>
              );
            })}
          </div>

          <div className="total">
            <div className="subTotal">
              <div>
                <p>Sous-total</p>
                <p> {total.toFixed(2)} €</p>
              </div>
              <div>
                <p>Frais de livraison</p>
                <p>{shipping} €</p>
              </div>
            </div>
            <div className="finalPrice">
              <p>Total</p>
              <p>{Number(total.toFixed(2)) + shipping} €</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
export default MyCart;
