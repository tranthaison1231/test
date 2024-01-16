import { render, screen } from '@testing-library/react';
import { Checkbox } from './Checkbox';

test('renders Checkbox component with the correct styles and attributes', () => {
  render(<Checkbox />);

  const checkboxElement = screen.getByRole('checkbox');
  expect(checkboxElement).toHaveClass(
    'relative w-5 h-5 appearance-none bg-none checked:bg-blue-600 bg-white border border-slate-300 rounded outline-none text-transparent ' +
      '!ring-offset-0 checked:border-blue-600 hover:border-blue-600 cursor-pointer transition-all duration-300 ease-in-out ' +
      'focus-visible:!outline-offset-2 focus-visible:!outline-2 focus-visible:!outline-sky-400/30 focus-visible:border-blue-600 ' +
      'after:w-[35%] after:h-[53%] after:absolute after:opacity-0 after:top-[40%] after:left-[50%] after:-translate-x-2/4 ' +
      'after:-translate-y-2/4 after:rotate-[25deg] after:drop-shadow-[1px_0.5px_1px_rgba(56,149,248,0.5)] after:border-r-[0.17em] ' +
      'after:border-r-white after:border-b-[0.17em] after:border-b-white after:transition-all after:duration-200 after:ease-linear ' +
      'checked:after:opacity-100 checked:after:rotate-45'
  );

  expect(checkboxElement).not.toBeChecked();
});

test('passes rest props to the checkbox element', () => {
  render(<Checkbox data-testid="custom-checkbox" />);
  const checkboxElement = screen.getByTestId('custom-checkbox');
  expect(checkboxElement).toBeInTheDocument();
});
