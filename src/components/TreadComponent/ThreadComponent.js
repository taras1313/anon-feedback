import React, { Component, Fragment, useState } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import QuestionAnswerOutlinedIcon from '@material-ui/icons/QuestionAnswerOutlined';
import cx from 'classnames';

import styles from './ThreadComponent.module.scss';
import { ThreadAuthorComponent } from '../ThreadAuthorComponent';
import { ThreadAuditComponent } from '../ThreadAuditComponent';
import { ManipulateThreadComponent } from '../ManipulateThreadComponent';
import { CommentComponent } from '../CommentComponent';
import { CreateCommentComponent } from '../CreateCommentComponent';
import Loader from '../Loader/Loader';

const randomize = () => Math.floor(Math.random() * 10);
const PREVIEW = 'preview';
const FULL = 'full';
const viewTypes = [PREVIEW, FULL];

//todo like logic- when to disable, already liked functionality, dislike cancels like etc.

export class ThreadComponent extends Component {
  constructor(props) {
    super(props);
    const { threadView } = props;

    this.renderContent = threadView === FULL ? this.renderThread : this.renderPreviewThread;

    this.state = {
      editThreadOpen: false
    };
  }

  closeEditThread = () => this.setState({ editThreadOpen: false });

  openEditThread = () => {
    const {
      actions: { setThreadData },
      thread: { text, _id, title }
    } = this.props;
    setThreadData({ text, _id, title });

    this.setState({ editThreadOpen: true });
  };

  renderPreviewThread = () => {
    const {
      thread: {
        author: { username } = {},
        answersCount,
        subscribersCount,
        dislikesCount,
        likesCount
      }
    } = this.props;

    return (
      <Fragment>
        <div>
          <ThreadAuthorComponent username={username} />
          {this.renderThreadHeader()}
          <ThreadAuditComponent
            subscribersCount={subscribersCount}
            dislikesCount={dislikesCount}
            likesCount={likesCount}
						likeStatus={this.likeStatus()}
					/>
        </div>
        <div className={styles.answersCount}>
          <div className={styles.counterWrapper}>
            <QuestionAnswerOutlinedIcon />
            {answersCount}
          </div>
          <span>answer(s)</span>
        </div>
      </Fragment>
    );
  };

  subscriptionHandler = () => {
    const {
      actions: {
        subscribeToThread,
        unsubscribeFromThread
      },
      thread: { _id: threadId },
      userId
    } = this.props;

    const isSubscribed = this.isSubscribed();
    const params = { threadId, userId };

    if (isSubscribed) {
      unsubscribeFromThread(params)
    } else {
      subscribeToThread(params);
    }
  };

  isSubscribed = () => {
    const { thread: { subscribers }, userId } = this.props;
    return !!subscribers.find(user => user.userId === userId);
  };

  isAuthor = () => {
    const { thread: { author: { userId: authorId } }, userId } = this.props;

    return authorId === userId;
  };

  findUserInThread = () => {
    const { userId, thread: { users } } = this.props;

    return users.find(user => user.userId === userId);
  };

	likeStatus = () => {
		const {
			userId,
			thread: {
				likesList,
				dislikesList
			}
		} = this.props;

		if (likesList.find(el => el.userId === userId)) return 'liked';
		if (dislikesList.find(el => el.userId === userId)) return 'disliked';
		return null
	};

  renderThread = () => {
    const { editThreadOpen } = this.state;

    const {
      userId,
      thread: {
        text,
        subscribersCount,
        dislikesCount,
        likesCount,
        commentsList,
        author: { userId: threadAuthorId, username: authorName } = {}
      },
			likeThread,
			dislikeThread,
      actions: { onCreateComment, onUpdateComment }
    } = this.props;
    const subscribed = this.isSubscribed();
    const { username } = this.findUserInThread() || {};

    return (
      <div className={styles.threadFullWrapper}>
        <div className={styles.headingWrapper}>
          <ThreadAuthorComponent username={authorName} />
          {
            this.isAuthor() && <Button onClick={this.openEditThread} color="secondary">
              Edit
            </Button>
          }
        </div>
        <div className={styles.divider} />
        {this.renderThreadHeader()}
        <div className={styles.description}>
          {text}
        </div>
        <div className={styles.subsWrapper}>

          <ThreadAuditComponent
            subscribersCount={subscribersCount}
            dislikesCount={dislikesCount}
            likesCount={likesCount}
						likeStatus={this.likeStatus()}
						dislike={dislikeThread.bind(null, {id, userId})}
						like={likeThread.bind(null, {id, userId})}
						isClickable
          />

          <Button
            className={styles.btn}
            variant="outlined"
            onClick={this.subscriptionHandler}
            color={subscribed ? 'secondary' : 'primary'}
          >
            {subscribed ? 'Unsubscribe' : 'Subscribe'}
          </Button>
        </div>
        <div className={styles.dividerWrapper}>
          Total comments ({8})
        </div>

        <div className={styles.comments}>
          {commentsList.map(el => {

            return (
              <CommentComponent
                onUpdateComment={onUpdateComment}
                editable={el.author.userId === userId}
                comment={el}
                isAuthorsComment={el.author.userId === threadAuthorId}
              />
            )
          })}
        </div>

        <div className={styles.dividerWrapper}>
          {!!username ?
            <span className={styles.userHighlight}>{username},</span> : ''} Write your comment here
        </div>
        <CreateCommentComponent onCreateComment={onCreateComment} username={username} />

        <ManipulateThreadComponent
          onClose={this.closeEditThread}
          isOpen={editThreadOpen}
          action="edit"
        />
      </div>
    );
  };

  renderThreadHeader = () => {
    const { threadView } = this.props;
    const { title = 'What to learn SWIFT or GO?', _id: id } = this.props.thread;

    return (
      <NavLink to={`/feed/${id}`}>
        <div
          className={cx(styles.heading, {
            [styles.hovered]: threadView === PREVIEW
          })}
        >
          {title}
        </div>
      </NavLink>
    );
  };


  render() {
    return <div className={styles.wrapper}>{this.renderContent()}</div>;
  }
}

ThreadComponent.propTypes = {
  heading: PropTypes.string,
  answersCount: PropTypes.number,
  subscribersCount: PropTypes.number,
  creationDate: PropTypes.object,
  content: PropTypes.string,
  likesCount: PropTypes.number,
  dislikesCount: PropTypes.number,
  threadView: PropTypes.oneOf(viewTypes),
  author: PropTypes.object,
  onLikeClick: PropTypes.func,
  onDislikeClick: PropTypes.func,
  onSubscribeClick: PropTypes.func,
  onEditClick: PropTypes.func
};

ThreadComponent.defaultProps = {
  threadView: FULL, // edit
  subscribersCount: randomize(),
  answersCount: randomize(),
  dislikesCount: randomize(),
  likesCount: randomize(),
  author: {}
};
