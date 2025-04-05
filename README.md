# Web Development Project 5 - **Data Dashboard*

Submitted by: **Taylor Femat**

This web app: **This app provides users with summary statistics about the band Arctic Monkeys, pulled from the Spotify API. It also provides the user with a list of all album tracks, which they can then filter.**

Time spent: **13** hours spent in total

## Required Features

The following **required** functionality is completed:

- [x] **The site has a dashboard displaying a list of data fetched using an API call**
  - The dashboard should display at least 10 unique items, one per row
  - The dashboard includes at least two features in each row
- [x] **`useEffect` React hook and `async`/`await` are used**
- [x] **The app dashboard includes at least three summary statistics about the data** 
  - The app dashboard includes at least three summary statistics about the data, such as:
    - *The total number of albums, the total number of tracks, and the years the band has been active according to their releases.*
- [x] **A search bar allows the user to search for an item in the fetched data**
  - The search bar **correctly** filters items in the list, only displaying items matching the search query
  - The list of results dynamically updates as the user types into the search bar
- [x] **An additional filter allows the user to restrict displayed items by specified categories**
  - The filter restricts items in the list using a **different attribute** than the search bar 
  - The filter **correctly** filters items in the list, only displaying items matching the filter attribute in the dashboard
  - The dashboard list dynamically updates as the user adjusts the filter

The following **optional** features are implemented:

- [x] Multiple filters can be applied simultaneously
- [x] Filters use different input types
  - e.g., as a text input, a dropdown or radio selection, and/or a slider
- [ ] The user can enter specific bounds for filter values

The following **additional** features are implemented:

* [ ] List anything else that you added to improve the site's functionality!

## Video Walkthrough

Here's a walkthrough of implemented user stories:

<img src='http://i.imgur.com/link/to/your/gif/file.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

<!-- Replace this with whatever GIF tool you used! -->
GIF created with ...  [Kap](https://getkap.co/) for macOS


## Notes

It was difficult for me to truly measure how much time I spent working on this. I intially started with one API, realized how difficult it would be to get summary statistics from that data, moved to other APIs which I also found the data hard to work with or they had security stipulations that I felt would be too difficult for me to implment. I have only worked with a few very basic APIs, mostly just returning images, so I think I didn't know what to look for in terms of an API that would be more user friendly to me. It was a lot of trial and error in finding the right API and then understanding how the data was organized. It was very overwhelming but rewarding in the end. 

## License

    Copyright 2025 Taylor Femat

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.