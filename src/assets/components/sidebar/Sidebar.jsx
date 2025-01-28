import { Link } from "react-router-dom";
import news from "../../../database/news";
import "./Sidebar.scss";

const Sidebar = () => {
  return (
    <>
      <div className="side-container">
        {/* <h4>Search</h4>
        <div className="p-2 my-4">
          <SearchBar></SearchBar>
        </div> */}
        <h4>Recent posts</h4>
        <div className="p-2 my-4">
          {news.map((n, i) => (
            <div
              key={`latestNews${i}`}
              className="bg-white text-links mt-2 p-2 my-4"
            >
              <Link to={`/newsDetail/${i}`} target="_blank">
                <p>{n.title}</p>
              </Link>
            </div>
          ))}
        </div>

        {/* da fare pagina archivi commenti */}
        <h4>Archives</h4>
        <div className="p-2 my-4 text-links">December 2022</div>
        <h4>Categories</h4>
        <div className="p-2 my-4 text-[#535353] font-bold">No categories</div>
      </div>
    </>
  );
};
export default Sidebar;
