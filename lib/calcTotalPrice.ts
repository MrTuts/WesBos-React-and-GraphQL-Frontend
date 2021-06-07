import { CartItem } from '../components/User';

export default function calcTotalPrice(cart: Array<CartItem>) {
  return cart.reduce((acc, cartItem) => {
    // products can be deleted, but they could still be in your cart
    if (!cartItem.product) return acc;

    return acc + cartItem.quantity * cartItem.product.price;
  }, 0);
}
