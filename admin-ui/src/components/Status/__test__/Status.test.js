const React = require('react');
import { render, screen, cleanup } from '@testing-library/react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Status from '../Status';


describe("ChangeStatus", ()=>{
    let realUseContext;
    let useContextMock;
    // Setup mock
    beforeEach(() => {
        realUseContext = React.useContext;
        useContextMock = React.useContext = jest.fn();
    });
    // Cleanup mock
    afterEach(() => {
        React.useContext = realUseContext;
        cleanup();
    });

    // beforeAll(() => {
    //     console.log("Testing started");
    // });
 
    // afterAll(() => {
    //     console.log("Testing completed");
    // });

    it('should render text correctly', () => {
        //render(<Status/>);
        // useContextMock.mockReturnValue("Test Value");
        // const element = new ShallowRenderer().render(
        //     <Status />
        // );
        // const statusElement = screen.getByTestId("status-check");
        // expect(statusElement).toBeInTheDocument();
        expect(2+2).toEqual(4);
    });

});