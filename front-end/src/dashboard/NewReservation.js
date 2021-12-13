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
                history.push(`/dashboard?date=${formData.reservation_date}`)
            }).catch((error) => {
                console.log('Error:', error)
                setReservationsError(error)
            })
    }


    return (
        <div className='newReservation'>
            <h1>New Reservation</h1>
            <ErrorAlert error={reservationsError} />
            <form onSubmit={handleSubmit} className='newResForm'>
                <div className='newResNames'>
                    <div className='newResFirstName'>
                        <label htmlFor='first_name'>
                            First Name
                            <input 
                                className='fn-input'
                                id='first_name'
                                type='text'
                                name='first_name'
                                onChange={handleChange}
                                value={formData.first_name}
                                required
                            />
                        </label>
                    </div>
                    
                    <div className='newResLastName'>
                        <label htmlFor='last_name'>
                            Last Name
                            <input 
                                id='last_name'
                                type='text'
                                name='last_name'
                                onChange={handleChange}
                                value={formData.last_name}
                                required
                            />
                        </label>
                    </div>
                </div>
                
                <div className='newResMobile'>
                    <label htmlFor='mobile_number'>
                        Mobile Phone Number
                        <input 
                            id='mobile_number'
                            type='tel'
                            name='mobile_number'
                            onChange={handleChange}
                            value={formData.mobile_number}
                            required
                        />
                    </label>
                </div>
                
                <div className='newResDateTime'>
                    <div className='newResDate'>
                        <label htmlFor='reservation_date'>
                            Select Reservation Date
                            <input 
                                id='reservation_date'
                                type='date'
                                name='reservation_date'
                                onChange={handleChange}
                                value={formData.reservation_date}
                                required
                            />
                        </label>
                    </div>
                    <div className='newResTime'>
                        <label htmlFor='reservation_time'>
                            Select Reservation Time
                            <input 
                                id='reservation_time'
                                type='time'
                                name='reservation_time'
                                onChange={handleChange}
                                value={formData.reservation_time}
                                required
                            />
                        </label>
                    </div>
                </div>

                <div className='newResPeople'>
                    <label htmlFor='people'>
                        Number of Guests:
                        <input 
                            id='people'
                            type='number'
                            name='people'
                            onChange={handleChange}
                            value={formData.people}
                        />
                    </label>
                </div>
                
                <div className='newResBtn'>
                    <button className='btn submitBtn' type='submit'>Submit<span></span></button>
                    <button type='cancel' className='btn cancelBtn' onClick={() => history.push(`/dashboard`)}>Cancel<span></span></button>
                </div>
            </form>
        </div>
    )

}

export default NewReservation