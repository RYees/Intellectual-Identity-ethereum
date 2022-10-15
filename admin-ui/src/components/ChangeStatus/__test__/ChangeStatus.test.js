import { render, screen } from '@testing-library/react';
import ChangeStatus from '../ChangeStatus';

describe("ChangeStatus", ()=>{

    beforeAll(() => {
        console.log("Testing started");
    });

 
    afterAll(() => {
        console.log("Testing completed");
    });

    it('should render same text passed into title prop', () => {
    render(<ChangeStatus />);
    const statusElement = screen.getByTestId("status-check");
    expect(statusElement).toBeInTheDocument();
    });

});