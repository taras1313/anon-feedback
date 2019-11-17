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
    }
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
        answersCount,
        authorName = 'Ne Tot Pazan',
        subscribersCount,
        dislikesCount,
        likesCount
      }
    } = this.props;

    return (
      <Fragment>
        <div>
          <ThreadAuthorComponent nickName={authorName} />
          {this.renderThreadHeader()}
          <ThreadAuditComponent
            subscribersCount={subscribersCount}
            dislikesCount={dislikesCount}
            likesCount={likesCount}
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
    const { thread: { authorId }, userId } = this.props;

    return authorId === userId;
  };

  renderThread = () => {
    const { editThreadOpen } = this.state;
    const { thread: { text, subscribersCount, dislikesCount, likesCount, answersCount, authorName } } = this.props;
    const subscribed = this.isSubscribed();

    return (
        <div className={styles.threadFullWrapper}>
          <div className={styles.headingWrapper}>
            <ThreadAuthorComponent nickName={authorName} />
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
