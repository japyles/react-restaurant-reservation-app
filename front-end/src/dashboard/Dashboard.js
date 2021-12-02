import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import { listReservations, listTables } from "../utils/api";
import { today, previous, next } from '../utils/date-time'
import useQuery from '../utils/useQuery'
import ErrorAlert from "../layout/ErrorAlert";
import Reservation from './Reservation'
import Tables from '../tables/Tables'

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */

function Dashboard() {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tables, setTables] = useState([])
  const [tablesError, setTableError] = useState(null)
  
  const query = useQuery()
  const history = useHistory()

  const date = query.get('date') ? query.get('date') : today()

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);

    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);

      listTables(abortController.signal)
        .then((allTables) => {
          const updatedTables = allTables.map((table) => {
            return {...table}
          })
          return updatedTables 
        })
        .then(setTables)
        .catch(setTableError)
    return () => abortController.abort();
  }

  return (
    <main className='dashboard'>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for { date }</h4>
      </div>
      <div>
        <button className='btn mr-2 mt-4 mb-3 resButton' onClick={() => history.push(`/dashboard?date=${previous(date)}`)}>Previous Date<span></span></button>
        <button className='btn mt-4 mb-3 ml-2 resButton' onClick={() => history.push(`/dashboard?date=${today()}`)}>Today<span></span></button>
        <button className='btn mt-4 mb-3 ml-3 resButton' onClick={() => history.push(`/dashboard?date=${next(date)}`)}>Next Date<span></span></button>
      </div>
      <ErrorAlert error={reservationsError} />
      <div>
        {reservations.map((reservation) => <Reservation key={reservation.reservation_id} reservation={reservation} loadDashboard={loadDashboard} setReservationError={setReservationsError} />)}
      </div>
      <Tables loadDashboard={loadDashboard} tables={tables} tablesError={tablesError} />
    </main>
  );
}

export default Dashboard;
