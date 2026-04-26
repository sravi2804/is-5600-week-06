import { Link } from "react-router-dom";

const Card = ({ product }) => {
  // Extract data from the product object
  const imageUrl = product.urls?.small || product.urls?.regular || "https://picsum.photos/400/300";
  const title = product.description || product.alt_description || "Untitled";
  const artist = product.user?.name || "Unknown Artist";
  const likes = product.likes || 0;
  const tags = product.tags?.map(tag => tag.title).slice(0, 3) || [];

  return (
    <Link to={`/product/${product.id}`} className="no-underline">
      <div className="ba b--light-silver br3 ma3 pa3 shadow-1 bg-white" style={{ width: "280px", cursor: "pointer" }}>
        <img
          src={imageUrl}
          alt={title}
          className="w-100 br2"
          style={{ height: "200px", objectFit: "cover" }}
        />
        <div className="pa2">
          <h3 className="f5 mt2 mb1 dark-gray truncate">{title}</h3>
          <p className="f6 gray mb1">by {artist}</p>
          <p className="f6 red b">❤️ {likes.toLocaleString()} likes</p>
          {tags.length > 0 && (
            <div className="flex flex-wrap mt2">
              {tags.map((tag, idx) => (
                <span key={idx} className="bg-light-gray br-pill ph2 pv1 f7 mr1 mb1">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default Card;