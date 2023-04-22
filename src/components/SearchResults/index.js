import Post from '../Post'
import SearchNotFound from '../SearchNotFound'

import './index.css'

const SearchResults = props => {
  const {data} = props

  if (data.length === 0) {
    return <SearchNotFound />
  }

  return (
    <>
      <h1 className="search-results-heading">Search Results</h1>
      <ul className="search-results-container">
        {data.map(item => (
          <Post postData={item} key={item.postId} />
        ))}
      </ul>
    </>
  )
}

export default SearchResults
