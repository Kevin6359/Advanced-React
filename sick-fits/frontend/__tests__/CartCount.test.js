import { render, screen } from '@testing-library/react';
import wait from 'waait';
import CartCount from '../components/CartCount';

describe('<CartCount/>', () => {
    it('renders', () => {
        const {container, debug} = render(<CartCount count={1}/>);
    });
    it('updates via props', async () => {
        const {container, rerender, debug} = render(<CartCount count={6}/>);
        expect(container.textContent).toBe('6');
        rerender(<CartCount count={12}/>);
        await wait(400);
        // await screen.findByText('12')
        expect(container.textContent).toBe('12');
    });
});