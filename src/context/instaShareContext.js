import React from 'react'

const InstaShareContext = React.createContext({
  searchInput: '',
  changeSearchInput: () => {},
})

export default InstaShareContext
