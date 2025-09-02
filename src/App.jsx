import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Card from "./components/Card";
import List from "./components/List";
import TracksChart from "./components/TracksChart";
import AlbumChart from "./components/AlbumChart";

const CLIENT_ID = import.meta.env.VITE_APP_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_APP_CLIENT_SECRET;

const App = () => {
  const [token, setToken] = useState(null);
  const [artistName, setArtistName] = useState("");
  const [artistId, setArtistId] = useState(null);
  const [albumsData, setAlbumsData] = useState([]);
  const [allTracks, setAllTracks] = useState([]);
  const [totalAlbums, setTotalAlbums] = useState(0);
  const [totalTracks, setTotalTracks] = useState(0);
  const [avgTracksPerAlbum, setAvgTracksPerAlbum] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [selectedAlbum, setSelectedAlbum] = useState("");
  const [filteredTracks, setFilteredTracks] = useState([]);
  const [albumChartDetails, setAlbumChartDetails] = useState([]);

  useEffect(() => {
    if (!token) getAccessToken();
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

  
  const searchArtist = async () => {
    if (!artistName || !token) return;

    try {
      const response = await axios.get(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(
          artistName
        )}&type=artist&limit=1`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.artists.items.length > 0) {
        setArtistId(response.data.artists.items[0].id);
      } else {
        alert("Artist not found!");
        setArtistId(null);
      }
    } catch (error) {
      console.error("Error searching artist:", error);
    }
  };

  useEffect(() => {
    if (artistId && token) fetchArtistAlbums(artistId, token);
  }, [artistId, token]);

  const fetchArtistAlbums = async (artistId, token) => {
    try {
      const response = await axios.get(
        `https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=album&limit=50`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const seen = new Set();
      const uniqueAlbums = response.data.items.filter((album) => {
        const baseName = album.name.replace(/\(.*?\)/g, "").trim().toLowerCase();
        if (seen.has(baseName)) return false;
        seen.add(baseName);
        return true;
      });

      setAlbumsData(uniqueAlbums);

      const chartDetails = uniqueAlbums.map((album) => ({
        name: album.name,
        release_year: album.release_date.split("-")[0],
        total_tracks: album.total_tracks,
      }));

      setAlbumChartDetails(chartDetails);
    } catch (error) {
      console.error("Error fetching albums:", error);
    }
  };

  const fetchTracksForAlbum = async (album_id, token, album) => {
    const response = await axios.get(
      `https://api.spotify.com/v1/albums/${album_id}/tracks`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return response.data.items.map((track) => ({
      ...track,
      album: { name: album.name, release_date: album.release_date },
    }));
  };


  useEffect(() => {
    if (albumsData.length > 0) {
      setTotalAlbums(albumsData.length);

      const total = albumsData.reduce((sum, album) => sum + album.total_tracks, 0);
      setTotalTracks(total);

      const avg = albumsData.length > 0 ? (total / albumsData.length).toFixed(1) : 0;
      setAvgTracksPerAlbum(avg);

      fetchAllTracks(albumsData);
    }
  }, [albumsData]);

  const fetchAllTracks = async (albumsList) => {
    let allTracksList = [];
    for (const album of albumsList) {
      const tracks = await fetchTracksForAlbum(album.id, token, album);
      allTracksList = [...allTracksList, ...tracks];
    }
    setAllTracks(allTracksList);
    filterTracks(allTracksList, searchInput, selectedAlbum);
  };

  const filterTracks = (tracks, search, album) => {
    const results = tracks.filter(
      (track) =>
        track.name.toLowerCase().includes(search.toLowerCase()) &&
        (album === "" || track.album.name === album)
    );
    setFilteredTracks(results);
  };

  useEffect(() => {
    filterTracks(allTracks, searchInput, selectedAlbum);
  }, [searchInput, selectedAlbum, allTracks]);

  return (
    <div className="App">
      {!artistId ? (
        <div className="artist-search">
          <h1>Search for an Artist</h1>
          <input
            type="text"
            placeholder="Enter an artist"
            value={artistName}
            onChange={(e) => setArtistName(e.target.value)}
          />
          <button onClick={searchArtist}>Search Artist</button>
        </div>
      ) : (
        <>
        <div className="artist-search">
        <h1>{artistName
          .toLowerCase()
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")}</h1>
          </div>
          <div className="card-container">
            <Card title="Total Albums" value={totalAlbums} />
            <Card title="Total Tracks" value={totalTracks} />
            <Card title="Avg Tracks per Album" value={avgTracksPerAlbum} />
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
              {albumsData.map((album) => (
                <option key={album.id} value={album.name}>
                  {album.name}
                </option>
              ))}
            </select>
          </div>

          <div className="list-chart-container">
            <List tracks={filteredTracks} />
            <div className="chart-container">
              <div className="tracks-chart">
                <TracksChart albumChartDetails={albumChartDetails} />
              </div>
              <div className="album-chart">
                <AlbumChart albumChartDetails={albumChartDetails} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;