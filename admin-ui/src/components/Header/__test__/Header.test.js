import { render, screen } from '@testing-library/react';
import Header from '../Header';

describe("Header", ()=>{

    beforeAll(() => {
        console.log("Testing started");
    });

 
    afterAll(() => {
        console.log("Testing completed");
    });

    it('should render same text passed into title prop', () => {
    render(<Header/>);
    const headingElement = screen.getByTestId("header-start");
    expect(headingElement).toBeInTheDocument();
    });

    // //getByRole only looks for one matching element, if it found more it will throw an error
    // it('renders app heading by the h2 tag found in the Header component with name of the heading that is `TestName`', () => {
    //     render(<Header title="My Header"/>);
    //     const headingElement = screen.getByRole("heading", {name: 'FakeName'});
    //     expect(headingElement).toBeInTheDocument();
    // });

    // it('renders app heading by the header tag found in the Header component with name of the heading that is `My Header` ', () => {
    //     render(<Header title="My Header"/>);
    //     // we made the change below is because there are two headings in the Header component and since getByRole only work for returning one element we specify a single heading declaration so that it cna only found one match where the title is now 'My Header'
    //     const headingElement = screen.getByRole("heading", {name: 'My Header'});
    //     expect(headingElement).toBeInTheDocument();
    // });


    // it('renders app heading by the header tag found in the Header component with the title name `header`', async () => {
    //     render(<Header title="My Header"/>);
    //     const headingElement = screen.getByTitle("Header");
    //     expect(headingElement).toBeInTheDocument();
    // });


    // it('renders app heading by the test id that is assigned on the DOM elements of Header Components', async () => {
    //     render(<Header title="My Header"/>);
    //     const headingElement = screen.getByTestId("header-1");
    //     expect(headingElement).toBeInTheDocument();
    // });

    // //Find By 
    // it('renders app heading by the find by attribute', async () => {
    //     render(<Header title="My Header"/>);
    //     const headingElement = await screen.findByText(/my header/i);
    //     expect(headingElement).toBeInTheDocument();
    // });

    // //QueryBy
    // it('renders app heading by the query by attribute', async () => {
    //     render(<Header title="My Header"/>);
    //     const headingElement = screen.queryByText(/FakeName/i);
    //     expect(headingElement).toBeInTheDocument();
    // });

    // it('renders app heading by the query by attribute', async () => {
    //     render(<Header title="My Header"/>);
    //     const headingElement = screen.queryByText(/my header/i);
    //     expect(headingElement).toBeInTheDocument();
    // });

    // it('renders app heading by the get by attribute, by shows the element is not found in the dom document', async () => {
    //     render(<Header title="My Header"/>);
    //     const headingElement = screen.queryByText(/dogs/i); //there is no dogs in the webpage but since i used queryBy, the testing will not throw an error, instead it just return a null value HOWEVER if i was using getBy it will throw an error before it goes to the next line
    //     expect(headingElement).not.toBeInTheDocument();
    // });

    // //getAllByRole
    // it('renders app heading by the getall by attribute', async () => {
    //     render(<Header title="My Header"/>);
    //     const headingElements = screen.getAllByRole("heading"); //getAllByRole returns and array
    //     expect(headingElements.length).toBe(3);
    // });

});