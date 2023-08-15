import { useCallback, useState } from 'react';

interface config {
  onPageChange?: () => void;
}

export const usePagination = ({ onPageChange }: config) => {
  const [page, setPage] = useState<number>(1);

  const handlePageChange = useCallback(
    async (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
      setPage(newPage);
      if (onPageChange) onPageChange();
    },
    [onPageChange]
  );

  return { page, handlePageChange };
};
