import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

function Sidebar({showSidebar, toggleDrawer}) {
    return (
        <div>
            <React.Fragment >
                <Drawer
                    open={showSidebar}
                    onClose={toggleDrawer}
                >
                    <Box
                        sx={{ width: 250 }}
                        role="presentation"
                        onClick={toggleDrawer}
                        onKeyDown={toggleDrawer}
                    >
                        <List>
                            {['Home', 'About Us'].map((text, index) => (
                                <ListItem key={text} disablePadding>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                        </ListItemIcon>
                                        <ListItemText primary={text} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Drawer>
            </React.Fragment>
        </div>
    );
}

export default Sidebar;