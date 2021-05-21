import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import OrdersList from './OrdersList';

describe('<OrdersList />', () => {
  test('it should mount', () => {
    render(<OrdersList />);
    
    const ordersList = screen.getByTestId('OrdersList');

    expect(ordersList).toBeInTheDocument();
  });
});