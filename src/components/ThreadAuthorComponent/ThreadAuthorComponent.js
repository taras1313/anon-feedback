import React from 'react'
import styles from './ThreadAuthorComponent.module.scss';

export const ThreadAuthorComponent = ({ nickName = 'Author' }) => (
  <div className={styles.threadAuthor}>
    <div className={styles.threadAuthorBox}>
      {nickName.slice(0, 2)}
    </div>
    <span>
     {nickName}
    </span>
  </div>
);
