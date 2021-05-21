import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import OrderContainer from './OrderContainer';

describe('<OrderContainer />', () => {
  test('it should mount', () => {
    render(<OrderContainer />);
    
    const orderContainer = screen.getByTestId('OrderContainer');

    expect(orderContainer).toBeInTheDocument();
  });
});