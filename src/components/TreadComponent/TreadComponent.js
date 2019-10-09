import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import QuestionAnswerOutlinedIcon from '@material-ui/icons/QuestionAnswerOutlined';
import ThumbDownOutlinedIcon from '@material-ui/icons/ThumbDown';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUp';
import cx from 'classnames';

import styles from './TreadComponent.module.scss';

const randomize = () => Math.floor(Math.random() * 10);
const PREVIEW = 'preview';
const FULL = 'full';
const viewTypes = [PREVIEW, FULL];
//todo like logic- when to disable, already liked functionality, dislike cancels like etc.

export class TreadComponent extends Component {
  constructor(props) {
    super(props);
    const { treadView } = props;

    this.renderContent = treadView === FULL ? this.renderTread : this.renderPreviewTread;
  }

  renderTread = () => {
    const { answersCount } = this.props;

    return (
      <Fragment>
        <div>
          {this.renderTreadAuthor()}
          {this.renderTreadHeader()}
          <div className={styles.description}>
            I want to loot 1.5k but I dunno where to start and which programming language should i choose.
            Both swift and go are popular and well paid but first of all I'm interested in learning blyadski facades and observers.
            Right now i'm shoes seller.
            Swift is a general-purpose programming language developed by Apple, for an operating system like iOS, macOS, watch OS, and Linux.
            Swift supports multiple programming paradigms and it is object-oriented, functional and imperative in nature.
            It is heavily designed to work with Apple’s Cocoa and Cocoa Touch Frameworks.
            Go is a programming language also known by the name of Golang, created by Google in 2009.
            Go supports multi-paradigm like procedural, functional and concurrent.
            Its syntax is traditionally coming from C, but it has done a lot of modification to improve upon features like simplicity and safety.
            Tirka 23
          </div>
          {this.renderTreadMetaInfo()}
        </div>
      </Fragment>
    );
  };
  // action

  renderTreadAuthor = () => {
    const {
      author: {
        nickName = 'Ne Tot Pazan'
      }
    } = this.props;
    const [firstLetter, secondLetter] = nickName;

    return (
      <div className={styles.treadAuthor}>
        <div className={styles.treadAuthorBox}>
          {firstLetter + secondLetter}
        </div>
        <span>
         {nickName}
        </span>
      </div>
    );
  };

  renderTreadHeader = () => {
    const { treadView } = this.props;

    return (
      <div
        className={cx(styles.heading, {
          [styles.hovered]: treadView === PREVIEW
        })}
      >
        What to learn SWIFT or GO?
      </div>
    )
  };

  renderTreadMetaInfo = () => {
    const { subscribersCount, dislikesCount, likesCount } = this.props;

    return (
      <div className={styles.treadMetaInfo}>
        {subscribersCount} subscribers
        <span className={styles.divider}>-</span>
        {new Date().toISOString()}
        <span className={styles.divider}>-</span>
        <ThumbUpOutlinedIcon className={styles.icon} /> {likesCount}
        <span className={styles.divider}>-</span>
        <ThumbDownOutlinedIcon className={styles.icon} /> {dislikesCount}
      </div>
    );
  };

  renderPreviewTread = () => {
    const { answersCount } = this.props;

    return (
      <Fragment>
        <div>
          {this.renderTreadAuthor()}
          {this.renderTreadHeader()}
          {this.renderTreadMetaInfo()}
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

  render() {
    return (
      <div className={styles.wrapper}>
        {this.renderContent()}
      </div>
    );
  }
}

TreadComponent.propTypes = {
  heading: PropTypes.string,
  answersCount: PropTypes.number,
  subscribersCount: PropTypes.number,
  creationDate: PropTypes.object,
  content: PropTypes.string,
  likesCount: PropTypes.number,
  dislikesCount: PropTypes.number,
  treadView: PropTypes.oneOf(viewTypes),
  author: PropTypes.object,
  onLikeClick: PropTypes.func,
  onDislikeClick: PropTypes.func,
  onSubscribeClick: PropTypes.func,
  onEditClick: PropTypes.func
};

TreadComponent.defaultProps = {
  treadView: PREVIEW, // edit
  subscribersCount: randomize(),
  answersCount: randomize(),
  dislikesCount: randomize(),
  likesCount: randomize(),
  author: {}
};


