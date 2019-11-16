import React from 'react'
import ThumbDownOutlinedIcon from '@material-ui/icons/ThumbDown';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUp';

import styles from './ThreadAuditComponent.module.scss';

export const ThreadAuditComponent = ({ subscribersCount, dislikesCount, likesCount }) => (
  <div className={styles.threadMetaInfo}>
    {subscribersCount} subscribers
    <span className={styles.divider}>-</span>
    {new Date().toISOString()}
    <span className={styles.divider}>-</span>
    <ThumbUpOutlinedIcon className={styles.icon} /> {likesCount}
    <span className={styles.divider}>-</span>
    <ThumbDownOutlinedIcon className={styles.icon} /> {dislikesCount}
  </div>
);