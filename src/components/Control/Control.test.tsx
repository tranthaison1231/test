import { render, screen, fireEvent } from '@testing-library/react';
import { Control } from './Control';

test('renders Control component with the correct controls', () => {
  const mockOnArchive = vi.fn();

  render(<Control onArchive={mockOnArchive} />);

  const archiveControl = screen.getByText('Archive');
  const redoControl = screen.getByText('Redo');
  const downloadControl = screen.getByText('Download');
  const detailControl = screen.getByText('Detail');
  const tagControl = screen.getByText('Tag');
  const createControl = screen.getByText('Create');
  const trashControl = screen.getByText('Trash');

  expect(archiveControl).toBeInTheDocument();
  expect(redoControl).toBeInTheDocument();
  expect(downloadControl).toBeInTheDocument();
  expect(detailControl).toBeInTheDocument();
  expect(tagControl).toBeInTheDocument();
  expect(createControl).toBeInTheDocument();
  expect(trashControl).toBeInTheDocument();

  fireEvent.click(archiveControl);
  expect(mockOnArchive).toHaveBeenCalled();
});
