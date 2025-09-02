import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CLIENT_ID = import.meta.env.VITE_APP_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_APP_CLIENT_SECRET;

const TrackDetail = () => {
  const { id } = useParams();
  const [token, setToken] = useState(null);
  const [trackDetails, setTrackDetails] = useState(null);

  useEffect(() => {
    const getAccessToken = async () => {
      const authUrl = `https://accounts.spotify.com/api/token`;
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + btoa(`${CLIENT_ID}:${CLIENT_SECRET}`),
      };
      const data = new URLSearchParams();
      data.append("grant_type", "client_credentials");

      try {
        const response = await axios.post(authUrl, data, { headers });
        setToken(response.data.access_token);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (!token) {
      getAccessToken();
    }
  }, [token]);

  useEffect(() => {
    if (token && id) {
      const getTrackDetails = async () => {
        try {
          const response = await axios.get(
            `https://api.spotify.com/v1/tracks/${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setTrackDetails(response.data);
        } catch (error) {
          console.error("Error:", error);
        }
      };

      getTrackDetails();
    }
  }, [token, id]);

  if (!trackDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="track-detail-container">
        <h1>{trackDetails.name}</h1>
        <div className="img-info">
      <img
        className="track-image"
        src={trackDetails.album.images[0].url}
        alt={trackDetails.album.name}
      />
      <div className="track-info">
        <p><strong>Album:</strong> {trackDetails.album.name}</p>
        <p><strong>Release Date:</strong> {trackDetails.album.release_date}</p>
        <p>
          <strong>Duration:</strong> {Math.floor(trackDetails.duration_ms / 60000)}:
          {Math.floor((trackDetails.duration_ms % 60000) / 1000)
            .toString()
            .padStart(2, "0")}{" "}
          minutes
        </p>
        <p><strong>Popularity:</strong> {trackDetails.popularity}/100</p></div>
      </div>
    </div>
  );
};

export default TrackDetail;
