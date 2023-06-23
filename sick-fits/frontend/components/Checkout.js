import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import styled from 'styled-components';
import nProgress from 'nprogress';
import {useState} from 'react';
import SickButton from './styles/SickButton';
import gql from 'graphql-tag';
import {useMutation} from '@apollo/client';

const CheckoutFormStyles = styled.form`
  box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 5px;
  padding: 1rem;
  display: grid;
  grid-gap: 1rem;
`;

const CREATE_ORDER_MUTATION = gql`
    mutation CREATE_ORDER_MUTATION ($token: String!){
        checkout (token: $token){
            id
            charge
            total
            items {
                id
                name
            }
        }
    } 
`

const stripeLib = loadStripe(process.env.NEXT_PUBLIC_STRIPE_TOKEN);

function CheckoutForm() {

    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const [checkout, {error: graphQLError}] = useMutation(
        CREATE_ORDER_MUTATION
    );

    async function handleSubmit(e){
        e.preventDefault();
        setLoading(true);
        nProgress.start();

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement)
        });

        console.log(paymentMethod);

        if(error){
            setError(error);
            nProgress.done();
            return;
        }

        const order = await checkout({
            variables: {
                token: paymentMethod.id
            }
        });

        console.log('finished with the order');
        console.log(order);

        setLoading(false);
        nProgress.done();
    }

  return (
    <CheckoutFormStyles onSubmit={handleSubmit}>
        {error && <p style={{ fontSize: 12}}>{error.message}</p>}
        {graphQLError && <p style={{ fontSize: 12}}>{graphQLError.message}</p>}
        <CardElement />
        <SickButton type="submit">Check Out Now</SickButton>
    </CheckoutFormStyles>
  );
}

function Checkout() {
    return (
        <Elements stripe={stripeLib}>
            <CheckoutForm />
        </Elements>
    )
}

export { Checkout };
