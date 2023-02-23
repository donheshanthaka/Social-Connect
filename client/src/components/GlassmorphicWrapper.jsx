import { Box } from "@mui/material"
import { styled } from "@mui/system"

const GlassmorphicWrapper = styled(Box)(({ theme }) => ({
  padding: "1.5rem 1.5rem 0.75rem 1.5rem",
  borderRadius: "0.75rem",
  background: "rgba(255, 255, 255, .1)",
  boxShadow: "0 25px 45px rgba(0 , 0, 0, .2)",
  border: "2px solid rgba(255, 255, 255, .5)",
  borderRight: "2px solid rgba(255, 255, 255, .2)",
  borderBottom: "2px solid rgba(255, 255, 255, .2)",
  backdropFilter: "blur(10px)",
}))

export default GlassmorphicWrapper