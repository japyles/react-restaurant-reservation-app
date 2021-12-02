import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import ErrorAlert from '../layout/ErrorAlert'
import { postTable } from '../utils/api'

function NewTable() {

    const [formData, setFormData] = useState({table_name: '', capacity: ''})
    const [tableError, setTableError] = useState(null)

    const history = useHistory()

    const handleChange = ({ target }) => {
        let value = target.value
        if (target.name === 'capacity') {
            if (value < 1) {
                value = 1
            }

            value = Number(value)
        }
        setFormData({
            ...formData,
            [target.name]: value,
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        postTable(formData).then(res => {
            history.push('/dashboard')
        }).catch((error) => {
            console.log('Error: ', error) 
            setTableError(error)
        })
    }

    return (
        <div className='newTable'>
            <h1 className='mt-3 mb-3'>New Table</h1>
            <ErrorAlert error={tableError} />
            <form onSubmit={handleSubmit}>
                <label htmlFor='table_name'>
                    Enter the Table's Name:
                    <input
                        className='ml-2 mb-3'
                        id='table_name'
                        type='text'
                        name='table_name'
                        onChange={handleChange}
                        value={formData.table_name}
                        required
                    />
                </label>
                <br />
                <label htmlFor='capacity'>
                    Enter Table's Capacity:
                    <input
                        className='ml-3'
                        id='capacity'
                        type='number'
                        name='capacity'
                        onChange={handleChange}
                        value={formData.capacity}
                        required
                    />
                </label>
                <button type='submit' className='btn btn-primary mr-3 mt-4'>Submit</button>
                <button type='cancel' className='btn btn-secondary mt-4' onClick={() => history.goBack()}>Cancel</button>
            </form>
        </div>
    )
}

export default NewTable