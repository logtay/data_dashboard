import React from "react";
import { BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar } from "recharts";

const TracksChart = ({ albumChartDetails }) => {
  const abbreviatedTitles = {
    "The Car": "The Car",
    "AM": "AM",
    "Tranquility Base Hotel & Casino": "TBHC",
    "Humbug": "Humbug",
    "Live at the Royal Albert Hall": "Live at RAH",
    "Favourite Worst Nightmare (Standard Version)": "FWN",
    "Whatever People Say I Am, That's What I'm Not": "WPSIATWIN",
    "Suck It and See": "SIAS",
  };

  const data = albumChartDetails.map((album) => ({
    name: abbreviatedTitles[album.name] || album.name,
    total_tracks: album.total_tracks,
  }));

  return (
    <div>
      <h2>Total Tracks per Album</h2>
      <BarChart width={600} height={300} data={[...data].reverse()} margin={{  right: 20, left: 20 }} >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" interval={0} angle={-45} textAnchor="end"  height={100}/>
        <YAxis />
        <Tooltip
          cursor={{fill: 'transparent'}}
          labelFormatter={(value) => {
            const fullAlbum = data.find((title) => title.name === value);
            return `Album: ${fullAlbum?.name || value}`;
          }}
          formatter={(value, name) => {
            if (name === "total_tracks") return [value, "Total Tracks"];
            return [value, name];
          }}
        />
        <Legend
          formatter={(value) =>
            value === "total_tracks" ? "Total Tracks" : value
          }
        />
        <Bar dataKey="total_tracks" fill="#ac742a" />
      </BarChart>
    </div>
  );
};

export default TracksChart;
