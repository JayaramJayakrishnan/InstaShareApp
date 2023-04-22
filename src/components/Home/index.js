import Header from '../Header'
import UserStories from '../UserStories'
import UserFeed from '../UserFeed'

import './index.css'

const Home = () => (
  <div className="home-bg-container">
    <Header activeTab="HOME" />
    <UserStories />
    <hr className="home-hr" />
    <UserFeed />
  </div>
)

export default Home
