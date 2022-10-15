import { render, screen } from '@testing-library/react';
import Footer from '../Footer';

describe("Header", ()=>{

    beforeAll(() => {
        console.log("Testing started");
    });

 
    afterAll(() => {
        console.log("Testing completed");
    });

    it('should render same text passed into title prop', () => {
    render(<Footer/>);
    const footerElement = screen.getByTestId("footer-end");
    expect(footerElement).toBeInTheDocument();
    });

});