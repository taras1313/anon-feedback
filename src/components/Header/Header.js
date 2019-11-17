import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

import { ManipulateThreadComponent } from '../ManipulateThreadComponent';
import logo from './logo.svg';

import styles from './Header.module.scss';

const useStyles = makeStyles(theme => ({
  header: {
    backgroundColor: '#424b5f',
    display: 'flex',
    flexDirection: 'row',
    height: '70px',
    boxShadow: 'none'
  },
  headerPlaceholder: {
    width: '100%',
    height: '70px'
  },
  search: {
    position: 'relative',
    borderRadius: '5px',
    backgroundColor: '#424b5f',
    width: '100%',
    alignSelf: 'center',
    height: '40px'
  },
  inputInput: {
    padding: '0',
    paddingLeft: '50px',
    transition: theme.transitions.create('width'),
    width: '100%',
    height: '100%',
    '&:focus, &:hover': {
      backgroundColor: '#3a4357',
      borderRadius: '5px',
    }
  },
  searchIcon: {
    width: '48px',
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1
  },
  inputRoot: {
    color: 'white',
    height: '100%',
    width: '100%'
  },
  createThreadButton: {
    backgroundColor: '#65c178',
    fontSize: '0.7rem',
    fontWeight: 'bold',
    color: 'white',
    '&:hover': {
      backgroundColor: '#159776'
    },
    width: '150px',
    height: '36px'
  }
}));

export default function ButtonAppBar(props) {
  const classes = useStyles();
  const [createThreadOpen, setCreateThreadOpen] = useState(false);

  const openCreateThread = () => setCreateThreadOpen(true);

  const closeCreateThread = () => setCreateThreadOpen(false);

  return (
    <>
      <AppBar position="fixed" className={classes.header}>
        <div className={styles.logoWrapper}>
          <img className={styles.logo} src={logo} alt='logo' />
        </div>

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
        <div className={styles.createThreadWrapper}>
          <Button
            variant='contained'
            onClick={openCreateThread}
            className={classes.createThreadButton}
          >
            create thread
          </Button>
        </div>

      </AppBar>
      <ManipulateThreadComponent
        onClose={closeCreateThread}
        isOpen={createThreadOpen}
        action="create"
      />

      <div className={classes.headerPlaceholder} />
    </>
  );
}
