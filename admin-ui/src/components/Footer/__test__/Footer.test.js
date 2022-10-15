import { render, screen, fireEvent } from '@testing-library/react';
import Footer from '../Footer';
import { createMemoryHistory } from 'history';
import { BrowserRouter } from 'react-router-dom';

const TestFooter = () => {
   return (
   <BrowserRouter>
      <Footer />
   </BrowserRouter>
   )
};

describe("Footer", ()=>{

    beforeAll(() => {
        console.log("Testing started");
    });
 
    afterAll(() => {
        console.log("Testing completed");
    });

    it('should render same text', () => {
        render(<TestFooter/>);
        const footElement = screen.getByTestId("footer-one");
        expect(footElement).toBeInTheDocument();
    });

    it('should render same text', () => {
        render(<TestFooter/>);
        const footElement = screen.getByTestId("footer-one-text");
        expect(footElement).toBeInTheDocument();
    });

    it('should render icons count length', () => {
        render(<TestFooter/>);
        const footElement = screen.getAllByTestId("icons");
        expect(footElement.length).toBe(3);
    });

    it('should render same text', () => {
        render(<TestFooter/>);
        const headingElement = screen.getByTestId("footer-three");
        expect(headingElement).toBeInTheDocument();
    });   
    
    it('should pass router path ips', () => {
        render(<TestFooter/>);
        const history = createMemoryHistory({ initialEntries: ['/'] });
        const footlinkElement = screen.getByTestId("footer-link-one");
        fireEvent.click(footlinkElement);
        expect(history.location.pathname).toBe('/');
    });

    it('should pass router path bidders', () => {
        render(<TestFooter/>);
        const history = createMemoryHistory({ initialEntries: ['/bidders'] });
        const footlinkElement = screen.getByTestId("footer-link-two");
        fireEvent.click(footlinkElement);
        expect(history.location.pathname).toBe('/bidders');
    });

    it('should render same text', () => {
        render(<TestFooter/>);
        const headingElement = screen.getByTestId("footer-four");
        expect(headingElement).toBeInTheDocument();
    });

    it('should render icons with className style', () => {
        render(<TestFooter/>);
        const footElement = screen.getByTestId("icon1");
        expect(footElement).toHaveClass('inline-block');
    });

    it('should render icons with className style', () => {
        render(<TestFooter/>);
        const footElement = screen.getByTestId("icon2");
        expect(footElement).toHaveClass('inline-block');
    });

    
});