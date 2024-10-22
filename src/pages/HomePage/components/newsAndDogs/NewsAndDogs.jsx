import { Link } from "react-router-dom";
import news from "../../../../database/news";
import "./newsAndDogs.scss";

const NewsAndDogs = () => {
  return (
    <>
      <section id="newsdogs">
        <h2>News & dogs</h2>
        <div className="lg:flex justify-center gap-8">
          {news.map((post, i) => (
            <div key={`homeNews${i}`} className="newsCard-home">
              <Link to="newsDetail">
                <figure>
                  <img src={post.image_path} alt="" />
                </figure>
              </Link>

              <Link to="newsDetail">
                <h3>{post.title}</h3>
              </Link>
              <p className="date my-4">
                {post.date} {post.comment}
              </p>
              <p className="description my-4">
                {post.description.slice(0, 200)}...
              </p>
              <Link className="readmore" to="newsDetail">
                Read More »
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};
export default NewsAndDogs;
