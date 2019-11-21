import React from 'react'
import styles from './ThreadAuthorComponent.module.scss';

export const ThreadAuthorComponent = ({ username = 'test', label }) => (
  <div className={styles.threadAuthor}>
    <div className={styles.threadAuthorBox}>
      {username.slice(0, 2)}
    </div>
    <div className={styles.authorInfo}>
      <span>{username}</span>
      {!!label && <span className={styles.role}>{label}</span>}
    </div>
  </div>
);
