import { render } from '@testing-library/react';
import React from 'react';
import { ExchangeTable } from './ExchangeTable';

global.matchMedia = global.matchMedia || function () {
  return {
    addListener: jest.fn(),
    removeListener: jest.fn(),
  };
};

const mockData = [
  { ccy: 'USD', base_ccy: 'UAH', buy: 27.80000, sale: 28.20000 },
  { ccy: 'EUR', base_ccy: 'UAH', buy: 32.50000, sale: 33.20000 },
  { ccy: 'RUR', base_ccy: 'UAH', buy: 0.30000, sale: 0.39000 },
  { ccy: 'BTC', base_ccy: 'USD', buy: 10000, sale: 11000 },
];

describe('ExchangeTable', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  it('should render without error', () => {
    const { container } = render(<ExchangeTable data={mockData}/>);

    expect(container).toMatchSnapshot();
  });

  it('should render without data', () => {
    const { container } = render(<ExchangeTable data={undefined}/>);

    expect(container).toMatchSnapshot();
  });

  it('should render with empty data', () => {
    const { container } = render(<ExchangeTable data={[]}/>);

    expect(container).toMatchSnapshot();
  });
});
