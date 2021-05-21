import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Invoices from './Invoices';

describe('<Invoices />', () => {
  test('it should mount', () => {
    render(<Invoices />);
    
    const invoices = screen.getByTestId('Invoices');

    expect(invoices).toBeInTheDocument();
  });
});