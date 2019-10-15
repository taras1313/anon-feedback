import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DynamicFieldIcon from '@material-ui/icons/DynamicFeed';
import ListIcon from '@material-ui/icons/List';
import PersonIcon from '@material-ui/icons/PersonOutline';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawerPaper: {
    color: 'white',
    top: 'unset',
    backgroundColor: '#4f5a6e',
    width: '251px',
    borderRight: '1px solid #363d4a'
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  listIcon: {
    minWidth: '30px'
  }
}));

export default function PermanentDrawerLeft() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <Divider />
        <List component='nav'>
          {[{
            text:'Personal Cabinet',
            icon: <PersonIcon />
          },
          {
            text: 'My Feed',
            icon: <DynamicFieldIcon />
          },
          {
            text: 'All Threads',
            icon: <ListIcon />
          }
            ].map(({text, icon}, index) => (
            <ListItem button key={text}>
              <ListItemIcon className={classes.listIcon}>{icon}</ListItemIcon> 
              <ListItemText primary={text} />
            </ListItem>
          ))}
          </List>
          <Divider />
        </Drawer>
      </div>
  );
}
