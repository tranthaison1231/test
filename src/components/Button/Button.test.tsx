import { render } from '@testing-library/react';
import { Button } from './Button';

test('renders Button component with the correct styles and content', () => {
  const buttonText = 'Click me';
  const { getByText, getByTestId } = render(<Button>{buttonText}</Button>);

  const buttonElement = getByTestId('button');
  expect(buttonElement).toHaveClass('bg-white rounded-md border p-2 h-9 flex items-center shadow border-slate-200');

  expect(getByText(buttonText)).toBeInTheDocument();
});
