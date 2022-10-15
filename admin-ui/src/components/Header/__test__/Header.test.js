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

    it('should render same text passed into title prop', () => {
    render(<TestHeader/>);
    const headingElement = screen.getByTestId("header-start");
    expect(headingElement).toBeInTheDocument();
    });

    it('should pass', () => {
        const history = createMemoryHistory({ initialEntries: ['/'] });
        // const { getByText } = render(
        //   <Router history={history}>
        //     <ButtonLogin />
        //   </Router>
        // );
        // expect(history.location.pathname).toBe('/home');
        fireEvent.click(getByText('Ips'));
        expect(history.location.pathname).toBe('/');
      });
    // it('renders app heading by the header tag found in the Header component with name of the heading that is `My Header` ', () => {
    //     render(<Header title="My Header"/>);
    //     // we made the change below is because there are two headings in the Header component and since getByRole only work for returning one element we specify a single heading declaration so that it cna only found one match where the title is now 'My Header'
    //     const headingElement = screen.getByRole("heading", {name: 'My Header'});
    //     expect(headingElement).toBeInTheDocument();
    // });


   
});