import React, { useState, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import cx from 'classnames';
import { uniqueNamesGenerator, adjectives, animals } from 'unique-names-generator';

const EDIT = 'edit';
const CREATE = 'create';

const useStyles = makeStyles(theme => ({
  root: {
    width: '80%',
    height: '70vh'
  },
  appBar: {
    position: 'relative',
    backgroundColor: '#424b5f',
    boxShadow: 'none'
  },
  title: {
    marginLeft: theme.spacing(2),
    textTransform: 'capitalize',
    flex: 1,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: '30px 40px',
    flexDirection: 'column',
    flex: 1
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '100%',
    whiteSpace: 'pre-line'
  },
  smallTextField: {
    width: 200
  },
  nickNameWrapper: {
    display: 'flex',
    flexDirection: 'column'
  },
  formControl: {
    margin: 0
  },
  controlBtns: {
    marginTop: '16px',
    marginLeft: 'auto',
    textTransform: 'capitalize'
  },
  button: {
    fontWeight: 'bold',
    boxShadow: 'none',
    marginLeft: '16px',
    fontSize: '0.7rem'
  },
  submitBtn: {
    backgroundColor: '#65c178',
    fontWeight: 'bold',
    color: 'white',
    '&:hover': {
      backgroundColor: '#159776'
    },
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const ManipulateThreadComponent = (
  {
    history,
    action,
    isOpen,
    onClose,
    actions: {
      updateThreadField,
      resetThreadFields,
      createThread,
      editThread,
      setSelectedThread
    },
    threadData: {
      title,
      text,
      username
    }
  }) => {
  const classes = useStyles();
  const [isChecked, setIsChecked] = useState(false);

  const toggleAutoGenerator = () => {
    const config = {
      dictionaries: [adjectives, animals],
      separator: ' ',
      length: 2,
    };

    const value = !isChecked ? uniqueNamesGenerator(config) : '';

    updateThreadField({ field: 'username', value });
    setIsChecked(!isChecked);
  };

  const updateThreadData = ({ target: { value, name } }) => {console.log(value.toString());updateThreadField({ field: name, value })};

  const manipulateThread = () => {
    switch (action) {
      case EDIT: {
        editThread().then(data => {
          setSelectedThread(data);
          onClose();
        });
        break;
      }

      case CREATE: {
        createThread().then(data => {
          const { _id } = data;
          const { push } = history;

          setSelectedThread(data);
          push(`/feed/${_id}`);
          onClose();
        });
        break;
      }

      default:
        return;
    }
  };

  return (
    <div>
      <Dialog
        fullWidth
        maxWidth="md"
        open={isOpen}
        onClose={onClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={onClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {action} Thread
            </Typography>
          </Toolbar>
        </AppBar>
        <div className={classes.container}>
          {action === CREATE && (
            <div className={classes.nickNameWrapper}>
              <TextField
                autoComplete='off'
                id="standard-basic"
                className={cx(classes.textField, classes.smallTextField)}
                onChange={updateThreadData}
                required
                value={username}
                name="username"
                label="Anon nick name"
              />
              <FormControlLabel
                className={classes.formControl}
                control={
                  <Checkbox
                    checked={isChecked}
                    onChange={toggleAutoGenerator}
                    color="primary"
                  />
                }
                label="Generate nick name for you?"
              />
            </div>
          )}

          <TextField
            autoComplete='off'
            required
            id="standard-multiline-flexible"
            label="Thread Title"
            rows="2"
            multiline
            value={title}
            onChange={updateThreadData}
            name="title"
            className={classes.textField}
            margin="normal"
            variant="outlined" // ?
            // variant="filled" // ?
          />

          <TextField
            required
            autoComplete='off'
            id="standard-multiline-flexible"
            label="Thread Description"
            multiline
            rows="6"
            value={text}
            onChange={updateThreadData}
            name="text"
            className={classes.textField}
            margin="normal"
            variant="outlined" // ?
            // variant="filled" // ?

          />

          <div className={classes.controlBtns}>
            <Button variant="contained" onClick={resetThreadFields} color="secondary" className={classes.button}>
              Reset
            </Button>

            <Button variant="contained" onClick={manipulateThread} className={cx(classes.button, classes.submitBtn)}>
              {action} Thread
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};