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

      <div>
        <h1 className='dashTitle'>Dashboard</h1>
      </div>

      <div className='dashboard-main'>
        <div className='resList'>
          <h4 className='res'>Reservations For:</h4>
          <h4 className='dashDate'>{ date }</h4>
          <div className='dashboardBtns'>
            <button className='resButton' onClick={() => history.push(`/dashboard?date=${previous(date)}`)}>Previous Date<span></span></button>
            <button className='resButton' onClick={() => history.push(`/dashboard?date=${today()}`)}>Today<span></span></button>
            <button className='resButton' onClick={() => history.push(`/dashboard?date=${next(date)}`)}>Next Date<span></span></button>
          </div>
          <div className='resMap'>
            {reservations.map((reservation) => <Reservation key={reservation.reservation_id} reservation={reservation} loadDashboard={loadDashboard} setReservationError={setReservationsError} />)}
          </div>
        </div>

        <ErrorAlert error={reservationsError} />

        <hr />

        <div className='tableList'>
          <Tables loadDashboard={loadDashboard} tables={tables} tablesError={tablesError} />
        </div>
      </div>
      
    </main>
  );
}

export default Dashboard;


