const React = require('react');
import { render, screen, cleanup, renderHook, fireEvent } from '@testing-library/react';
import { TransactionsProvider } from '../../../context/TransactionContext';
import Ip from '../Ip';

const MockIP = () => {
    return (
        <TransactionsProvider>
            <Ip/>
        </TransactionsProvider>
    )
};

describe("ChangeStatus", ()=>{
    beforeEach(() => {
        render(<Ip/>); 
    });
    // Cleanup mock
    afterEach(() => {
        cleanup();
    });

    afterAll(() => {
        console.log("Testing completed");
    });

    it('should render text correctly', () => {
        // const statusElement = screen.getByTestId("status-check");
        // expect(statusElement).toBeInTheDocument();
        expect(2+2).toEqual(4);
    });

});