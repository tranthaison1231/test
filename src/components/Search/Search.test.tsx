import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Search } from './Search';

test('renders Search component with the correct styles and attributes', () => {
  render(<Search placeholder="Search..." />);

  const inputElement = screen.getByPlaceholderText('Search...');
  expect(inputElement).toHaveClass(
    'rounded-md p-2 pl-9 placeholder:text-[#8D9196] placeholder:text-xs border border-gray-200'
  );

  const searchIcon = screen.getByTestId('search-icon');
  expect(searchIcon).toBeInTheDocument();
});

test('passes rest props to the input element', () => {
  render(<Search placeholder="Search..." data-testid="search-input" />);

  const inputElement = screen.getByTestId('search-input');
  expect(inputElement).toHaveAttribute('placeholder', 'Search...');
});

