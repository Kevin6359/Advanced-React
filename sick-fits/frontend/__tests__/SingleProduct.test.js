import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import SingleProduct, { SINGLE_ITEM_QUERY } from '../components/SingleProduct';
import { fakeItem } from '../lib/testUtils';

const product = fakeItem();

const mocks = [
    {
      // When someone requests this query and variable combo
      request: {
        query: SINGLE_ITEM_QUERY,
        variables: {
          id: '123',
        },
      },
      // Return this data
      result: {
        data: {
          Product: product,
        },
      },
    },
  ];

describe('<Product/>', () => {
    it('renders with proper data', async () => {
        const {container, debug} = render(<MockedProvider mocks={mocks}>
            <SingleProduct id='123'/>
        </MockedProvider>);
        await screen.findByTestId('singleProduct');
    });

    it('errors out when an item is not found', async () => {
        const errorMock = [
            {
              request: {
                query: SINGLE_ITEM_QUERY,
                variables: {
                  id: '123',
                },
              },
              result: {
                errors: [{ message: 'Item not found!!!' }],
              },
            },
          ];
        const {container, debug} = render(<MockedProvider mocks={errorMock}>
            <SingleProduct id='123'/>
        </MockedProvider>);
        await screen.findByTestId('graphql-error');
        expect(container).toHaveTextContent('Shoot!');
        expect(container).toHaveTextContent('Item not found!!!');
    });
});