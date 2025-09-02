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
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {tracks.length > 0 ? (
            tracks.map((track) => (
              <tr key={track.id}>
                <td>
                  <a
                    href={track.external_urls.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none", color: "#1e1e1e" }}
                  >
                    {track.name}
                  </a>
                </td>
                <td>{track.album.name}</td>
                <td>{track.album.release_date.split("-")[0]}</td>
                <td>
                  <a
                    href={`/trackview/${track.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    🔗
                  </a>
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