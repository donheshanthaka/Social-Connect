import { createSlice } from "@reduxjs/toolkit"
import sortPosts from "utils/sortPosts"

const initialState = {
  mode: "light",
  user: null,
  users: [],
  token: null,
  posts: [],
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light"
    },
    setLogin: (state, action) => {
      state.user = action.payload.user
      state.token = action.payload.token
    },
    setLogout: (state) => {
      state.user = null
      state.token = null
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends
      } else {
        console.error("user friends non-existent :(")
      }
    },
    setUsers: (state, action) => {
      state.users = action.payload.users
    },
    setPosts: (state, action) => {
      const sortedPosts = sortPosts(action.payload.posts)
      state.posts = sortedPosts
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post
        return post
      })
      state.posts = updatedPosts
    },
  },
})

export const {
  setMode,
  setLogin,
  setLogout,
  setFriends,
  setPosts,
  setPost,
  setUsers,
} = authSlice.actions
export default authSlice.reducer
