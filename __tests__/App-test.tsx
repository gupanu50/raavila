/**
 * @format
 */

//import 'react-native';
import React from 'react';
import App from '../src/App';
jest.mock('react-native-splash-screen', () => ({
  show: jest.fn(),
  hide: jest.fn(),
}));
// Note: test renderer must be required after react-native.
import {render} from '@testing-library/react-native'

it('renders correctly', () => {
  render(<App />);
});
