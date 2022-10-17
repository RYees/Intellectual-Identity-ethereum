const React = require('react');
import { render, screen, cleanup, renderHook, fireEvent } from '@testing-library/react';
import { TransactionsProvider } from '../../../context/TransactionContext';
import Status from '../Status';

const MockStatus = () => {
    return (
        <TransactionsProvider>
            <Status/>
        </TransactionsProvider>
    )
};

describe("ChangeStatus", ()=>{
    beforeEach(() => {
        render(<MockStatus/>); 
    });
    // Cleanup mock
    afterEach(() => {
        cleanup();
    });

    afterAll(() => {
        console.log("Testing completed");
    });

    it('should render text correctly', () => {
        const statusElement = screen.getByTestId("status-check");
        expect(statusElement).toBeInTheDocument();
        // expect(2+2).toEqual(4);
    });

    it('should have a state value of show to be true', () => {
        //const buttonElement = screen.getByRole("button", {name: /Add/i });
        const buttonElement = screen.getByTestId("status-check");
        fireEvent.click(buttonElement);
        expect(screen.getByTestId("show")).toBeVisible();
    });

    it('should have a state value of show to be false', () => {   
        const buttonElement = screen.getByTestId("status-check");
        fireEvent.click(buttonElement);
        const iconcloseElement = screen.getByTestId("close");
        fireEvent.click(iconcloseElement);
        expect(screen.getByTestId("status-check")).toBeVisible();
    });    
    

});