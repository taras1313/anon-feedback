import React from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';

import styles from './AppRouter.module.scss'

const Feed = () => <p>Feed</p> ;
const Cabinet = () => <p>Personal Cabinet</p> ;
const Threads = () => <p>All Threads</p> ;

export default function AppRouter() {
  return(
    <div className={styles.mainWrapper}>
      <Switch>
        <Route path='/feed' component={Feed} />
        <Route path='/cabinet' component={Cabinet} />
        <Route path='/' component={Threads} />
      </Switch>
    </div>
  );
}
