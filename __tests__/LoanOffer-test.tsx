import React from 'react';
import {render, fireEvent,screen} from '@testing-library/react-native';
import LoanOffer from '@/Screens/Loan/LoanOffer/index';
const navigationMock = {navigate: jest.fn()};
describe('LoanOffer', () => {
  it('should render a list of loan offers', () => {
    const {getByText,debug, getByTestId} = render(<LoanOffer navigation = {navigationMock}/>);
    expect(getByTestId('id_0')).toBe('Offer Name')
  });

  it('should navigate to the apply loan screen when the "Apply Now" button is pressed', () => {
    const data = [1,2,3,4]
    const {getByText, getByTestId,debug} = render(<LoanOffer navigation={navigationMock} />);
    const applyNowButton = getByTestId('x_0');
    debug();
    fireEvent.press(applyNowButton);
    data.forEach(element => {
        expect(navigationMock.navigate).toHaveBeenCalledWith("applyloan");
    });
   
  });
});