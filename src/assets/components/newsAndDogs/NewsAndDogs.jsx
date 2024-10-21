import news from "../../../database/news";
import "./newsAndDogs.scss";

const NewsAndDogs = () => {
  return (
    <>
      <section id="newsdogs">
        <h2>News & dogs</h2>
        <div className="flex justify-center gap-8">
          {news.map((post, i) => (
            <div key={`homeNews${i}`} className="newsCard-home">
              <figure>
                <img src={post.image_path} alt="" />
              </figure>

              <h3>{post.title}</h3>
              <p className="date my-4">
                {post.date} {post.comment}
              </p>
              <p className="description my-4">{post.title}</p>
              <a className="readmore" href="">
                Read More »
              </a>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};
export default NewsAndDogs;
