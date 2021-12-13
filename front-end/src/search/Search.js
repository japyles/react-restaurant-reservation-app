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
      <h2>Search</h2>
      <div className='searchForm'>
        <form name='reservation' onSubmit={handleSearch}>
          <input
            type='text'
            name='mobile_number'
            placeholder='Enter phone number'
            onChange={handleChange}
            value={mobileNumber}
          ></input>
          <button type='submit' className='searchBtn'>
            Find
          <span></span></button>
        </form>
      </div>
      
      {list.length ? (
        <div>
          {list.map(res => <Reservation key={res.reservation_id} loadDashboard={handleSearch} reservation={res} />)}
        </div>
      ) : (
        <div className='resFound'>No reservations found</div>
      )}
    </div>
  );
}

export default Search