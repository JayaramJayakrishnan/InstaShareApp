import Loader from 'react-loader-spinner'

import './index.css'

const LoadingView = () => (
  <div className="loader-container" data-testid="loader">
    <Loader type="TailSpin" color="#4094EF" height={30} width={30} />
  </div>
)

export default LoadingView
