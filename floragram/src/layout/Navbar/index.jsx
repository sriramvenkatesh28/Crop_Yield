import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Icon from '../../assets/logo.jpg';
import LogoutIcon from '@mui/icons-material/Logout';
import './styles.css'
import { useUserAuth } from '../../context/userAuthContext';
import Sidebar from '../Sidebar';

export default function Navbar() {
    const { logOut } = useUserAuth();
    const [showSidebar, setShowSidebar] = React.useState(false);

    const toggleDrawer = () => {
        setShowSidebar(!showSidebar);
    };

    return (
        <AppBar position="static" sx={{ bgcolor: "#4E944F" }}>
            <Box>
                {showSidebar && <Sidebar showSidebar={showSidebar} toggleDrawer={toggleDrawer} />}
                <Toolbar variant="dense">
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={toggleDrawer}>
                        <MenuIcon />
                    </IconButton>
                    <img src={Icon} className="menu__icon" alt="" />
                    <Typography className='product__name' variant="h6" color="inherit" component="div" sx={{ flexGrow: 1 }}>
                        Floragram
                    </Typography>
                    <div className='logout__container' onClick={() => logOut()}>
                        Logout
                        <LogoutIcon />
                    </div>
                </Toolbar>
            </Box>
        </AppBar>
    );
}