import { render } from '@testing-library/react';
import Card from './Card';

test('renders Card component with the correct styles and content', () => {
  const contentText = 'Hello, Test!';
  const { getByText, getByTestId } = render(<Card>{contentText}</Card>);

  const cardElement = getByTestId('card');
  expect(cardElement).toHaveClass('bg-white rounded-md border p-4');

  expect(getByText(contentText)).toBeInTheDocument();
});
