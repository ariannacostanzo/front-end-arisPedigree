import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./pagination.scss";
import {
  faAnglesLeft,
  faAnglesRight,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useDogs } from "../../../providers/dogsProvider";
import axios from "../../../utils/axiosClient.js";

const Pagination = () => {
  const { setDogs, totalPages, page,  setLoading, setPage, setTotalPages} = useDogs();

  const changePage = (direction) => {
    let url = "/dogs";

    if (direction === "start") {
        url += `?page=${1}`;
    } else if (direction === "end") {
      url += `?page=${totalPages}`;
    } else if (direction === "forward") {
        url += `?page=${page + 1}`;
    } else if (direction === "back") {
        url += `?page=${page - 1}`;
    } else {
        url += `?page=${direction}`;
    }

    fetchNewDogs(url)
  };

  const fetchNewDogs = async (url) => {
    try {
        setLoading(true)
        const res = await axios.get(url);
        setDogs(res.data.data)
        setPage(res.data.page);
        setTotalPages(res.data.totalPages);
    } catch (error) {
        console.log(error)
    } finally {
        setLoading(false)
    }
  }

  return (
    <>
      <div className="bullet-container">
        {page > 1 && (
          <span onClick={() => changePage("start")}>
            <FontAwesomeIcon icon={faAnglesLeft}></FontAwesomeIcon>
          </span>
        )}
        {page > 1 && (
          <span onClick={() => changePage("back")}>
            <FontAwesomeIcon icon={faChevronLeft}></FontAwesomeIcon>
          </span>
        )}

        {/* numeri dinamici, uno prima, uno corrente, uno dopo */}
        {Array.from({ length: 3 }, (_, i) => {
          
          const pageNumber = Math.max(1, page - 1) + i;

          
          if (pageNumber > totalPages) return null;

          return (
            <span
              key={`bullet-${pageNumber}`}
              onClick={() => changePage(pageNumber)}
              className={pageNumber === page ? "current-page" : ""}
            >
              {pageNumber}
            </span>
          );
        })}

        {page !== totalPages && (
          <span onClick={() => changePage("forward")}>
            <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
          </span>
        )}

        {page !== totalPages && (
          <span onClick={() => changePage("end")}>
            <FontAwesomeIcon icon={faAnglesRight}></FontAwesomeIcon>
          </span>
        )}
      </div>
    </>
  );
};
export default Pagination;
