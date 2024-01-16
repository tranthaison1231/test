import { fireEvent, render } from '@testing-library/react';
import Table from './Table';

vi.mock('../Icon', () => ({
  Sort: () => <span>Sort Icon</span>,
  Archive: () => <span>Archive Icon</span>,
  Redo: () => <span>Redo Icon</span>,
  Download: () => <span>Download Icon</span>,
  Detail: () => <span>Detail Icon</span>,
  Tag: () => <span>Tag Icon</span>,
  Create: () => <span>Create Icon</span>,
  Trash: () => <span>Trash Icon</span>,
}));

interface TestData {
  id: string;
  name: string;
  age: number;
}

const columns = [
  { id: 'name', title: 'Name', sortable: true },
  { id: 'age', title: 'Age' },
];

const items = [
  { id: '1', name: 'John Doe', age: 25 },
  { id: '2', name: 'Jane Doe', age: 30 },
];

describe('Table', () => {
  test('renders table with correct headers and items', () => {
    const { getByText } = render(
      <Table columns={columns} items={items} selectedIds={[]} onSelect={() => {}} onArchive={() => {}} />
    );

    expect(getByText('Name')).toBeInTheDocument();
    expect(getByText('Age')).toBeInTheDocument();

    expect(getByText('John Doe')).toBeInTheDocument();
    expect(getByText('Jane Doe')).toBeInTheDocument();
    expect(getByText('25')).toBeInTheDocument();
    expect(getByText('30')).toBeInTheDocument();
  });


  test('handles sorting of columns', () => {
    const { getByText } = render(
      <Table columns={columns} items={items} selectedIds={[]} onSelect={() => {}} onArchive={() => {}} />
    );

    fireEvent.click(getByText('Name'));

    expect(getByText('Sort Icon')).toBeInTheDocument();
  });

  test('handles selection of items', () => {
    const onSelectMock = vi.fn();
    const { getByText } = render(
      <Table columns={columns} items={items} selectedIds={[]} onSelect={onSelectMock} onArchive={() => {}} />
    );

    fireEvent.click(getByText('John Doe').previousElementSibling?.firstElementChild as Element);
    fireEvent.click(getByText('Jane Doe').previousElementSibling?.firstElementChild as Element);

    expect(onSelectMock).toHaveBeenCalledWith(['2']);
    expect(onSelectMock).toHaveBeenCalledWith(['1']);
  });

   test('handles archive action', () => {
     const onArchiveMock = vi.fn();
     const { getByText } = render(
       <Table columns={columns} items={items} selectedIds={['1']} onSelect={() => {}} onArchive={onArchiveMock} />
     );

     expect(getByText('Archive')).toBeInTheDocument();

     fireEvent.click(getByText('Archive'));

     expect(onArchiveMock).toHaveBeenCalled();
   });
});
