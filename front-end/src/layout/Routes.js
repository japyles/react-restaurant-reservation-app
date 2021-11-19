import React from "react";

import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from '../dashboard/Dashboard';
import NotFound from './NotFound';
import NewReservation from '../dashboard/NewReservation'
import EditReservation from '../dashboard/EditReservation'
import Seating from '../seating/Seating'
import NewTable from '../tables/NewTable'
import Search from '../search/Search'
import { today } from '../utils/date-time';

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes() {
  return (
    <Switch>
      <Route exact={true} path='/'>
        <Redirect to={'/dashboard'} />
      </Route>
      <Route exact={true} path='/reservations/:reservation_id/seat'>
        <Seating />
      </Route>
      <Route exact={true} path='/reservations/new'>
        <NewReservation date={today()} />
      </Route>
      <Route exact={true} path='/reservations'>
        <Redirect to={'/dashboard'} />
      </Route>
      <Route exact={true} path='/reservations/:reservation_id/edit'>
        <EditReservation />
      </Route>
      <Route exact={true} path='/tables/new'>
        <NewTable />
      </Route>
      <Route exact={true} path={`/search`}>
        <Search />
      </Route>
      <Route exact={true} path='/dashboard'>
        <Dashboard />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
