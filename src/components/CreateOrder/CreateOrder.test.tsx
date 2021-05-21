import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CreateOrder from './CreateOrder';

describe('<CreateOrder />', () => {
  test('it should mount', () => {
    render(<CreateOrder />);
    
    const createOrder = screen.getByTestId('CreateOrder');

    expect(createOrder).toBeInTheDocument();
  });
});