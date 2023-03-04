import { Box, Typography, useTheme, useMediaQuery } from "@mui/material"
import { useSelector } from "react-redux"
import GlassmorphicWrapper from "components/GlassmorphicWrapper"
import Form from "../../components/AuthenticationForm"

const LoginPage = () => {
  const theme = useTheme()
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)")
  const mode = useSelector((state) => state.mode)

  let backgroundColor =
    mode === "dark"
      ? "linear-gradient(90deg, #2A5470 0%, #4C4177 100%)"
      : "linear-gradient(90deg, #8EC5FC 0%, #E0C3FC 100%)"

  return (
    <Box height="100vh">
      <Box
        width="100%"
        height="8%"
        backgroundColor={theme.palette.background.alt}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography
          fontWeight="bold"
          fontSize={
            isNonMobileScreens ? "calc(100% + 1vw)" : "calc(150% + 0.8vw)"
          }
          color="primary"
          textAlign="center"
        >
          Social Connect
        </Typography>
      </Box>

      <Box
        display="flex"
        justifyContent="space-evenly"
        alignItems="center"
        minHeight="92%"
        flexDirection={isNonMobileScreens ? "row" : "column"}
        sx={{ background: `${backgroundColor}` }}
      >
        {/* login start */}
        <GlassmorphicWrapper
          width={isNonMobileScreens ? "40%" : "80%"}
          p="2rem"
          mb="2rem"
          marginTop={isNonMobileScreens ? "2rem" : "2rem"}
          borderRadius="1.5rem"
          minHeight={isNonMobileScreens ? "80vh" : "40vh"}
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <Box
            display="flex"
            flexDirection="column"
            textAlign="center"
            justifyContent="center"
            alignItems="center"
            height="80%"
          >
            <Form></Form>
          </Box>
        </GlassmorphicWrapper>
        {/* login end */}
      </Box>
    </Box>
  )
}

export default LoginPage
