import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { editReservation, readReservation } from '../utils/api'
import ErrorAlert from '../layout/ErrorAlert'

function EditReservation() {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        mobile_number: '',
        reservation_date: '',
        reservation_time: '',
        people: 1,
    })
    const [reservationError, setReservationError] = useState(null)
    
    const history = useHistory()
    const params = useParams()

    useEffect(() => {
        const abortController = new AbortController();
        setReservationError(null);
        readReservation(params.reservation_id, abortController.signal)
          .then((reservation) => setFormData({
              ...reservation,
              reservation_date: new Date(reservation.reservation_date).toISOString().substr(0, 10)
          }))
          .catch(setReservationError);
        return () => abortController.abort();
    }, [])

    const handleSubmit = (event) => {
        event.PreventDefault()
        const abortController = new AbortController()
        editReservation(formData, params.reservation_id, abortController.signal)
            .then(() => history.push(`/dashboard?data=${formData.reservation_date}`))
            .catch(setReservationError)
        return () => abortController.abort()
    }

    const handleChange = ({ target }) => {
        let value = target.value

        if (target.name === 'people') {
            if (value < 1) {
                value = 1
                value = Number(value)
            }

            setFormData({
                ...formData,
                [target.name]: value,
            })
        }
    }

    return (
        <div className='editRes'>
            <h1>Edit Reservations</h1>
            <ErrorAlert error={reservationError} />
            <form onSubmit={handleSubmit}>
                <label htmlFor='first_name'>
                    Enter Your First Name
                    <input
                        id='first_name'
                        type='text'
                        name='first_name'
                        onChange={handleChange}
                        defaultValue={formData.first_name}
                        className='ml-2'
                    />
                </label>
                <label htmlFor='last_name' className='ml-3'>
                    Enter Your Last Name
                    <input
                        id='last_name'
                        type='text'
                        name='last_name'
                        onChange={handleChange}
                        defaultValue={formData.last_name}
                        className='ml-2'
                    />
                </label>
                <label htmlFor='mobile_phone' className='ml-3'>
                    Enter Your Mobile Phone Number
                    <input
                        id='mobile_phone'
                        type='tel'
                        name='mobile_phone'
                        onChange={handleChange}
                        defaultValue={formData.mobile_number}
                        className='ml-2'
                    />
                </label>
                <label htmlFor='reservation_date' className='ml-3'>
                    Select Reservation Date
                    <input
                        id='reservation_date'
                        type='date'
                        name='reservation_date'
                        onChange={handleChange}
                        defaultValue={formData.reservation_date}
                        className='ml-2'
                    />
                </label>
                <label htmlFor='reservation_time' className='ml-3'>
                    Select Reservation Time
                    <input
                        id='reservation_time'
                        type='time'
                        name='reservation_time'
                        onChange={handleChange}
                        defaultValue={formData.reservation_time}
                        className='ml-2'
                    />
                </label>
                <label htmlFor='people' className='ml-3'>
                    Number of Guests
                    <input
                        id='people'
                        type='number'
                        name='people'
                        onChange={handleChange}
                        defaultValue={formData.people}
                        className='ml-2'
                    />
                </label>
            </form>
            <button type='submit' onClick={() => history.goBack()} className='btn btn-secondary mt-4 ml-2'>Submit</button>
        </div>
    )
}


export default EditReservation