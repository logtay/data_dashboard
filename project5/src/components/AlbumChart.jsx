import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";

const AlbumChart = ({ albumChartDetails }) => {
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

  const sortedAlbums = albumChartDetails.map((album) => ({
      name: album.name,
      abbrev: abbreviatedTitles[album.name] || album.name,
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
      <LineChart width={600} height={300} data={gaps} margin={{ top: 20, right: 20, left: 20, bottom: 60 }}>
        <CartesianGrid stroke="#ccc" strokeDasharray="1 1" />
        <XAxis dataKey="name" textAnchor="end" dy={10} angle={-45} />
        <YAxis domain={[0, 7]} />
        <Tooltip
          labelFormatter={(value) => {
            const fullAlbum = gaps.find((d) => d.name === value);
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
          wrapperStyle={{ bottom: 2 }}/>
        <Line type="monotone" dataKey="gap" stroke="#ac742a" strokeWidth={5} />
      </LineChart>
    </div>
  );
};

export default AlbumChart;
