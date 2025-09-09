# Project Title - Data Dashboard (Spotify)
This project is a web-based data dashboard that uses the Spotify Web API to fetch information about a chosen artist. Users can view a listing of released tracks, filter through them, and click on individual tracks to see detailed information such as duration and popularity. The dashboard also includes interactive data visualizations, as well as an About Page explaining the source of the data and how to interpret it.

## Features
- Search for artist and retrieve catalog data from Spotify
- Dynamically updated list of tracks with filtering capability
- Separate detail view with information about individual tracks
- Data visualizations to provide more in-depth analysis of artist's releases
- About Page provides context and details for dashboard

## Getting Started
### Prerequisites 
- Node.js
- Spotify Developer Account
- Spotify API Key

### Installation
1. Clone the repository
```
git clone https://github.com/logtay/data_dashboard.git
cd data_dashboard
```

2. Install dependencies
```
npm install
```

3. Create `.env` and add Spotify Developer credentials
```
VITE_APP_CLIENT_ID="your_client_id"
VITE_APP_CLIENT_SECRET="your_client_secret"
```

4. Start the server
```
npm run dev
```

5. View the app in your browser
```
http://localhost:5173
```

## Usage

Run the app in your browser:

<details>
<summary>Sample Actions</summary>

- Search and Explore Artists:
  - Enter an artist name to fetch their catalog information
  - Scroll through a track list of their catalog or use filtering options to narrow list 
  - Select `🔗` to view more information about a specific track
  - Click track name to open in Spotify

- Detail View:
  - View more detailed information about track (duration, popularity, release year etc.)
  - View album art for selected track 
  - Each detail page has its own unique URL

- Data Visualizations:
  - View overall summary statistics at top of page
  - Chart visualizations give more in-depth analysis of artist's work
    - Total Tracks per Album, Time Between Releases
 
- About Page:
  - Learn background information about the development of this project
  - View suggestions on how to interpret the data 
</details>

## Walkthrough
<img src='https://github.com/logtay/data_dashboard/blob/main/dashboardGIF.gif?raw=true' title='Dashboard Video Walkthrough' width='800' alt='Dashboard Video Walkthrough' />
