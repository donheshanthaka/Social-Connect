import { useState } from "react"
import {
  Box,
  Button,
  TextField,
  Typography,
  useTheme,
  Divider,
  useMediaQuery,
} from "@mui/material"
import EditOutlinedIcon from "@mui/icons-material/EditOutlined"
import CircularProgress from '@mui/material/CircularProgress';
import { Formik } from "formik"
import * as yup from "yup"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setLogin } from "state/state"
import Dropzone from "react-dropzone"
import FlexBetween from "components/FlexBetween"
import { GoogleLogin } from "@react-oauth/google"
import jwt_dedcode from "jwt-decode"

const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
  picture: yup.string().required("required"),
})

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
})

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: "",
}

const initialValuesLogin = {
  email: "",
  password: "",
}

const Form = () => {
  const [pageType, setPageType] = useState("login")
  const [isLoading, setIsLoading] = useState(false)
  const { palette } = useTheme()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isLogin = pageType === "login"
  const isRegister = pageType === "register"
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)")

  const register = async (values, onSubmitProps) => {
    setIsLoading(true)
    // this allows us to send form info with image
    const formData = new FormData()
    for (let value in values) {
      formData.append(value, values[value])
    }
    formData.append("picturePath", values.picture.name)
    formData.append("type", "profileImage")

    const savedUserResponse = await fetch(
      `${process.env.REACT_APP_SERVER_URI}/auth/register`,
      {
        method: "POST",
        body: formData,
      }
    )
    const savedUser = await savedUserResponse.json()
    onSubmitProps.resetForm()

    if (savedUser) {
      setIsLoading(false)
      dispatch(
        setLogin({
          user: savedUser.savedNewUser,
          token: savedUser.token,
        })
      )
      navigate("/home")
    }
  }

  const login = async (values, onSubmitProps) => {
    setIsLoading(true)
    const loggedInResponse = await fetch(`${process.env.REACT_APP_SERVER_URI}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
    const loggedIn = await loggedInResponse.json()
    onSubmitProps.resetForm()
    if (loggedIn) {
      setIsLoading(false)
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      )
      navigate("/home")
    }
  }

  const googleAuth = async (response) => {
    setIsLoading(true)
    const decoded = jwt_dedcode(response.credential)
    const { family_name, given_name, email, picture, sub } = decoded
    const userData = {
      firstName: family_name,
      lastName: given_name,
      email: email,
      password: sub,
      picturePath: picture,
    }

    const userLogin = await fetch( `${process.env.REACT_APP_SERVER_URI}/auth/google`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    })
    const loggedIn = await userLogin.json()
    if (loggedIn) {
      setIsLoading(false)
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
        )
        navigate("/home")
    } else {
      setIsLoading(false)
    }
  }

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps)
    if (isRegister) await register(values, onSubmitProps)
  }

  return (
    <>
    {!isLoading? <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form
          onSubmit={handleSubmit}
          style={{
            width: "80%",
            display: "flex",
            flexDirection: "column",
            height: "50%",
          }}
        >
          <Box
            display="flex"
            flexDirection="column"
            gap="5px"
            height="50%"
          >
            {isRegister && (
              <>
              <Typography
            fontWeight="500"
            variant="h3"
            fontSize={isNonMobileScreens ? "1.5rem" : "1.2rem"}
            color={palette.neutral.main}
            sx={{ marginBottom: "2rem", textAlign: "center" }}
          >
            Join with our community
          </Typography>
                <TextField
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={
                    Boolean(touched.firstName) && Boolean(errors.firstName)
                  }
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: "span 2", height: "10%" }}
                />
                <TextField
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: "span 2", height: "10%" }}
                />
                <TextField
                  label="Location"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location}
                  name="location"
                  error={Boolean(touched.location) && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                  sx={{ gridColumn: "span 4", height: "10%" }}
                />
                <TextField
                  label="Occupation"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.occupation}
                  name="occupation"
                  error={
                    Boolean(touched.occupation) && Boolean(errors.occupation)
                  }
                  helperText={touched.occupation && errors.occupation}
                  sx={{ gridColumn: "span 4", height: "10%" }}
                />
                <Box
                  gridColumn="span 4"
                  border={`1px solid ${palette.neutral.medium}`}
                  borderRadius="5px"
                  p="1rem"
                >
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      setFieldValue("picture", acceptedFiles[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${palette.primary.main}`}
                        sx={{ "&:hover": { cursor: "pointer" } }}
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <p style={{ margin: "none" }}>Add Picture Here</p>
                        ) : (
                          <FlexBetween>
                            <Typography>{values.picture.name}</Typography>
                            <EditOutlinedIcon />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
              </>
            )}

            {!isRegister && (
              
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                textAlign="center"
                gap="10px"
              >
                <Typography
            fontWeight="500"
            variant="h5"
            fontSize={isNonMobileScreens ? "1.5rem" : "1.2rem"}
            color={palette.neutral.main}
            sx={{ marginBottom: "3rem", textAlign: "center" }}
          >
            Welcome to Social Connect, Social Media platform of the Next
            Generation!
          </Typography>
                <Divider color="black">
                  <Typography 
                  fontSize="1.2rem"
                  color={palette.neutral.main}
                  >
                    Continue with Google
                  </Typography>
                </Divider>
                <Box
                  display="flex"
                  justifyContent="center"
                  textAlign="center"
                  margin="0.5rem 0"
                >
                  <GoogleLogin
                    onSuccess={(response) => {
                      googleAuth(response)
                    }}
                    onError={() => console.log("error")}
                  />
                </Box>
                <Divider color="black" sx={{ mb: "0.5rem" }}>
                  <Typography 
                  fontSize="1.2rem"
                  color={palette.neutral.main}
                  >
                    Standard Login</Typography>
                </Divider>
              </Box>
            )}

            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4", height: "10%" }}
            />
            <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 4", height: "10%" }}
            />
          </Box>

          {/* BUTTONS */}
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
            >
              {isLogin ? "LOGIN" : "REGISTER"}
            </Button>
            <Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login")
                resetForm()
              }}
              sx={{
                textDecoration: "underline",
                color: palette.neutral.dark,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.neutral.main,
                },
              }}
            >
              {isLogin
                ? "Don't have an account? Sign Up here."
                : "Already have an account? Login here."}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>: 
    <Box
    width='100%'
    display="flex"
    flexDirection="column"
    justifyContent="space-between"
    alignItems="center"
    height="400px"
    >
    <Typography
            fontWeight="500"
            variant="h3"
            fontSize={isNonMobileScreens ? "1.5rem" : "1.2rem"}
            color={palette.neutral.main}
          >
            Loading...
          </Typography>
    <CircularProgress/>
    
    <Typography
            fontSize={isNonMobileScreens ? "0.9rem" : ".8rem"}
            color={palette.neutral.main}
            marginBottom={isNonMobileScreens? "0" : '2rem'}
          >
            Login / Registration could take up to a few seconds due to server limitations (free tier).
          </Typography>
          </Box>
    }
    </>
  )
}

export default Form
