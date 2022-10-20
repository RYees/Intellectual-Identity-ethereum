const React = require('react');
import { render, screen, cleanup, renderHook, fireEvent } from '@testing-library/react';
import { TransactionsProvider } from '../../../context/TransactionContext';
import Bidregister from '../Bidregister';

const MockBidregister = () => {
    return (
        <TransactionsProvider>
            <Bidregister/>
        </TransactionsProvider>
    )
};

describe("Bid registration form", ()=>{
    beforeEach(() => {
        render(<MockBidregister/>); 
    });
    // Cleanup mock
    afterEach(() => {
        cleanup();
    });

    afterAll(() => {
        console.log("Testing completed");
    });

    it('should render text correctly', () => {
        const btnElement = screen.getByTestId("button-one");
        expect(btnElement).toBeInTheDocument();
        // expect(2+2).toEqual(4);
    });
    
    it('should have a state value of show to be true', () => {
        //const buttonElement = screen.getByRole("button", {name: /Add/i });
        const buttonElement = screen.getByTestId("button-one");
        fireEvent.click(buttonElement);
        expect(screen.getByTestId("show")).toBeVisible();
    });

    it('should have a state value of show to be false', () => {   
        const buttonElement = screen.getByTestId("button-one");
        fireEvent.click(buttonElement);
        const iconcloseElement = screen.getByTestId("close");
        fireEvent.click(iconcloseElement);
        expect(screen.getByTestId("button-one")).toBeVisible();
    });    
    

    it('should have a change status form value correct', () => {   
        const buttonsElement = screen.getByTestId("button-one");
        fireEvent.click(buttonsElement);
        const input1Element = screen.getByPlaceholderText(/ip owner public address/i);
        const input2Element = screen.getByPlaceholderText(/owner intellectual property name/i);
        const input3Element = screen.getByPlaceholderText(/bid value/i);
        const input4Element = screen.getAllByPlaceholderText(/your public address/i);
        const buttonElement = screen.getByRole("button", { name: /Submit/i});
        fireEvent.click(buttonElement);
        expect(screen.getByTestId("button-one")).toBeVisible();
    });    

});