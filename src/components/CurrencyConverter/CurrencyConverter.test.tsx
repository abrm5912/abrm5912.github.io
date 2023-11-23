import { CurrencyConverter } from './CurrencyConverter';
import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

describe('CurrencyConverter', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CurrencyConverter/>);
    expect(baseElement).toBeTruthy();
  });
  it('should render two number inputs', () => {
    const { getAllByRole } = render(<CurrencyConverter />);
    expect(getAllByRole('spinbutton').length).toBe(2);
  });
  it('should render two selects', () => {
    const { getAllByRole } = render(<CurrencyConverter />);
    expect(getAllByRole('combobox').length).toBe(2);
  });
  it('should render one reverse icon', () => {
    const { getAllByTestId } = render(<CurrencyConverter />);
    expect(getAllByTestId('reverse').length).toBe(1);
  });
  it('should render one flex', () => {
    const { getAllByTestId } = render(<CurrencyConverter />);
    expect(getAllByTestId('currency-converter').length).toBe(1);
  });
  it('renders currency converter and changes an input value', async () => {
    render(<CurrencyConverter />);

    expect(screen.getByTestId('currency-converter')).toBeInTheDocument();
    expect(screen.getByTestId('sourceAmount')).toBeInTheDocument();
    expect(screen.getByTestId('sourceCurrency')).toBeInTheDocument();
    expect(screen.getByTestId('reverse')).toBeInTheDocument();


    expect(screen.getByTestId('sourceAmount')).toHaveValue('');
    act(() => {
      userEvent.type(screen.getByTestId('sourceAmount'), '50');
      userEvent.click(screen.getByTestId('reverse'));
      expect(screen.getByTestId('sourceAmount')).toHaveValue('50');
    })
  });
});
