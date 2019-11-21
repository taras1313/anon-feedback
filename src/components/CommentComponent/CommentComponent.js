import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import withStyles from '@material-ui/core/styles/withStyles';
import Chip from '@material-ui/core/Chip';
import cx from 'classnames';

import { ThreadAuthorComponent } from '../ThreadAuthorComponent';
import { ThreadAuditComponent } from '../ThreadAuditComponent';

import styles from './CommentComponent.module.scss';

const classes = () => ({
  chip: {
    marginRight: '6px',
    height: '26px'
  }
});

class Comment extends Component {
  state = {
    isEditing: false,
    text: '',
  };

  toggleIsEditing = () => {
    const { isEditing, text: newCommentText } = this.state;
    const { comment: { text, _id: commentId }, onUpdateComment } = this.props;

    if (!isEditing) { // open editing
      this.setState({ isEditing: !isEditing, text })
    } else { // saving
      onUpdateComment({ text: newCommentText, commentId }).then(() => {
        this.setState({ isEditing: !isEditing, text: '' })
      });
    }
  };

  editComment = ({ target: { value } }) => this.setState({ text: value });

  resetIsEditing = () => this.setState({ isEditing: false });

  renderButtons = () => {
    const { editable } = this.props;
    if (!editable) return null;

    const { isEditing } = this.state;

    return (
      <div className={isEditing ? styles.btnHolder : ''}>
        {isEditing && (
          <Button onClick={this.resetIsEditing} size='small'>
            Cancel
          </Button>
        )}

        <Button onClick={this.toggleIsEditing} color="secondary" size="small">
          {isEditing ? 'Save' : 'Edit'}
        </Button>
      </div>
    );
  };

  constructAdditionalText = () => {
    const { comment: { wasEdited }, isAuthorsComment } = this.props;
    let text = '';
    if (isAuthorsComment) {
      text = '@thread author ';
    }

    if (wasEdited) {
      text += '(edited)'
    }

    return text.trim();
  };

  repliedToHandler = () => {
    const { repliedToHandler, comment: { author: { username } } } = this.props;

    repliedToHandler(username);
  };

  render() {
    const { comment: { text, author: { username }, repliedToUser }, userId, classes } = this.props;
    const { isEditing, text: inputText } = this.state;

    return (
      <div className={styles.comment}>
        <div className={styles.flexWrapper}>
          <ThreadAuthorComponent
            username={username}
            label={this.constructAdditionalText()}
          />
          {this.renderButtons()}
        </div>

        <div className={cx(styles.text, styles.leftShift)}>
          {!!repliedToUser && !isEditing && (
            <Chip
              variant="outlined"
              className={classes.chip}
              label={`@${repliedToUser.username}`}
              color={userId === repliedToUser.userId ? 'secondary' : 'primary'}
            />
          )}
          {!isEditing && text}

          {isEditing && (
            <TextField
              autoComplete='off'
              id="standard-multiline-flexible"
              label="Edit your comment"
              multiline
              value={inputText}
              fullWidth
              onChange={this.editComment}
              // margin="normal"
              variant="outlined"
              // variant="outlined" // ?
            />
          )}
        </div>

        <div className={cx(styles.flexWrapper, styles.leftShift)}>
          <ThreadAuditComponent />
          <Button color='primary' onClick={this.repliedToHandler} variant='outlined' size='small'>
            Reply
          </Button>
        </div>
        <div className={styles.divider} />
      </div>
    );
  }
}

export const CommentComponent = withStyles(classes)(Comment);