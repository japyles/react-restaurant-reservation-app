import React from 'react'
import { useHistory } from 'react-router-dom'
import { finishTable } from '../utils/api'
import ErrorAlert from '../layout/ErrorAlert'
import Table from './Table'

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */

function Tables ({ loadDashboard, tables, tablesError }) {
    const history = useHistory()
    function clearTable(table_id) {
        const confirm = window.confirm('Is this table ready to seat new guests?')
        if(confirm) {
            finishTable(table_id)
            .then(loadDashboard)
            .catch(console.log)
        }
    }

    return (
        <main className='tables'>
            <ErrorAlert error={tablesError} />
            <h1>Tables</h1>
            <div>
                <button className='tableBtn' onClick={() => history.push('/tables/new')}>New Table<span></span></button>
            </div>
            <div>
                {tables.map((table) => <Table key={table.table_id} table={table} clearTable={clearTable} />)}
            </div>
        </main>
    )
}

export default Tables