import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
} from "@mui/icons-material"
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material"
import FlexBetween from "components/FlexBetween"
import Member from "components/Member"
import GlassmorphicWrapper from "components/GlassmorphicWrapper"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setPost } from "state/state"

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
  createdAt,
}) => {
  const [isComments, setIsComments] = useState(false)
  const dispatch = useDispatch()
  const token = useSelector((state) => state.token)
  const loggedInUserId = useSelector((state) => state.user._id)
  const isLiked = Boolean(likes[loggedInUserId])
  const likeCount = Object.keys(likes).length

  const getDate = (postDate) => {
    const currentDateTime = new Date()
    const postCreatedDateTime = new Date(postDate)
    const diffInMilliseconds = currentDateTime - postCreatedDateTime
    const diffInSeconds = parseInt(diffInMilliseconds / 1000)
    const diffInMinutes = parseInt(diffInMilliseconds / (1000 * 60))
    const diffInHours = parseInt(diffInMilliseconds / (1000 * 60 * 60))
    const diffInDays = parseInt(diffInMilliseconds / (1000 * 60 * 60 * 24))
    const diffInWeeks = parseInt(diffInDays / 7)

    if (diffInDays > 6) {
      return `${diffInWeeks}w`
    } else if (diffInDays > 0) {
      return `${diffInDays}d`
    } else {
      if (diffInHours > 0) {
        return `${diffInHours}h`
      } else {
        if (diffInMinutes > 0) {
          return `${diffInMinutes} min`
        } else if (diffInSeconds > 0) {
          return `${diffInSeconds} sec`
        } else {
          return "posted now"
        }
      }
    }
  }

  const postCreatedDate = getDate(createdAt)

  const { palette } = useTheme()
  const main = palette.neutral.main
  const primary = palette.primary.main

  const patchLike = async () => {
    const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    })
    const updatedPost = await response.json()
    dispatch(setPost({ post: updatedPost }))
  }

  return (
    <GlassmorphicWrapper mb="2rem">
      <Member
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={picturePath}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined fontSize="large" sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined fontSize="large" sx={{ color: main }} />
              )}
            </IconButton>
            <Typography color={main}>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        <Typography padding="8px" fontSize="1rem" color={main}>
          {postCreatedDate}
        </Typography>
      </FlexBetween>
      {isComments && (
        <Box mt="0.5rem">
          {comments.map((comment, i) => (
            <Box key={`${name}-${i}`}>
              <Divider />
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                {comment}
              </Typography>
            </Box>
          ))}
          <Divider />
        </Box>
      )}
    </GlassmorphicWrapper>
  )
}

export default PostWidget
