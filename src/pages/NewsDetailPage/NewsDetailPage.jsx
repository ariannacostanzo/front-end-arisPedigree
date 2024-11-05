import "./newsDetailPage.scss";
import { Link, useParams } from "react-router-dom";
import news from "../../database/news";
import Heading from "../../assets/components/heading/Heading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments, faPaw } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../providers/authProvider";

const NewsDetailPage = () => {
  const {userName} = useAuth();
  const { id } = useParams();

  return (
    <>
      <Heading heading={news[id].title}></Heading>
      <div className="bg-white">
        <div className="container p-4 mx-auto news-detail-container lg:flex justify-between items-start">
          <div className="news-container">
            <h3>{news[id].title}</h3>
            <p className="comment-date">
              <FontAwesomeIcon
                icon={faPaw}
                className="text-[#F9BE4F] text-2xl mr-2"
              ></FontAwesomeIcon>
              {news[id].date}
              <FontAwesomeIcon
                icon={faComments}
                className="ml-2 text-xl"
              ></FontAwesomeIcon>
              <span className="ml-2">(0)</span>
            </p>
            <figure>
              <img src={news[id].image_path} alt="" />
            </figure>
            <p
              className="text-[#525252]"
              dangerouslySetInnerHTML={{ __html: news[id].description }}
            >
            </p>
            <div className="comment-container">
              <h5>Leave a Reply</h5>
              {userName && (
                <p className="text-[#525252]">Logged in as {userName}. </p>
              )}
              <textarea name="" id="" placeholder="Your comment"></textarea>
              <button className="custom-btn">Post comment</button>
            </div>
          </div>
          <div className="side-container">
            <h4>Search</h4>
            <div className="p-2 my-4">searchbar come sopra</div>
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
            <div className="p-2 my-4 text-[#535353] font-bold">
              No categories
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default NewsDetailPage;
