import React from 'react';
import cx from 'classnames';
import { NavLink } from 'react-router-dom'; 
import { useLocation } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import ListIcon from '@material-ui/icons/List';
import PersonIcon from '@material-ui/icons/PersonOutline';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth
  },
  drawerPaper: {
    color: '#a7b3cb',
    fontWeight: 'bold',
    top: '70px',
    backgroundColor: '#4f5a6e',
    width: '250px',
    border: 'none'
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3)
  },
  listIcon: {
    minWidth: '30px'
  },
  listItemText: {
    fontWeight: 'bold'
  },
  active: {
    background: '#444d5d'
  }
}));

const navLinksData = [
  {
    text: 'Personal Cabinet',
    path: '/cabinet',
    icon: <PersonIcon style={{ fill: '#a7b3cb' }} />
  },
  {
    text: 'All Threads',
    path: '/',
    icon: <ListIcon style={{ fill: '#a7b3cb' }} />
  }
];

export default function PermanentDrawerLeft() {
  const classes = useStyles();
  const location = useLocation();

  const renderLinks = () =>
    navLinksData.map(({ text, icon, path }) => (
      <NavLink to={path} key={path}>
        <ListItem button key={text} className={cx({ [classes.active]: path === location.pathname })}>
          <ListItemIcon className={classes.listIcon}>{icon}</ListItemIcon>
          <ListItemText disableTypography className={classes.listItemText} primary={text} />
        </ListItem>
      </NavLink>
    ));

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
        anchor="left"
      >
        <List component="nav">{renderLinks()}</List>
        <Divider />
        <ListItem button>
          <ListItemIcon className={classes.listIcon}>
            <MeetingRoomIcon style={{ fill: '#a7b3cb' }} />
          </ListItemIcon>

          <ListItemText
            disableTypography
            className={classes.listItemText}
            primary="Log Out" />
        </ListItem>
      </Drawer>
    </div>
  );
}
