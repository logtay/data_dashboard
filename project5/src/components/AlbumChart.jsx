import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";

const AlbumChart = ({ albumChartDetails }) => {
  const abbreviate = (title) => {
    if (!title) return "";
    const words = title
      .replace(/[^a-zA-Z\s]/g, "")
      .split(/\s+/)
      .filter((w) => w.length > 0);
    return words.map((w) => w[0].toUpperCase()).join("");
  };


  const sortedAlbums = albumChartDetails
    .map((album) => ({
      name: album.name,
      abbrev: abbreviate(album.name), 
      release_year: parseInt(album.release_year, 10),
    }))
    .sort((a, b) => a.release_year - b.release_year);

  const gaps = sortedAlbums.map((album, index) => {
    if (index === 0) return { name: album.abbrev, gap: 0 };
    const gap = album.release_year - sortedAlbums[index - 1].release_year;
    return { name: album.abbrev, gap };
  });

  return (
    <div>
      <h2>Time Between Releases</h2>
      <LineChart
        width={600}
        height={300}
        data={gaps}
        margin={{ top: 20, right: 20, left: 20, bottom: 60 }}
      >
        <CartesianGrid stroke="#ccc" strokeDasharray="1 1" />
        <XAxis dataKey="name" textAnchor="end" dy={10} angle={-45} tick={false} />
        <YAxis domain={[0, 7]} />
        <Tooltip
          labelFormatter={(value) => {
            const fullAlbum = sortedAlbums.find((d) => d.abbrev === value);
            return `Album: ${fullAlbum?.name || value}`;
          }}
          formatter={(value, name) => {
            if (name === "gap") return [value, "Years Between Releases"];
            return [value, name];
          }}
        />
        <Legend
          formatter={(value) =>
            value === "gap" ? "Years Between Releases" : value
          }
          wrapperStyle={{ bottom: 2 }}
        />
        <Line type="monotone" dataKey="gap" stroke="#ac742a" strokeWidth={5} />
        <text
    x={300} 
    y={250}   
    textAnchor="middle"
    fontSize={22}
    fill="#666"
    fontWeight={600}
  >
    Tip: Hover over a point to see the album name
  </text>
      </LineChart>
    </div>
  );
};

export default AlbumChart;