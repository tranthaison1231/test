import { fireEvent, render } from '@testing-library/react';
import { Popover } from './Popover';

describe('Popover', () => {
  test('renders children and content', () => {
    const { getByText } = render(
      <Popover content={<div>Popover Content</div>}>
        <div>Trigger Element</div>
      </Popover>
    );

    expect(getByText('Trigger Element')).toBeInTheDocument();
    expect(getByText('Popover Content')).toBeInTheDocument();
  });

  test('opens and closes on click', () => {
    const { getByText, queryByText } = render(
      <Popover content={<div>Popover Content</div>}>
        <div>Trigger Element</div>
      </Popover>
    );

    expect(queryByText('Popover Content')?.parentElement).toHaveClass('hidden');

    fireEvent.click(getByText('Trigger Element'));

    expect(getByText('Popover Content')).toBeInTheDocument();

    fireEvent.mouseDown(document.body);
    
    expect(queryByText('Popover Content')?.parentElement).toHaveClass('hidden');
  });

  test('does not close on click inside', () => {
    const { getByText, queryByText } = render(
      <Popover content={<div>Popover Content</div>}>
        <div>Trigger Element</div>
      </Popover>
    );

    fireEvent.click(getByText('Trigger Element'));

    fireEvent.click(getByText('Popover Content'));

    expect(queryByText('Popover Content')?.parentElement).not.toHaveClass('hidden');
  });
});
