


const Pagination = ({ currentPage, totalPages, onPageChange }) => {

    if (totalPages <= 1) return null;

    return (
        <div className="flex items-center justify-center gap-4 mt-8 mb-6">

            {/* Previous button */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg 
                hover:bg-blue-700 transition disabled:opacity-50 
                disabled:cursor-not-allowed"
            >
                ← Previous
            </button>

            {/* Page info */}
            <span className="text-white font-semibold">
                Page {currentPage} of {totalPages}
            </span>

            {/* Next button */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg 
                hover:bg-blue-700 transition disabled:opacity-50 
                disabled:cursor-not-allowed"
            >
                Next →
            </button>

        </div>
    );
};

export default Pagination;