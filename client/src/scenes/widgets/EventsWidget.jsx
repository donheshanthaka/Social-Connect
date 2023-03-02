import { Typography, useTheme } from "@mui/material"
import FlexBetween from "components/FlexBetween"
import GlassmorphicWrapper from "components/GlassmorphicWrapper"

const EventsWidget = () => {
  const { palette } = useTheme()
  const dark = palette.neutral.dark
  const main = palette.neutral.main

  return (
    <GlassmorphicWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Upcoming Events
        </Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src= {`${process.env.REACT_APP_SERVER_URI}/assets/trophy.jpg`}
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={dark}>Annual Award Ceremony</Typography>
      </FlexBetween>
      <Typography color={main} m="0.5rem 0">
        The moment where the most outstanding members are appriciated for their
        hardwork throught the year
      </Typography>
    </GlassmorphicWrapper>
  )
}

export default EventsWidget
