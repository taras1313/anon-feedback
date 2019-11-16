import React from 'react';

import logo from './logo.svg';

import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

import styles from './Header.module.scss';

const useStyles = makeStyles(theme => ({
  header: {
    backgroundColor: '#4f5a6e',
    display: 'flex',
    flexDirection: 'row',
    height: '70px'
  },
  headerPlaceholder: {
    width: '100%',
    height: '70px'
  },
  search: {
    position: 'relative',
    border: '1px solid grey',
    borderRadius: '5px',
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.1),
    },
    alignSelf: 'center',
    height: '34px',
    marginRight: '20px'
  },
  inputInput: {
    padding: '0',
    paddingLeft: '40px',
    transition: theme.transitions.create('width'),
    width: '100%',
    height: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  searchIcon: {
    width: '48px',
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'white',
    height: '100%',
  },
  createThreadButton: {
    backgroundColor: '#65c178',
    color: 'white',
    '&:hover': {
      backgroundColor: '#159776'
    },
    width: '200px'
  }
}));

export default function ButtonAppBar(props) {
  const classes = useStyles();

  return (
    <>
    <AppBar position="fixed" className={classes.header}>
      <div className={styles.logoWrapper}>
        <img className={styles.logo} src={logo} alt='logo'/>
      </div>
      <div className={styles.verticalDivider} />
      
      <div className={styles.searchWrapper}>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
          />
        </div>
      </div>
      <div className={styles.verticalDivider} />
      <div className={styles.createThreadWrapper}> 
        <Button variant='contained' className={classes.createThreadButton}> create thread </Button> 
      </div>

    </AppBar>
    <div className={classes.headerPlaceholder} />
    </>
  );
}
