import React from "react";

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
          </tr>
        </thead>
        <tbody>
          {tracks.length > 0 ? (
            tracks.map((track) => (
              <tr key={track.id}>
                <td>{track.name}</td>
                <td>{track.album.name}</td>
                <td>{track.album.release_date.split("-")[0]}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">Loading...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default List;