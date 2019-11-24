import React from 'react'
import styles from './ThreadAuthorComponent.module.scss';

const getUserColor = data => {
  const hashCode = string => {
    let hash = 0;
    const { length } = string;
    let i = 0;
    if (length > 0) {
      while (i < length) {
        hash = (hash << 5) - hash + string.charCodeAt(i++) | 0;
      }
    }
    return hash;
  };
  const transformColor = (x, fraction) => {
    x = Math.ceil(x / fraction);
    return 64 + x * 16;
  };
  const hash = Math.abs(hashCode(data));
  const r = Math.pow(hash % 100 / 100, 2);
  const g = Math.pow(Math.ceil(hash / 128) % 100 / 100, 2);
  const b = Math.pow(Math.ceil(hash / 256) % 100 / 100, 2);
  const fraction = (r + g + b) / 12;
  return `rgb(${transformColor(r, fraction)}, ${transformColor(g, fraction)}, ${transformColor(b, fraction)})`;
};

export const ThreadAuthorComponent = ({ username = 'test', label }) => (
  <div className={styles.threadAuthor}>
    <div className={styles.threadAuthorBox} style={{ backgroundColor: getUserColor(username) }}>
      {username.slice(0, 2)}
    </div>
    <div className={styles.authorInfo}>
      <span>{username}</span>
      {!!label && <span className={styles.role}>{label}</span>}
    </div>
  </div>
);
