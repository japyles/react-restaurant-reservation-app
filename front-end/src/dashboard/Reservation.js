import React from 'react'
import { Link } from 'react-router-dom'
import { updateReservationStatus } from '../utils/api'

function Reservation ( { reservation, loadDashboard, setReservationsError } ) {
    
    const handleCancel = (event) => {
        event.preventDefault()

        const confirm = window.confirm (
            'Do you want to cancel this reservation?'
        )

        if (confirm) {
            cancelHandler(reservation.reservation_id)
        }
    }

    const cancelHandler = (reservation_id) => {
        const abortController = new AbortController()

        updateReservationStatus ( reservation_id, 'cancelled', abortController.status ) 
        .then(() => {
            return loadDashboard()
        })
        .catch(setReservationsError) 

        return () => abortController.abort()
    }

    return (
        <div className='card reservation mt-3'>
            <div className='card-body'>
                <h3 className='card-title'>Status: {reservation.status} - {reservation.first_name}, {reservation.last_name} Party Of: {reservation.people}</h3>
                <div>
                    Date: {reservation.reservation_date}, Time: {reservation.reservation_time}
                </div>
                <div data-reservation-id-status={reservation.reservation_id}>
                    {reservation.status}
                </div>
                <p className='card-text'>{reservation.mobile_number}</p>
                <p className='card-text'>{reservation.reservation_time}</p>
                <div>
                    {reservation.status !== 'seated' ? 
                        <Link
                            to={`/reservations/${reservation.reservation_id}/seat`}
                            className='btn seatBtn cardBtn m-2'
                        >
                            Seat
                        </Link> : ''}
                    <Link 
                        to={`/reservations/${reservation.reservation_id}/edit`} 
                        className='btn m-2 editBtn cardBtn'
                    >
                        Edit
                    </Link>
                    <button
                        className='btn cancelBtn m-2 cardBtn'
                        data-reservation-id-cancel={reservation.reservation_id}
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Reservation