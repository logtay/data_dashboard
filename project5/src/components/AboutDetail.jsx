import React from "react";

const AboutDetail = () => {
    return (
        <div className="about-container">
            <h1>About This Data</h1>
            <p>This app uses the Spotify for Developers Web API. It is focused on displaying information and statistics about the English rockband Arctic Monkeys.</p>
            <p><strong>Main Dashboard:</strong> <br/> The Dashboard page acts as the main hub for the data. It includes a listing of every track released by the band as a main album. Compilations and singles have been excluded from the dataset. The Dashboard also includes two data visualization charts focused on 
            the distribution of tracks over albums, showing how each album has a similar amount of tracks. There is also a chart illustrating the gaps between album releases, demonstrating how, in their early career, releases came about quite consistently, but then gaps between releases increased.</p> 
            <p><strong>Track Details:</strong><br/>
            From the Dashboard, you can navigate to an individual details page for each track. It includes the data from the Dashboard listing, 
            as well as information about the track duration and the track popularity. Track popularity is a score given by Spotify. The track is given a score out of 100, based on its popularity with listeners. This number is not static and may frequently change.</p>
        </div>
    );
}
export default AboutDetail;