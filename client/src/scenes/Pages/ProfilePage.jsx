import { Box, useMediaQuery } from "@mui/material"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import Navbar from "components/Navbar"
import FriendListWidget from "scenes/widgets/FriendListWidget"
import PostsWidget from "scenes/widgets/PostsWidget"
import UserWidget from "scenes/widgets/UserWidget"
import EventsWidget from "scenes/widgets/EventsWidget"

const ProfilePage = () => {
  const [user, setUser] = useState(null)
  const { userId } = useParams()
  const token = useSelector((state) => state.token)
  const mode = useSelector((state) => state.mode)
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)")

  let backgroundColor =
    mode === "dark"
      ? "linear-gradient(90deg, #2A5470 0%, #4C4177 100%)"
      : "linear-gradient(90deg, #8EC5FC 0%, #E0C3FC 100%)"

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
    const data = await response.json()
    setUser(data)
  }

  useEffect(() => {
    getUser()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null

  return (
    <Box sx={{ background: `${backgroundColor}` }} minHeight="100vh">
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={userId} picturePath={user.picturePath} />
          <Box m="2rem 0" />
          <FriendListWidget userId={userId} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <PostsWidget userId={userId} isProfile />
        </Box>
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <EventsWidget></EventsWidget>
        </Box>
      </Box>
    </Box>
  )
}

export default ProfilePage
