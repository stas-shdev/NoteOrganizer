import { useState, useEffect } from 'react'

const useSearchedSortedPosts = (posts, stateSort, search) => {
  const [sortedPosts, setSortedPosts] = useState([...posts])
  const [searchedSortedPosts, setSearchedSortedPosts] = useState([])
  useEffect(() => {
    if (stateSort) {
      setSortedPosts([...posts].map(group => {
        const copyGroup = { ...group }
        const copyPosts = [...group.posts]
        copyGroup.posts = copyPosts.sort((a, b) => a[stateSort].localeCompare(b[stateSort]));
        return copyGroup
      }))
    } else { setSortedPosts([...posts]) }
  }, [posts, stateSort])

  useEffect(() => setSearchedSortedPosts([...sortedPosts].map(group => {
    const copyGroup = { ...group }
    copyGroup.posts = copyGroup.posts.filter(post => post["title"] ? post["title"].includes(search): false)
    return copyGroup
  })), [sortedPosts, search])
  return searchedSortedPosts
}

export default useSearchedSortedPosts
