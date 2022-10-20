const React = require('react');
import { render, screen, cleanup, renderHook, fireEvent } from '@testing-library/react';
import { TransactionsProvider } from '../../../context/TransactionContext';
import Bidder from '../Bidder';

const MockBidder = () => {
    return (
        <TransactionsProvider>
            <Bidder/>
        </TransactionsProvider>
    )
};

describe("Bidder parent componenet", ()=>{
    beforeEach(() => {
       // render(<MockBidder/>); 
    });
    // Cleanup mock
    afterEach(() => {
        cleanup();
    });

    afterAll(() => {
        console.log("Testing completed");
    });

    it('should render text correctly', () => {
        render(<MockBidder/>); 
        const walletElement = screen.getByTestId("wallet");
        expect(walletElement).toBeInTheDocument();
         expect(2+2).toEqual(4);
    });

});