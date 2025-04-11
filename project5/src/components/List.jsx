import React from "react";
import { Link } from "react-router-dom"; 

const List = ({ tracks }) => {
  return (
    <div className="table-container">
      <h2>Track List</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Album</th>
            <th>Release Date</th>
            <th>Details</th> 
          </tr>
        </thead>
        <tbody>
          {tracks.length > 0 ? (
            tracks.map((track) => (
              <tr key={track.id}>
                <td>{track.name}</td>
                <td>{track.album.name}</td>
                <td>{track.album.release_date.split("-")[0]}</td>
                <td>
                  <Link to={`/trackview/${track.id}`} style={{  textDecoration: 'none' }}>
                  🔗
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">Loading...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default List;
