"use client";

import styles from "./pagination.module.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Pagination = ({ count }) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const page = parseInt(searchParams.get("page")) || 1;
  const ITEM_PER_PAGE = 4; // Ensure this matches the backend value

  const totalPages = Math.ceil(count / ITEM_PER_PAGE);

  const hasPrev = page > 1;
  const hasNext = page < totalPages;

  const handleChangePage = (newPage) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage);
    replace(`${pathname}?${params}`);
  };

  return (
    <div className={styles.container}>
      <button
        className={`${styles.button} ${hasPrev ? styles.buttonPrev : ''}`}
        disabled={!hasPrev}
        onClick={() => handleChangePage(page - 1)}
      >
        Previous
      </button>
      <button
        className={`${styles.button} ${hasNext ? styles.buttonNext : ''}`}
        disabled={!hasNext}
        onClick={() => handleChangePage(page + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
