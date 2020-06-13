import React from 'react';

import { ThreadComponent } from '../TreadComponent';
import Loader from '../Loader/Loader';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ScheduleIcon from '@material-ui/icons/Schedule'; 

import styles from './AllThreadsPage.module.scss';

const NEWEST = 'Newest';
const MOST_DISCUSSED = 'Most Discussed';
const MOST_LIKED = 'Most Liked';

const sortOptions = [
  { label: NEWEST, icon: <ScheduleIcon /> },
  { label: MOST_LIKED, icon: <FavoriteIcon /> },
  { label: MOST_DISCUSSED, icon: <WhatshotIcon /> }
];

export class AllThreadsPage extends React.Component {
  state = {
    sortBy: NEWEST,
    sortDirection: 'DESC'
  };

  sortByChangeHandler = () => ({ currentTarget: { name } }) => {
    const { sortBy, sortDirection } = this.state;

    if (name === sortBy) {
      const newDirection = sortDirection === 'ASC' ? 'DESC' : 'ASC';

      this.setState({ sortDirection: newDirection });
    } else {
      this.setState({ sortBy: name, sortDirection: 'DESC' });
    }
  };

  getSortedThreads = () => {
    const { sortBy } = this.state;
    const { threads } = this.props;

    switch (sortBy) {
      case NEWEST: {
        return [...threads].sort((a, b) => {
          return new Date(b.createdDate) - new Date(a.createdDate);
        });
      }

      case MOST_LIKED: {
        return [...threads].sort((a, b) => {
          return b.likesCount - a.likesCount;
        });
      }

      case MOST_DISCUSSED: {
        return [...threads].sort((a, b) => {
          return b.commentsCount - a.commentsCount;
        });
      }

      default: {
        return threads;
      }
    }
  };

  renderThreads() {
    const { sortDirection } = this.state;
    const { userId } = this.props;
    const sortedThreads = this.getSortedThreads().map(el => (
      <ThreadComponent userId={userId} key={el._id} threadView="preview" thread={el} />
    ));

    return sortedThreads;
    // return sortDirection === 'DESC' ? sortedThreads : sortedThreads.reverse();
  }

  renderButtons() {
    // const { sortDirection } = this.state;

    return sortOptions.map(({ label, icon }) => (
      <Button
        key={label}
        onClick={this.sortByChangeHandler()}
        name={label}
        className={this.isActive(label) ? styles.active : ''}
      >
        <div className={styles.iconWrapper}>{icon}</div>
        {label}
        {/*<div className={styles.iconWrapper}>*/}
        {/*{this.isActive(label) ? (*/}
        {/*sortDirection === 'DESC' ? (*/}
        {/*<ArrowDownwardIcon />*/}
        {/*) : (*/}
        {/*<ArrowUpwardIcon />*/}
        {/*)*/}
        {/*) : null}*/}
        {/*</div>*/}
      </Button>
    ));
  }

  componentDidMount() {
    const {
      actions: { getAllThreads }
    } = this.props;
    getAllThreads();
  }

  isActive = label => this.state.sortBy === label;

  render() {
    const { threads } = this.props;

    return (
      <>
        <div className={styles.buttonContainer}>
          <ButtonGroup size="small" aria-label="small outlined button group" color="primary">
            {this.renderButtons()}
          </ButtonGroup>
        </div>
        {threads.length ? this.renderThreads() : <Loader />}
      </>
    );
  }
}
