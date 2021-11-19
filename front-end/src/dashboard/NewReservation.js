import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import ErrorAlert from '../layout/ErrorAlert'
import { postReservation } from '../utils/api'

const NewReservation = ({ date }) => {

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        mobile_number: '',
        reservation_date: date,
        reservation_time: '10:08',
        people: '',
    })
    const [reservationsError, setReservationsError] = useState(null)

    const history = useHistory()

    const handleChange = ({ target }) => {
        let value = target.value
        if (target.name === 'people') {
            if (value < 1) value = 1
            
            value = Number(value)
        }

            setFormData({
                ...formData,
                [target.name]: value
            })
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        postReservation(formData)
            .then(res => {
                history.push(`/dashboard?data=${formData.reservation_date}`)
            }).catch((error) => {
                console.log('Error:', error)
                setReservationsError(error)
            })

        // console.log(formData)

        // setFormData({
        //     first_name: '',
        //     last_name: '',
        //     mobile_number: '',
        //     reservation_date: date,
        //     reservation_time: '10:08',
        //     people: 1,
        // })

        // history.goBack();

        // setFormData({ formData })
    }


    return (
        <div className='newReservation'>
            <h1>New Reservation</h1>
            <ErrorAlert error={reservationsError} />
            <form onSubmit={handleSubmit}>
                <label htmlFor='first_name'>
                    Enter Your First Name:
                    <input 
                        className='ml-2'
                        id='first_name'
                        type='text'
                        name='first_name'
                        onChange={handleChange}
                        value={formData.first_name}
                        required
                    />
                </label>
                <label htmlFor='last_name' className='ml-3'>
                    Enter Your Last Name:
                    <input 
                        className='ml-2'
                        id='last_name'
                        type='text'
                        name='last_name'
                        onChange={handleChange}
                        value={formData.last_name}
                        required
                    />
                </label>
                <label htmlFor='mobile_number' className='ml-3'>
                    Enter Mobile Phone Number:
                    <input 
                        className='ml-2'
                        id='mobile_number'
                        type='tel'
                        name='mobile_number'
                        onChange={handleChange}
                        value={formData.mobile_number}
                        required
                    />
                </label>
                <label htmlFor='reservation_date' className='ml-3'>
                    Select Reservation Date
                    <input 
                        className='ml-2 mr-3'
                        id='reservation_date'
                        type='date'
                        name='reservation_date'
                        onChange={handleChange}
                        value={formData.reservation_date}
                        required
                    />
                </label>
                <label htmlFor='reservation_time' className='ml-3'>
                    Select Reservation Time:
                    <input 
                        className='ml-2'
                        id='reservation_time'
                        type='time'
                        name='reservation_time'
                        onChange={handleChange}
                        value={formData.reservation_time}
                        required
                    />
                </label>
                <label htmlFor='people' className='ml-3'>
                    Number of Guests:
                    <input 
                        className='ml-2'
                        id='people'
                        type='number'
                        name='people'
                        onChange={handleChange}
                        value={formData.people}
                    />
                </label>
            </form>
            <button className=' btn btn-primary mr-3 mt-4' type='submit' onClick={handleSubmit}>Submit</button>
            <button type='cancel' className='btn btn-secondary mt-4' onClick={() => history.goBack()}>Cancel</button>
        </div>
    )

}

export default NewReservation