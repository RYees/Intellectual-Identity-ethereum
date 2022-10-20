const React = require('react');
import { render, screen, cleanup, renderHook, fireEvent } from '@testing-library/react';
import { TransactionsProvider } from '../../../context/TransactionContext';
import Ipregister from '../Ipregister';

const MockIpregister = () => {
    return (
        <TransactionsProvider>
            <Ipregister/>
        </TransactionsProvider>
    )
};

describe("IP registration form", ()=>{
    beforeEach(() => {
        render(<MockIpregister/>); 
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
    
    it('should have a change status form value correct', () => {   
        const buttonsElement = screen.getByTestId("status-check");
        fireEvent.click(buttonsElement);
        const input1Element = screen.getByPlaceholderText(/id number of the intellectual property/i);
        const input2Element = screen.getByPlaceholderText(/status number/i);
        const buttonElement = screen.getByRole("button", { name: /Submit/i});
        fireEvent.click(buttonElement);
        expect(screen.getByTestId("status-check")).toBeVisible();
    });    

});