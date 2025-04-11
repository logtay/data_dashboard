import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Header from "./components/Header";
import Card from "./components/Card";
import Navbar from "./components/Navbar";
import List from "./components/List";
import TracksChart from "./components/TracksChart";
import AlbumChart from "./components/AlbumChart";


const CLIENT_ID = import.meta.env.VITE_APP_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_APP_CLIENT_SECRET;
const artist_id = "7Ln80lUS6He07XvHI8qqHH";

const App = () => {
  const [token, setToken] = useState(null);
  const [albumsData, setAlbumsData] = useState([]);
  const [allTracks, setAllTracks] = useState([]);
  const [totalAlbums, setTotalAlbums] = useState(0);
  const [yearsActive, setYearsActive] = useState(0);
  const [totalTracks, setTotalTracks] = useState(0);
  const [searchInput, setSearchInput] = useState('');
  const [selectedAlbum, setSelectedAlbum] = useState('');
  const [filteredTracks, setFilteredTracks] = useState([]);
  const [albumChartDetails, setAlbumChartDetails] = useState([]);

  useEffect(() => {
    if (!token) {
      getAccessToken();
    }
  }, [token]);

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

  const fetchArtistAlbums = async (artist_id, token) => {
    const response = await axios.get(
      `https://api.spotify.com/v1/artists/${artist_id}/albums?include_groups=album`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    
    const getChartDetails = response.data.items.map((album) => ({
      name: album.name,
      release_year: album.release_date.split("-")[0],
      total_tracks: album.total_tracks,
    }));
    setAlbumChartDetails(getChartDetails);  
    setAlbumsData(response.data.items);    
  };

  const fetchTracksForAlbum = async (album_id, token, album) => {
    const response = await axios.get(
      `https://api.spotify.com/v1/albums/${album_id}/tracks`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data.items.map((track) => ({
      ...track,
      album: {
        name: album.name,
        release_date: album.release_date,
      },
    }));
  };

  useEffect(() => {
    if (token) {
      fetchArtistAlbums(artist_id, token);
    }
  }, [token]);

  useEffect(() => {
    if (albumsData.length > 0) {
      getTotalAlbums();
      getYearsActive();
      getTotalTracks();
      fetchAllTracks();
    }
  }, [albumsData]);

  const getTotalAlbums = () => {
    setTotalAlbums(albumsData.length);
  };

  const getYearsActive = () => {
    const recent = parseInt(albumsData[0].release_date.split("-")[0]);
    const oldest = parseInt(albumsData[albumsData.length - 1].release_date.split("-")[0]);
    setYearsActive(recent - oldest);
  };

  const getTotalTracks = () => {
    const total = albumsData.reduce((sum, album) => sum + album.total_tracks, 0);
    setTotalTracks(total);
  };

  const fetchAllTracks = async () => {
    let allTracksList = [];
    for (const album of albumsData) {
      const tracks = await fetchTracksForAlbum(album.id, token, album);
      allTracksList = [...allTracksList, ...tracks];
    }
    setAllTracks(allTracksList);
    filterTracks(allTracksList, searchInput, selectedAlbum);
  };

  const filterTracks = (tracks, search, album) => {
    const results = tracks.filter((track) =>
      track.name.toLowerCase().includes(search.toLowerCase()) &&
      (album === '' || track.album.name === album)
    );
    setFilteredTracks(results);
  };

  useEffect(() => {
    filterTracks(allTracks, searchInput, selectedAlbum);
  }, [searchInput, selectedAlbum, allTracks]);

  return (
    <div className="App">
      <div className="card-container">
        <Card title="Total Albums" value={totalAlbums} />
        <Card title="Total Tracks" value={totalTracks} />
        <Card title="Years Active" value={yearsActive} />
      </div>

      <div className="filters">
        <input
          type="text"
          placeholder="Search for a track..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <select
          value={selectedAlbum}
          onChange={(e) => setSelectedAlbum(e.target.value)}
        >
          <option value="">All Albums</option>
          {albumsData.map(album => (
            <option key={album.id} value={album.name}>
              {album.name}
            </option>
          ))}
        </select>
          <div className="list-chart-container">
        <List tracks={filteredTracks} />
        <div className="chart-container">
      <div className="tracks-chart"><TracksChart albumChartDetails={albumChartDetails} />
      </div> 
      <div className="album-chart"><AlbumChart albumChartDetails={albumChartDetails} /></div>
</div></div>
      </div>
    </div>
  );
};

export default App;
