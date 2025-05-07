
type Props = {
  page: number;
  pages: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({ page, pages, onPageChange }: Props) => {
  const pageNumbers = [];
  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="w-full flex justify-center mt-6">
      <ul className="flex flex-wrap gap-2 border border-slate-300 rounded-md p-2 bg-white shadow-sm">
        {pageNumbers.map((p) => (
          <li key={p}>
            <button
              onClick={() => onPageChange(p)}
              className={`px-3 py-1 rounded-md border transition-all duration-150 
                ${
                  page === p
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-white text-gray-800 hover:bg-gray-100 border-gray-300"
                }`}
            >
              {p}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
