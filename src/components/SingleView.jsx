import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";

const SingleView = ({ data }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundProduct = data.find((p) => p.id === id);
    setTimeout(() => {
      setProduct(foundProduct);
      setLoading(false);
    }, 300);
  }, [id, data]);

  if (loading) {
    return (
      <div className="flex justify-center items-center vh-100">
        <div className="f3">Loading artwork details...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="tc pa5">
        <h1 className="f1 red">404</h1>
        <p className="f3">Artwork not found</p>
        <Link to="/" className="bg-blue white pa2 br2 pointer no-underline">
          Go Back Home
        </Link>
      </div>
    );
  }

  const imageUrl = product.urls?.regular || product.urls?.full || "https://picsum.photos/800/600";
  const title = product.description || product.alt_description || "Untitled";
  const artist = product.user?.name || "Unknown Artist";
  const artistBio = product.user?.bio || "No bio available";
  const artistLocation = product.user?.location || "Location unknown";
  const likes = product.likes || 0;
  const createdAt = product.created_at ? new Date(product.created_at).toLocaleDateString() : "Unknown date";
  const tags = product.tags?.map(tag => tag.title).slice(0, 10) || [];

  return (
    <div className="container mx-auto pa4">
      <button onClick={() => navigate(-1)} className="bg-light-gray pa2 br2 mb4 pointer bn">
        ← Back to Gallery
      </button>

      <div className="flex flex-wrap">
        {/* Left Column - Image */}
        <div className="w-100 w-50-ns pr4">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-100 br3 shadow-2" 
          />
        </div>

        {/* Right Column - Details */}
        <div className="w-100 w-50-ns pl4">
          <h1 className="f1 mt0">{title}</h1>
          
          <div className="flex items-center mt2 mb3">
            <p className="f3 gray mb0 mr3">by {artist}</p>
            <p className="f4 red b">❤️ {likes.toLocaleString()} likes</p>
          </div>

          <div className="mt4">
            <h3 className="f4 mb2">About the Artist</h3>
            <p className="f5 lh-copy gray">{artistBio}</p>
            <p className="f6 mt1 gray">📍 {artistLocation}</p>
            <p className="f6 gray">📅 Uploaded: {createdAt}</p>
          </div>

          {tags.length > 0 && (
            <div className="mt4">
              <h3 className="f4">Tags</h3>
              <div className="flex flex-wrap">
                {tags.map((tag, idx) => (
                  <span key={idx} className="bg-light-gray br-pill ph3 pv2 mr2 mb2">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mt4 pt3 bt b--light-silver">
            <p className="f6 gray">
              📸 Photo by <a href={product.user?.links?.html} target="_blank" rel="noopener noreferrer" className="blue">
                {artist} on Unsplash
              </a>
            </p>
          </div>

          <button className="mt4 bg-green white pa3 br2 f4 pointer w-100 bn">
            ❤️ Like this artwork ({likes.toLocaleString()} likes)
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleView;