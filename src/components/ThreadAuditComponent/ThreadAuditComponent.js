import React from 'react';
import cx from 'classnames';

import ThumbDownOutlinedIcon from '@material-ui/icons/ThumbDown';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUp';

import styles from './ThreadAuditComponent.module.scss';

export const ThreadAuditComponent = ({
	subscribersCount,
	dislikesCount,
	likesCount,
	isClickable,
	like,
	dislike,
  likeStatus,
  createdDate
}) => {
	return (
		<div className={styles.threadMetaInfo}>
			{subscribersCount} subscribers
			<span className={styles.divider}>-</span>
			{createdDate}
			<span className={styles.divider}>-</span>
			<div onClick={isClickable ? () => like() : null}>
				<ThumbUpOutlinedIcon
					className={cx(styles.icon, {
						[styles.active]: likeStatus === 'liked'
					})}
				/>{' '}
				{likesCount}{' '}
			</div>
			<span className={styles.divider}>-</span>
			<div onClick={isClickable ? () => dislike() : null}>
				<ThumbDownOutlinedIcon
					className={cx(styles.icon, {
						[styles.active]: likeStatus === 'disliked'
					})}
				/>{' '}
				{dislikesCount}{' '}
			</div>
		</div>
	);
};
