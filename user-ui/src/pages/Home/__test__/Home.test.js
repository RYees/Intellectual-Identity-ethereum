import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import Home from '../Home';
import { createMemoryHistory } from 'history';
import { BrowserRouter } from 'react-router-dom';
import { TransactionsProvider } from '../../../context/TransactionContext';

// const TestFooter = () => {
//    return (
//    <BrowserRouter>
//       <Home />
//    </BrowserRouter>
//    )
// };
const MockHome = () => {
    return (
        <TransactionsProvider>
            <Home/>
        </TransactionsProvider>
    )
};

describe("Home", ()=>{

    beforeAll(() => {
        render(<MockHome/>);
        console.log("Testing started");
    });
 
    afterAll(() => {
        console.log("Testing completed");
    });

     // Cleanup mock
    afterEach(() => {
        cleanup();
    });

    it('should render same text', () => {
        const footElement = screen.getByTestId("section-one");
        expect(footElement).toBeInTheDocument();
    });

    // it('should render same text', () => {
    //     //const btnElement = screen.getByRole("button", { name: 'Connect Wallet'});
    //     const btnElement = screen.getByTestId("button-one");
    //     expect(btnElement).toBeInTheDocument();
    // });
   
});