const sortPosts = (posts) => {
  const currentDate = new Date()
  const sortedPosts = [...posts].sort((a, b) => {
    const postADate = new Date(a.createdAt)
    const postBDate = new Date(b.createdAt)
    if (postBDate - postADate !== 0) {
      return postBDate - postADate
    }
    const diffTime = currentDate - postADate
    const diffTimeB = currentDate - postBDate
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    const diffDaysB = Math.ceil(diffTimeB / (1000 * 60 * 60 * 24))
    if (diffDays !== diffDaysB) {
      return diffDays - diffDaysB
    }
    return Object.keys(b.likes).length - Object.keys(a.likes).length
  })
  return sortedPosts
}

export default sortPosts
