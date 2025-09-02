import React from "react";
import { BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar } from "recharts";

const TracksChart = ({ albumChartDetails }) => {

  const abbreviate = (title) => {
    if (!title) return "";
    const cleaned = title.replace(/\(.*?\)/g, "").replace(/[^a-zA-Z\s]/g, "");
    const words = cleaned.split(/\s+/).filter((w) => w.length > 0);
    return words.map((w) => w[0].toUpperCase()).join("");
  };

  const data = albumChartDetails.map((album) => ({
    name: abbreviate(album.name),
    fullName: album.name,
    total_tracks: album.total_tracks,
  }));

  return (
    <div>
      <h2>Total Tracks per Album</h2>
      <BarChart
        width={600}
        height={300}
        data={[...data].reverse()}
        margin={{ right: 20, left: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          interval={0}
          angle={-45}
          textAnchor="end"
          height={100}
        />
        <YAxis />
        <Tooltip
          cursor={{ fill: "transparent" }}
          labelFormatter={(value) => {
            const album = data.find((d) => d.name === value);
            return `Album: ${album?.fullName || value}`;
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