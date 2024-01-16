import { render } from '@testing-library/react';
import { PaymentStatusTag, PaymentStatus } from './PaymentStatusTag';

describe('PaymentStatusTag', () => {
  test('renders with correct styles for PENDING status', () => {
    const { getByText } = render(<PaymentStatusTag status={PaymentStatus.PENDING} />);
    const paymentStatusTag = getByText(PaymentStatus.PENDING);

    expect(paymentStatusTag).toHaveClass('text-amber-500 bg-yellow-50');
  });

  test('renders with correct styles for DONE status', () => {
    const { getByText } = render(<PaymentStatusTag status={PaymentStatus.DONE} />);
    const paymentStatusTag = getByText(PaymentStatus.DONE);

    expect(paymentStatusTag).toHaveClass('text-emerald-400 bg-emerald-50');
  });

  test('renders with correct styles for FAILED status', () => {
    const { getByText } = render(<PaymentStatusTag status={PaymentStatus.FAILED} />);
    const paymentStatusTag = getByText(PaymentStatus.FAILED);

    expect(paymentStatusTag).toHaveClass('text-pink-700 bg-pink-50');
  });

  test('renders with default styles for unknown status', () => {
    const unknownStatus = 'unknown';
    const { getByText } = render(<PaymentStatusTag status={unknownStatus} />);
    const paymentStatusTag = getByText(unknownStatus);

    expect(paymentStatusTag).toHaveClass('uppercase px-2.5 py-1 w-fit rounded-md font-bold');
  });
});
