import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import cx from 'classnames';
import { uniqueNamesGenerator, adjectives, animals } from 'unique-names-generator';

const useStyles = makeStyles(theme => ({
  root: {
    width: '80%',
    height: '70vh'
  },
  chip: {
    marginLeft: '6px',
    height: '26px'
  },
  repliedToWrapper: {
    marginTop: '10px'
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
    width: '100%'
  },
  smallTextField: {
    width: 200
  },
  nickNameWrapper: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '10px'
  },
  formControl: {
    margin: 0
  },
  controlBtns: {
    marginTop: '16px',
    marginLeft: 'auto',
    textTransform: 'capitalize',
    display: 'flex',
    justifyContent: 'flex-end'
  },
  button: {
    fontWeight: 'bold',
    boxShadow: 'none',
    marginLeft: '16px'
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

export const CreateCommentComponent = (
  {
    username = '',
    onCreateComment,
    repliedTo,
    onRepliedToReset
  }
) => {
  const classes = useStyles();
  const [isChecked, setIsChecked] = React.useState(!!username);
  const [nickName, setNickName] = React.useState(username);
  const [commentText, setCommentText] = React.useState('');

  const toggleAutoGenerator = () => {
    const config = {
      dictionaries: [adjectives, animals],
      separator: ' ',
      length: 2,
    };
    
    const value = !isChecked ? uniqueNamesGenerator(config) : '';

    setNickName(value);
    setIsChecked(!isChecked);
  };

  const updateCommentText = ({ target: { value } }) => setCommentText(value);

  const updateUserNickName = ({ target: { value } }) => setNickName(value);

  const resetCommentFields = () => {
    setCommentText('');
    setIsChecked(false);
  };

  const createCommentHandler = () => {
    onRepliedToReset && onRepliedToReset();

    onCreateComment({ nickName, commentText, repliedTo })
      .then(resetCommentFields);
  };

  return (
    <div>
      {!username && (
        <div className={classes.nickNameWrapper}>
          <TextField
            autoComplete='off'
            id="standard-basic"
            className={cx(classes.textField, classes.smallTextField)}
            onChange={updateUserNickName}
            required
            value={nickName}
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

      {repliedTo && (
        <div className={classes.repliedToWrapper}>
          Comment replied to
          <Chip
            label={`@${repliedTo}`}
            onDelete={onRepliedToReset}
            color="primary"
            variant="outlined"
            className={classes.chip}
          />
        </div>
      )}
      <TextField
        required
        autoComplete='off'
        id="standard-multiline-flexible"
        label="Your comment"
        multiline
        rows="6"
        value={commentText}
        onChange={updateCommentText}
        name="text"
        className={classes.textField}
        margin="normal"
        variant="filled" // ?
        // variant="outlined" // ?

      />

      <div className={classes.controlBtns}>
        <Button
          data-testid="here"
          variant="outlined"
          onClick={resetCommentFields}
          className={classes.button}
        >
          Reset
        </Button>

        <Button
          variant="outlined"
          onClick={createCommentHandler}
          color="primary"
          className={cx(classes.button)}
        >
          Create Comment
        </Button>
      </div>
    </div>
  );
};
