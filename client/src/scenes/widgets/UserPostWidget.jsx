import {
  EditOutlined,
  DeleteOutlined,
  ImageOutlined,
} from "@mui/icons-material"
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
} from "@mui/material"
import FlexBetween from "components/FlexBetween"
import Dropzone from "react-dropzone"
import ProfileImage from "components/ProfileImage"
import GlassmorphicWrapper from "components/GlassmorphicWrapper"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setPosts } from "state/state"

const UserPostWidget = ({ picturePath }) => {
  const dispatch = useDispatch()
  const [isImage, setIsImage] = useState(false)
  const [image, setImage] = useState(null)
  const [post, setPost] = useState("")
  const { palette } = useTheme()
  const { _id } = useSelector((state) => state.user)
  const token = useSelector((state) => state.token)
  const medium = palette.neutral.medium
  const main = palette.neutral.main

  const handlePost = async () => {
    setIsImage(!isImage)
    const formData = new FormData()
    formData.append("userId", _id)
    formData.append("description", post)
    if (image) {
      formData.append("picture", image)
      formData.append("picturePath", image.name)
      formData.append("type", "post")
    }

    const response = await fetch(`${process.env.REACT_APP_SERVER_URI}/posts`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    })
    const posts = await response.json()
    dispatch(setPosts({ posts }))
    setImage(null)
    setPost("")
  }

  return (
    <GlassmorphicWrapper mb="2rem">
      <FlexBetween gap="1.5rem">
        <ProfileImage image={picturePath} />
        <InputBase
          placeholder="Share your memory with a caption..."
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
      </FlexBetween>
      {isImage && (
        <Box
          border={`1px solid ${medium}`}
          borderRadius="5px"
          mt="1rem"
          p="1rem"
        >
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p="1rem"
                  width="100%"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <p>Add Image Here</p>
                  ) : (
                    <FlexBetween>
                      <Typography>{image.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {image && (
                  <IconButton
                    onClick={() => setImage(null)}
                    sx={{ width: "15%" }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}

      <Divider sx={{ margin: "1.25rem 0" }} />

      <Box display="flex" alignItems="center" justifyContent="space-evenly">
        <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
          <ImageOutlined sx={{ color: main }} />
          <Typography
            color={main}
            sx={{ "&:hover": { cursor: "pointer", color: medium } }}
          >
            Image
          </Typography>
        </FlexBetween>

        <Button
          disabled={!post}
          onClick={handlePost}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
          }}
        >
          POST
        </Button>
      </Box>
    </GlassmorphicWrapper>
  )
}

export default UserPostWidget
