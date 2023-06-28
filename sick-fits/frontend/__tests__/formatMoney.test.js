import formatMoney from "../lib/formatMoney";

describe('formatMoney function', () => {
    it('works with pence', () => {
        expect(formatMoney(1)).toEqual('£0.01');
        expect(formatMoney(9)).toEqual('£0.09');
        expect(formatMoney(10)).toEqual('£0.10');
        expect(formatMoney(40)).toEqual('£0.40');
    });
    it('leaves off pence when whole pounds', () => {
        expect(formatMoney(5000)).toEqual('£50');
        expect(formatMoney(100)).toEqual('£1');
        expect(formatMoney(500000)).toEqual('£5,000');
    });
    it('works with pounds and pence', () => {
        expect(formatMoney(140)).toEqual('£1.40');
        expect(formatMoney(101)).toEqual('£1.01');
        expect(formatMoney(50000025)).toEqual('£500,000.25');
    });
});