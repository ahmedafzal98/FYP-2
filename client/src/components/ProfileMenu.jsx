// import * as React from "react";
// import {
//   Avatar,
//   Menu,
//   MenuItem,
//   IconButton,
//   Tooltip,
//   Divider,
//   ListItemIcon,
// } from "@mui/material";
// import { Person, Settings, Logout } from "@mui/icons-material";
// import { Link } from "react-router";

// const ProfileMenu = ({ avator }) => {
//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const open = Boolean(anchorEl);

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <>
//       <Tooltip title="Account settings">
//         {/* <IconButton> */}
//         <img
//           onClick={handleClick}
//           src={avator}
//           alt="User avatar"
//           style={{
//             width: 72,
//             height: 32,
//             borderRadius: "50%",
//             objectFit: "cover",
//           }}
//         />
//         {/* </IconButton> */}
//       </Tooltip>
//       <Menu
//         anchorEl={anchorEl}
//         open={open}
//         onClose={handleClose}
//         onClick={handleClose}
//         PaperProps={{
//           elevation: 3,
//           sx: {
//             mt: 1.5,
//             minWidth: 180,
//             borderRadius: 2,
//             overflow: "visible",
//             filter: "drop-shadow(0px 4px 10px rgba(0,0,0,0.1))",
//             "&:before": {
//               content: '""',
//               display: "block",
//               position: "absolute",
//               top: 0,
//               right: 14,
//               width: 10,
//               height: 10,
//               bgcolor: "background.paper",
//               transform: "translateY(-50%) rotate(45deg)",
//               zIndex: 0,
//             },
//           },
//         }}
//         transformOrigin={{ horizontal: "right", vertical: "top" }}
//         anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
//       >
//         <MenuItem>
//           <ListItemIcon>
//             <Person fontSize="small" />
//           </ListItemIcon>
//           <Link to="/save_article">Profile</Link>
//         </MenuItem>
//         <MenuItem>
//           <ListItemIcon>
//             <Settings fontSize="small" />
//           </ListItemIcon>
//           Settings
//         </MenuItem>
//         <Divider />
//         <MenuItem onClick={() => alert("Logged out!")}>
//           <ListItemIcon>
//             <Logout fontSize="small" />
//           </ListItemIcon>
//           Logout
//         </MenuItem>
//       </Menu>
//     </>
//   );
// };
// export default ProfileMenu;

import * as React from "react";

import {
  Avatar,
  Menu,
  MenuItem,
  Tooltip,
  Divider,
  ListItemIcon,
} from "@mui/material";
import { Person, Settings, Logout } from "@mui/icons-material";
import { Link, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import axios from "axios";
import {logout} from "../store/features/AuthSlice" // Adjust this path as per your project

const ProfileMenu = ({ avator }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_BASE_URL;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${API_BASE_URL}/api/auth/logout`);
      dispatch(logout()); // Clear redux state
      navigate("/"); // Redirect to home page
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      <Tooltip title="Account settings">
        <img
          onClick={handleClick}
          src={avator}
          alt="User avatar"
          style={{
            width: 72,
            height: 32,
            borderRadius: "50%",
            objectFit: "cover",
            cursor: "pointer",
          }}
        />
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 3,
          sx: {
            mt: 1.5,
            minWidth: 180,
            borderRadius: 2,
            overflow: "visible",
            filter: "drop-shadow(0px 4px 10px rgba(0,0,0,0.1))",
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem component={Link} to="/save_article">
          <ListItemIcon>
            <Person fontSize="small" />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default ProfileMenu;
