import "./newsDetailPage.scss";
import { useParams } from "react-router-dom";
import news from "../../database/news";
import Heading from "../../assets/components/heading/Heading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments, faPaw } from "@fortawesome/free-solid-svg-icons";
// import { useAuth } from "../../providers/authProvider";
import Sidebar from "../../assets/components/sidebar/Sidebar";

const NewsDetailPage = () => {
  // const { user } = useAuth();
  const { id } = useParams();

  return (
    <>
      <Heading></Heading>
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
            ></p>
            {/* <div className="comment-container">
              <h5>Leave a Reply</h5>
              {user?.name && (
                <p className="text-[#525252]">Logged in as {user.name}. </p>
              )}
              <textarea name="" id="" placeholder="Your comment"></textarea>
              <button className="custom-btn">Post comment</button>
            </div> */}
          </div>
          <Sidebar></Sidebar>
        </div>
      </div>
    </>
  );
};
export default NewsDetailPage;
