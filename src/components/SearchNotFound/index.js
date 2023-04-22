import './index.css'

const SearchNotFound = () => (
  <div className="search-not-found-container">
    <img
      src="https://res.cloudinary.com/drm4jcovm/image/upload/v1681829317/Group_1_qhnqco.png"
      alt="search not found"
      className="search-not-found-image"
    />
    <h1 className="search-not-found-heading">Search Not Found</h1>
    <p className="search-not-found-text">
      Try different keyword or search again
    </p>
  </div>
)

export default SearchNotFound
