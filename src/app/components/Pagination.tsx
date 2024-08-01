import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  indexOfFirstCharacter: number;
  indexOfLastCharacter: number;
  filteredCharacters: any[]; // Update this type as needed based on your character data structure
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  setCurrentPage,
  indexOfFirstCharacter,
  indexOfLastCharacter,
  filteredCharacters,
}) => {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const startPages = [1, 2];
    const endPages = [totalPages - 2, totalPages - 1, totalPages];

    if (currentPage > 3) {
      pages.push(...startPages, "...");
    } else {
      for (let i = 1; i <= Math.min(currentPage + 1, 3); i++) {
        pages.push(i);
      }
    }

    if (currentPage > 3 && currentPage < totalPages - 2) {
      pages.push(currentPage - 1, currentPage, currentPage + 1);
    }

    if (currentPage >= totalPages - 2) {
      for (let i = currentPage - 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else if (currentPage < totalPages - 2) {
      pages.push("...", ...endPages);
    }

    return Array.from(new Set(pages));
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-between bg-gray-800 px-4 py-3 sm:px-6 ">
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-300">
            Showing{" "}
            <span className="font-medium">{indexOfFirstCharacter + 1}</span> to{" "}
            <span className="font-medium">
              {Math.min(indexOfLastCharacter, filteredCharacters.length)}
            </span>{" "}
            of <span className="font-medium">{filteredCharacters.length}</span>{" "}
            results
          </p>
        </div>
      </div>
      <nav
        aria-label="Pagination"
        className="isolate inline-flex -space-x-px rounded-md shadow-sm"
      >
        <button
          onClick={() =>
            setCurrentPage((prev: number) => Math.max(prev - 1, 1))
          }
          className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
            currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
          }`}
          disabled={currentPage === 1}
        >
          <span className="sr-only">Previous</span>
          <FaChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>
        {pageNumbers.map((page, index) =>
          typeof page === "number" ? (
            <button
              key={index}
              onClick={() => setCurrentPage(page)}
              className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                currentPage === page
                  ? "bg-indigo-600 text-white"
                  : "text-gray-50 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 hover:text-black focus:z-20 focus:outline-offset-0"
              }`}
            >
              {page}
            </button>
          ) : (
            <span
              key={index}
              className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-50"
            >
              ...
            </span>
          )
        )}
        <button
          onClick={() =>
            setCurrentPage((prev: number) => Math.min(prev + 1, totalPages))
          }
          className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
            currentPage === totalPages ? "cursor-not-allowed opacity-50" : ""
          }`}
          disabled={currentPage === totalPages}
        >
          <span className="sr-only">Next</span>
          <FaChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </nav>
    </div>
  );
};

export default Pagination;
