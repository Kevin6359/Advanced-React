import {useQuery} from "@apollo/client";
import gql from "graphql-tag";
import DisplayError from '../components/ErrorMessage';
import OrderItemStyles from '../components/styles/OrderItemStyles';
import formatMoney from '../lib/formatMoney';
import styled from "styled-components";
import Link from 'next/link';

const USER_ORDERS_QUERY = gql`
    query USER_ORDERS_QUERY{
        allOrders {
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
`;

const orderedUl = styled.ul`
    display: grid;
    grid-template-columns: repeat(autofit, minmax(350px, 1fr));
    grid-gap: 4rem;
`;

function countItemsInAnOrder(order){
    return order.items.reduce((tot, cur) => {
        tot += cur.quantity;
        return tot;
    }, 0);
}

export default function OrdersPage(){
    const {data, error, loading} = useQuery(USER_ORDERS_QUERY);
    if(loading) return <p>Loading...</p>
    if(error) return <DisplayError error={error} />
    console.log(data);
    return (
        <div>
            <h2>You have {data.allOrders.length} orders!</h2>
            <orderedUl>
                {data.allOrders.map(order => (
                    <OrderItemStyles key={order.id}>
                        <Link href={`/order/${order.id}`}>
                            <div className='order-meta'>
                                <p>{countItemsInAnOrder(order)} Item{countItemsInAnOrder(order) === 1 ? '' : 's'}</p>
                                <p>{order.items.length} Product{order.items.length === 1 ? '' : 's'}</p>
                                <p>{formatMoney(order.total)}</p>
                            </div>
                        </Link>
                    </OrderItemStyles>
                ))}
            </orderedUl>
        </div>
    )
}