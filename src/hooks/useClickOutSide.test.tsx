import { renderHook, act } from '@testing-library/react-hooks';
import { useOnClickOutside } from './useClickOutSide';

test('should call handler when clicking outside the element', () => {
  const handler = vi.fn();
  const ref = { current: document.createElement('div') } as React.RefObject<HTMLDivElement>;

  renderHook(() => useOnClickOutside(ref, handler));

  act(() => {
    document.dispatchEvent(new MouseEvent('mousedown'));
  });

  expect(handler).toHaveBeenCalled();
});

test('should not call handler when clicking inside the element', () => {
  const handler = vi.fn();
  const ref = { current: document.createElement('div') } as React.RefObject<HTMLDivElement>;

  renderHook(() => useOnClickOutside(ref, handler));

  act(() => {
    ref.current?.dispatchEvent(new MouseEvent('mousedown'));
  });

  expect(handler).not.toHaveBeenCalled();
});
