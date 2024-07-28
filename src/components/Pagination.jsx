import { useState, useEffect } from 'react';

const Pagination = ({
  countriesPerPage,
  totalCountries,
  paginate,
  prevPageBtn,
  currentPage,
  nextPageBtn,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalCountries / countriesPerPage); i++) {
    pageNumbers.push(i);
  }

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const renderPageNumbers = () => {
    if (windowWidth < 950) {
      const startIndex = Math.max(1, currentPage - 2);
      const endIndex = Math.min(pageNumbers.length, currentPage + 2);
      const pageNumbersToShow = pageNumbers.slice(startIndex - 1, endIndex);

      return (
        <ul>
          {currentPage > 1 && <button onClick={prevPageBtn}> Prev </button>}
          {pageNumbersToShow.map((pageNumber) => (
            <li key={pageNumber}>
              <button
                onClick={() => paginate(pageNumber)}
                className={currentPage === pageNumber ? 'active' : ''}
              >
                {pageNumber}
              </button>
            </li>
          ))}
          {currentPage < pageNumbers.length && (
            <li>
              <span className='dots'>...</span>
            </li>
          )}
          {currentPage < pageNumbers.length - 3 && (
            <li>
              <button onClick={() => paginate(pageNumbers.length)}>
                {pageNumbers.length}
              </button>
            </li>
          )}
          {currentPage < pageNumbers.length && <button onClick={nextPageBtn}>Next</button>}
        </ul>
      );
    } else {
      return (
        <ul>
          {currentPage > 1 && <button onClick={prevPageBtn}>Prev </button>}
          {pageNumbers.map((pageNumber) => (
            <li key={pageNumber}>
              <button
                onClick={() => paginate(pageNumber)}
                className={currentPage === pageNumber ? 'active' : ''}
              >
                {pageNumber}
              </button>
            </li>
          ))}
          {currentPage < pageNumbers.length && <button onClick={nextPageBtn}>Next </button>}
        </ul>
      );
    }
  };

  return (
    <div className="pagination">
      {renderPageNumbers()}
    </div>
  );
};

export default Pagination;
