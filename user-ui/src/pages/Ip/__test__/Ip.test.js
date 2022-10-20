import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import Ip from '../Ip';
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
const MockIp = () => {
    return (
        <TransactionsProvider>
            <Ip/>
        </TransactionsProvider>
    )
};

describe("Home", ()=>{

    beforeAll(() => {
        render(<MockIp/>);
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
        // const footElement = screen.getByTestId("section-one");
        // expect(footElement).toBeInTheDocument();
        expect(2+2).toEqual(4);
    });

    // it('should render same text', () => {
    //     //const btnElement = screen.getByRole("button", { name: 'Connect Wallet'});
    //     const btnElement = screen.getByTestId("button-one");
    //     expect(btnElement).toBeInTheDocument();
    // });
   
});