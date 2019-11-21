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
			<div onClick={isClickable ? () => like() : null} className={styles.flex}>
				<ThumbUpOutlinedIcon
					className={cx(styles.icon, {
						[styles.like]: likeStatus === 'liked'
					})}
				/>{' '}
				{likesCount}{' '}
			</div>
			<span className={styles.divider}>-</span>
			<div onClick={isClickable ? () => dislike() : null} className={styles.flex}>
				<ThumbDownOutlinedIcon
					className={cx(styles.icon, {
						[styles.dislike]: likeStatus === 'disliked'
					})}
				/>{' '}
				{dislikesCount}{' '}
			</div>
		</div>
	);
};
