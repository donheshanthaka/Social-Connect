import { Box, Typography, useTheme } from "@mui/material";
import Member from "components/Member";
import GlassmorphicWrapper from "components/GlassmorphicWrapper";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUsers } from "state/state";

const MembersWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const users = useSelector((state) => state.users);
  
  const getUsers = async () => {
    const response = await fetch(`${process.env.REACT_APP_SERVER_URI}/users`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setUsers({ users: data }));
  }

  useEffect(() => {
    getUsers();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <GlassmorphicWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Surge Members List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {users.map((user) => (
          <Member
            key={user._id}
            friendId={user._id}
            name={`${user.firstName} ${user.lastName}`}
            subtitle={user.occupation}
            userPicturePath={user.picturePath}
          />
        ))}
      </Box>
    </GlassmorphicWrapper>
  );
};

export default MembersWidget;