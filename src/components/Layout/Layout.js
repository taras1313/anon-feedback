import React from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';

import Header from '../Header/Header';
import Navbar from '../Navbar/Navbar';

import styles from './Layout.module.scss'

const Feed = () => <p>Feed</p> ;
const Cabinet = () => <p>Personal Cabinet</p> ;
const Threads = () => <p>All Threads</p> ;
const ThreadPage = ({match}) => <p>You have chosen thread with id value {match.params.id}</p>;

export default function Layout() {
  return(
    <>
      <Header />
      <Navbar />
      <div className={styles.mainWrapper}>
      <Switch>
        <Route path='/feed' exact component={Feed} />
        <Route path='/feed/:id' component={ThreadPage} />
        <Route path='/cabinet' component={Cabinet} />
        <Route path='/' component={Threads} />
      </Switch>
      </div>
    </>
  );
}
