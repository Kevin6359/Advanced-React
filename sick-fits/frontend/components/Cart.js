import styled from 'styled-components';
import CartStyles from './styles/CartStyles';
import Supreme from './styles/Supreme';
import formatMoney from '../lib/formatMoney';
import { useUser } from './User';
import calcTotalPrice from '../lib/calcTotalPrice';

const CartItemStyles = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid var(--lightGrey);
  display: grid;
  grid-template-columns: auto 1fr auto;
  img {
    margin-right: 1rem;
  }
  h3,
  p {
    margin: 0;
  }
`;

function CartItem({ cartItem }) {
  // const { product } = cartItem.product;
  // if (!product) return null;
  // console.log(product);
  /*
  console.log('wallad');
  console.log(cartItem);
  console.log(cartItem.product);
  console.log(cartItem.product.photo);
  console.log(cartItem.product.photo[0]);
  console.log(cartItem.product.photo[0].image.publicUrlTransformed);
  */
  // console.log(product.photo[0].image.publicUrlTransformed);
  // console.log('wally');
  return (
    <CartItemStyles>
      <img
        width="100"
        src={cartItem.product.photo[0].image.publicUrlTransformed}
        alt={cartItem.product.name}
      />
      <div>
        <h3>{cartItem.product.name}</h3>
        <p>
          {formatMoney(cartItem.product.price * cartItem.quantity)} -{' '}
          <em>
            {cartItem.quantity} &times; {formatMoney(cartItem.product.price)}{' '}
            each
          </em>
        </p>
      </div>
    </CartItemStyles>
  );
}

export default function Cart() {
  const me = useUser();
  if (!me) return null;
  console.log(me);
  return (
    <CartStyles open>
      <header>
        <Supreme>{me.name}'s Cart</Supreme>
      </header>
      <ul>
        {me.cart.map((item) => (
          <CartItem key={item.id} cartItem={item} />
        ))}
      </ul>
      <footer>
        <p>{formatMoney(calcTotalPrice(me.cart))}</p>
      </footer>
    </CartStyles>
  );
}
