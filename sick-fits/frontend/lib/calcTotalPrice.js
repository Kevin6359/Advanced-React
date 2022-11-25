export default function calcTotalPrice(cart) {
  return cart.reduce((total, current) => {
    if (!current.product) return;
    return total + current.quantity * current.product.price;
  }, 0);
}
