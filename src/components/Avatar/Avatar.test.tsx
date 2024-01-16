import { render } from '@testing-library/react';
import { Avatar, generateColor } from './Avatar';

test('renders Avatar component with the correct background color and initials', () => {
  const name = 'John Doe';
  const { getByText, getByTestId } = render(<Avatar name={name} />);

  const avatarElement = getByTestId('avatar');
  const expectedColor = `rgb(128, 92, 165)`;
  expect(avatarElement).toHaveStyle(`background-color: ${expectedColor}`);

  expect(getByText('JD')).toBeInTheDocument();
});
