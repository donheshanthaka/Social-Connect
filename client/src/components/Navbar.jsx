import { useState } from "react"
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
  Button,
} from "@mui/material"
import {
  DarkMode,
  LightMode,
  Notifications,
  Menu,
  Close,
} from "@mui/icons-material"
import MapsUgcIcon from "@mui/icons-material/MapsUgc"
import AssignmentIcon from "@mui/icons-material/Assignment"
import { useDispatch, useSelector } from "react-redux"
import { setMode, setLogout } from "state/state"
import { useNavigate } from "react-router-dom"
import FlexBetween from "components/FlexBetween"
import LogoutIcon from "@mui/icons-material/Logout"

const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)")

  const theme = useTheme()
  const neutralLight = theme.palette.neutral.light
  const dark = theme.palette.neutral.dark
  const background = theme.palette.background.default
  const alt = theme.palette.background.alt

  const name = `${user.lastName}`

  return (
    <FlexBetween padding="1rem 6%" backgroundColor={alt} width="100%">
      <FlexBetween gap="1.75rem">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1.3rem, 2vw, 2rem)"
          color="primary"
          paddingLeft="1rem"
          onClick={() => navigate("/home")}
          sx={{
            "&:hover": {
              cursor: "pointer",
            },
          }}
        >
          Social Connect
        </Typography>
      </FlexBetween>

      {/* DESKTOP NAVIGATION */}
      {isNonMobileScreens ? (
        <FlexBetween gap="2rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (
              <LightMode sx={{ color: dark, fontSize: "25px" }} />
            )}
          </IconButton>
          <MapsUgcIcon sx={{ fontSize: "25px" }} />
          <Notifications sx={{ fontSize: "25px" }} />
          <AssignmentIcon sx={{ fontSize: "25px" }} />
          <FormControl variant="standard" value={name}>
            <Select
              value={name}
              sx={{
                backgroundColor: neutralLight,
                width: "150px",
                borderRadius: "0.25rem",
                p: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight,
                },
              }}
              input={<InputBase />}
            >
              <MenuItem value={name}>
                <Typography>{name}</Typography>
              </MenuItem>
              <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>
      ) : (
        <>
          <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            width="40%"
          >
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Menu />
            </IconButton>
          </Box>
        </>
      )}

      {/* MOBILE NAVIGATION */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="500px"
          minWidth="300px"
          backgroundColor={background}
        >
          {/* CLOSE ICON */}
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Close />
            </IconButton>
          </Box>

          {/* MENU ITEMS */}
          <FlexBetween
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="3rem"
          >
            <IconButton onClick={() => dispatch(setMode())}>
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: "25px" }} />
              )}
            </IconButton>
            <MapsUgcIcon sx={{ fontSize: "25px" }} />
            <Notifications sx={{ fontSize: "25px" }} />
            <AssignmentIcon sx={{ fontSize: "25px" }} />
            <Button>
              <LogoutIcon
                sx={{ fontSize: "25px" }}
                onClick={() => dispatch(setLogout())}
              ></LogoutIcon>
            </Button>
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  )
}

export default Navbar
