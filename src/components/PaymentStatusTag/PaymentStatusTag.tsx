import clsx from 'clsx';

export enum PaymentStatus {
  PENDING = 'pending',
  DONE = 'done',
  FAILED = 'failed',
}

interface Props {
  status: string
}

export function PaymentStatusTag({ status }: Props) {
  return (
    <div
      className={clsx('uppercase px-2.5 py-1 w-fit rounded-md font-bold', {
        'text-amber-500 bg-yellow-50': status === PaymentStatus.PENDING,
        'text-emerald-400 bg-emerald-50': status === PaymentStatus.DONE,
        'text-pink-700 bg-pink-50': status === PaymentStatus.FAILED,
      })}
    >
      {status}
    </div>
  );
}
