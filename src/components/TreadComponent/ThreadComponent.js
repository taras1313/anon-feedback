import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import QuestionAnswerOutlinedIcon from '@material-ui/icons/QuestionAnswerOutlined';
import cx from 'classnames';

import styles from './ThreadComponent.module.scss';
import { ThreadAuthorComponent } from '../ThreadAuthorComponent';
import { ThreadAuditComponent } from '../ThreadAuditComponent';

const randomize = () => Math.floor(Math.random() * 10);
const PREVIEW = 'preview';
const FULL = 'full';
const viewTypes = [PREVIEW, FULL];

//todo like logic- when to disable, already liked functionality, dislike cancels like etc.

export class ThreadComponent extends Component {
  constructor(props) {
    super(props);
    const { ThreadView } = props;

    this.renderContent = ThreadView === FULL ? this.renderThread : this.renderPreviewThread;
  }

  renderThread = () => {
    const { answersCount } = this.props;

    return (
      <Fragment>
        <div>
          {this.renderThreadAuthor()}
          {this.renderThreadHeader()}
          <div className={styles.description}>
            I want to loot 1.5k but I dunno where to start and which programming language should i choose.
            Both swift and go are popular and well paid but first of all I'm interested in learning blyadski facades and
            observers.
            Right now i'm shoes seller.
            Swift is a general-purpose programming language developed by Apple, for an operating system like iOS, macOS,
            watch OS, and Linux.
            Swift supports multiple programming paradigms and it is object-oriented, functional and imperative in
            nature.
            It is heavily designed to work with Apple’s Cocoa and Cocoa Touch Frameworks.
            Go is a programming language also known by the name of Golang, created by Google in 2009.
            Go supports multi-paradigm like procedural, functional and concurrent.
            Its syntax is traditionally coming from C, but it has done a lot of modification to improve upon features
            like simplicity and safety.
            Tirka 23
          </div>
          {this.renderThreadMetaInfo()}
        </div>
      </Fragment>
    );
  };

  renderThreadHeader = () => {
    const { threadView } = this.props;

    return (
      <div
        className={cx(styles.heading, {
          [styles.hovered]: threadView === PREVIEW
        })}
      >
        What to learn SWIFT or GO?
      </div>
    )
  };

  // renderThreadMetaInfo = () => {
  //   const { subscribersCount, dislikesCount, likesCount } = this.props;
  //
  //   return (
  //     <div className={styles.threadMetaInfo}>
  //       {subscribersCount} subscribers
  //       <span className={styles.divider}>-</span>
  //       {new Date().toISOString()}
  //       <span className={styles.divider}>-</span>
  //       <ThumbUpOutlinedIcon className={styles.icon} /> {likesCount}
  //       <span className={styles.divider}>-</span>
  //       <ThumbDownOutlinedIcon className={styles.icon} /> {dislikesCount}
  //     </div>
  //   );
  // };

  renderPreviewThread = () => {
    const { answersCount, author: { nickName = 'Ne Tot Pazan' } = {}, subscribersCount, dislikesCount, likesCount } = this.props;

    return (
      <Fragment>
        <div>
          <ThreadAuthorComponent nickName={nickName} />
          {this.renderThreadHeader()}
          <ThreadAuditComponent
            subscribersCount={subscribersCount}
            dislikesCount={dislikesCount}
            likesCount={likesCount}
          />
          {/*{this.renderThreadMetaInfo()}*/}
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
  threadView: PREVIEW, // edit
  subscribersCount: randomize(),
  answersCount: randomize(),
  dislikesCount: randomize(),
  likesCount: randomize(),
  author: {}
};


