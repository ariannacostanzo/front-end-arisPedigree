import { Link } from "react-router-dom";
import Heading from "../../assets/components/heading/Heading";
import news from "../../database/news";
import "./newspage.scss";

const NewsPage = () => {
  return (
    <>
      <Heading heading="News"></Heading>
      <div className="bg-white newspage-container">
        <div className="p-4 container mx-auto">
          <div className="lg:flex gap-10 justify-start">
            {news.map((n, i) => (
              <div key={`news${i}`} className="news-card mt-5 lg:basis-1/3 ">
                <img src={n.image_path} alt="" />
                <div className="px-5 pt-10 pb-2 gap-10 flex flex-col justify-between h-[52%]">
                  <div className="flex-grow">
                    <Link to={`/newsDetail/${i}`}>
                      <h3>{n.title}</h3>
                    </Link>
                    <p className="news-date">
                      {n.date} {n.comment}
                    </p>
                    <p className="news-description">
                      {n.description.slice(0, 150)}...
                    </p>
                  </div>
                  <Link to={`/newsDetail/${i}`} className="readmore">
                    Read more »
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default NewsPage;
