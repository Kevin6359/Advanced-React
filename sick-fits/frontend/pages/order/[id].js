import {useQuery} from "@apollo/client";
import gql from "graphql-tag";
import DisplayError from '../../components/ErrorMessage';
import OrderStyles from '../../components/styles/OrderStyles';
import Head from 'next/head';
import formatMoney from '../../lib/formatMoney';

const SINGLE_ORDER_QUERY = gql`
    query SINGLE_ORDER_QUERY($id: ID!){
        order: Order(where: {id :$id }) {
            id
            charge
            total
            user {
                id
            }
            items {
                id
                name
                description
                price
                quantity
            }
        }
    }
`

export default function SingleOrderPage(props){
    console.log(props);
    const {data, error, loading} = useQuery(SINGLE_ORDER_QUERY, {
        variables: {
            id: props.query.id
        }
    });
    if(loading) return <p>Loading...</p>
    if(error) return <DisplayError error={error} />
    console.log(data);
    return (
        <OrderStyles>
            <Head>
                <title>Sick Fits - {data.order.id}</title>
            </Head>
            <p>
                <span>Order ID:</span>
                <span>{data.order.id}</span>
            </p>
            <p>
                <span>Charge:</span>
                <span>{data.order.charge}</span>
            </p>
            <p>
                <span>Order Total:</span>
                <span>{formatMoney(data.order.total)}</span>
            </p>
            <p>
                <span>Item Count:</span>
                <span>{data.order.items.length}</span>
            </p>
            <div className='items'>
                {data.order.items.map(item => (
                    <div className='item' key={item.id}>
                        <div className='itemDetails'>
                            <h2>{item.name}</h2>
                            <p>Qty: {item.quantity}</p>
                            <p>Each: {formatMoney(item.price)}</p>
                            <p>Subtotal: {formatMoney(item.price * item. quantity)}</p>
                            <p>{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </OrderStyles>
    )
}