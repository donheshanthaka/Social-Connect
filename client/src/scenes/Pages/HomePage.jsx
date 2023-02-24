import { Box, useMediaQuery } from "@mui/material"
import { useSelector } from "react-redux"
import Navbar from "components/Navbar"
import UserWidget from "scenes/widgets/UserWidget"
import MembersWidget from "scenes/widgets/MembersWidget"
import EventsWidget from "scenes/widgets/EventsWidget"

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)")
  const { _id, picturePath } = useSelector((state) => state.user)
  const mode = useSelector((state) => state.mode)

  let backgroundColor =
    mode === "dark"
      ? "linear-gradient(90deg, #2A5470 0%, #4C4177 100%)"
      : "linear-gradient(90deg, #8EC5FC 0%, #E0C3FC 100%)"

  return (
    <Box sx={{ background: `${backgroundColor}` }} minHeight="100vh">
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <EventsWidget />
            <Box m="2rem 0" />
            <MembersWidget></MembersWidget>
          </Box>
        )}

        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        ></Box>

        {isNonMobileScreens && (
          <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
            <UserWidget userId={_id} picturePath={picturePath} />
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default HomePage
