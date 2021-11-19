import React, { useState } from "react";
import { listReservationsByPhoneNumber } from '../utils/api';
import Reservation from '../dashboard/Reservation';
import ErrorAlert from '../layout/ErrorAlert'

function Search() {
  const [list, setList] = useState([]);
  const [mobileNumber, setMobileNumber] = useState("");
  const [error, setError] = useState(null);

  function handleChange({ target }) {
    setMobileNumber(target.value);
  }

  function handleSearch(event) {
    if (event) event.preventDefault();
    setError(null);
    listReservationsByPhoneNumber(mobileNumber)
      .then(setList)
      .catch(setError);
  }
  return (
    <div className='search'>
      <ErrorAlert error={error} />
      <h2 className='mt-3 ml-3'>Search</h2>
      <form name='reservation' onSubmit={handleSearch}>
        <input
          className='ml-3'
          type='text'
          name='mobile_number'
          placeholder='Enter phone number'
          onChange={handleChange}
          value={mobileNumber}
        ></input>
        <button type='submit' className='btn btn-info m-2'>
          Find
        </button>
      </form>
      {list.length ? (
        <div>
          {list.map(res => <Reservation loadDashboard={handleSearch} reservation={res} />)}
        </div>
      ) : (
        <div className='ml-3 resFound'>NO RESERVATIONS FOUND</div>
      )}
    </div>
  );
}

export default Search