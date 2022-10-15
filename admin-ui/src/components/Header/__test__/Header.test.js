import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../Header';
import { createMemoryHistory } from 'history';
import { BrowserRouter } from 'react-router-dom';

const TestHeader = () => {
   return (
   <BrowserRouter>
      <Header />
   </BrowserRouter>
   )
};

describe("Header", ()=>{

    beforeAll(() => {
        console.log("Testing started");
    });
 
    afterAll(() => {
        console.log("Testing completed");
    });

    it('should render same text', () => {
    render(<TestHeader/>);
    const headingElement = screen.getByTestId("header-start");
    expect(headingElement).toBeInTheDocument();
    });

    it('should pass router path ips', () => {
        render(<TestHeader/>);
        const history = createMemoryHistory({ initialEntries: ['/'] });
        const linkElement = screen.getByText(/Ips/i);
        fireEvent.click(linkElement);
        expect(history.location.pathname).toBe('/');
    });

    it('should pass router path bidders', () => {
        render(<TestHeader/>);
        const history = createMemoryHistory({ initialEntries: ['/bidders'] });
        const linkElement = screen.getByText(/Bidders/i);
        fireEvent.click(linkElement);
        expect(history.location.pathname).toBe('/bidders');
    });

});