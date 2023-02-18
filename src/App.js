import { ReactComponent as Heart } from "./heart.svg";
import { ReactComponent as Hide } from "./hide.svg";
import { ReactComponent as Next } from "./next.svg";
import { ReactComponent as Pause } from "./pause.svg";
import { ReactComponent as Play } from "./play.svg";
import { ReactComponent as Preview } from "./preview.svg";
import { ReactComponent as Search } from "./search.svg";
import { ReactComponent as Share } from "./share.svg";
import "./App.css";
import { useEffect, useState, useRef } from "react";
import * as spotify from "./Spotify";
import RecentTracks from "./RecentTracks";
import { NewSingles, NewAlbums } from "./NewRelease";

function App() {
  const CLIENT_ID = "6f948a1c7d894133992a9aaad8f196df";
  const REDIRECT_URI = "http://localhost:3000";
  const RESPONSE_TYPE = "token";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const SCOPES = [
    "user-read-recently-played",
    "user-top-read",
    "user-read-playback-position",
    "playlist-read-private",
    "user-read-email",
    "ugc-image-upload",
    "user-read-playback-state",
    "user-modify-playback-state",
    "user-read-currently-playing",
    "app-remote-control",
    "streaming",
    "playlist-read-collaborative",
    "playlist-modify-private",
    "playlist-modify-public",
    "user-follow-modify",
    "user-follow-read",
    "user-library-modify",
    "user-library-read",
    "user-read-email",
    "user-read-private",
  ];
  const [token, setToken] = useState("");
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [newRelease, setNewRelease] = useState([]);
  const [playState, setPlayState] = useState(false);
  const [heartState, setHeartState] = useState(false);
  const [greetings, setGreetings] = useState("Good Morning");
  const date = new Date().getHour;
  const showPlayer = useRef();

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (hash && !token) {
      token = hash
        .substring(1)
        .split("&")
        .find((e) => e.startsWith("access_token"))
        .split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }
    setToken(token);
  }, []);

  function duration(e) {
    document.body.style.setProperty("--duration", `${e.target.value}%`);
  }

  function playerContainer() {
    if (showPlayer.current.style.display === "flex") {
      showPlayer.current.style.display = "none";
      document.body.style.setProperty("--overflow", "overlay");
      document.body.style.setProperty("--height", "initial");
    } else {
      showPlayer.current.style.display = "flex";
      document.body.style.setProperty("--overflow", "hidden");
      document.body.style.setProperty("--height", "100svh");
    }
  }

  if (token) {
    spotify.theToken(token);
    spotify.getRecentlyPlayed().then((e) => setRecentlyPlayed(e));
    spotify.getNewRelease().then((el) => setNewRelease(el));
  }

  if (date < 12) {
    setGreetings("Hello Morning");
  } else if (date < 18 && date >= 12) {
    setGreetings("Good Afternoon");
  } else if (date < 24 && date >= 18) {
    setGreetings("Good Evening");
  }

  function favState(e) {
    e.stopPropagation();
    if (e.target.style.fill === "white" && heartState) {
      e.target.style.fill = "transparent";
      setHeartState(false);
    } else {
      e.target.style.fill = "white";
      setHeartState(true);
    }
  }

  function songState(e) {
    e.stopPropagation();
    playState ? setPlayState(false) : setPlayState(true);
  }

  if (!token) {
    return (
      <a
        className="login-btn"
        href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPES.join(
          "%20"
        )}`}
      >
        Login to Spotify
      </a>
    );
  }
  return (
    <div className="App">
      <div className="main-container">
        <section className="player" onClick={playerContainer}>
          <div className="player-wrapper">
            <div className="cv-image"></div>
            <div className="song">
              <div className="title">Lonely</div>
              <div className="artist">Akon</div>
            </div>
            <div className="cv-image" onClick={favState}>
              <Heart className="icon" />
            </div>
            <div className="cv-image" onClick={songState}>
              {playState ? (
                <Pause className="icon" />
              ) : (
                <Play className="icon" />
              )}
            </div>
          </div>
        </section>
        <div className="top-bar">
          <h1>{greetings}</h1>
          <nav>
            <div className="cv-image">
              <Search className="icon" />
            </div>
          </nav>
        </div>
        <section className="recent-play">
          {recentlyPlayed.map((track) => (
            <RecentTracks track={track} uri={track.uri} />
          ))}
        </section>
        <section className="categories">
          <div className="title">New Singles</div>
          <div className="category">
            {newRelease.map((track) => (
              <NewSingles track={track} uri={track.uri} />
            ))}
          </div>
        </section>
        <section className="categories">
          <div className="title">New Albums</div>
          <div className="category">
            {newRelease.map((track) => (
              <NewAlbums track={track} uri={track.uri} />
            ))}
          </div>
        </section>
        <section className="categories likes">
          <div className="title">Recenly Played</div>
          <div className="category">
            <div className="container">
              <div className="cv-image lg"></div>
              <div className="category-title">
                Harry Styles, Bad Bunny, Taylor Swift, Rex Orange County
              </div>
            </div>
            <div className="container">
              <div className="cv-image lg"></div>
              <div className="category-title">
                Bruno Mars, Lady Gaga, Ben&Ben, Natoy, Burikit
              </div>
            </div>
            <div className="container">
              <div className="cv-image lg"></div>
              <div className="category-title">Bruno Mars</div>
            </div>
            <div className="container">
              <div className="cv-image lg"></div>
              <div className="category-title">Bruno Mars</div>
            </div>
            <div className="container">
              <div className="cv-image lg"></div>
              <div className="category-title">Bruno Mars</div>
            </div>
            <div className="container">
              <div className="cv-image lg"></div>
              <div className="category-title">Bruno Mars</div>
            </div>
            <div className="container">
              <div className="cv-image lg"></div>
              <div className="category-title">Bruno Mars</div>
            </div>
          </div>
        </section>
      </div>
      <div className="player-container" ref={showPlayer}>
        <div className="player-navbar">
          <div className="cv-image" onClick={playerContainer}>
            <Hide className="icon" />
          </div>
          <div className="album">Album</div>
          <div className="cv-image">
            <Share className="icon" />
          </div>
        </div>
        <div className="cover-section">
          <div className="cv-image lg"></div>
        </div>
        <section>
          <div className="song-details">
            <div className="title">Lonely</div>
            <div className="artist">Akon</div>
          </div>
          <div className="cv-image" onClick={favState}>
            <Heart className="icon" />
          </div>
        </section>
        <div className="song-duration">
          <input
            type="range"
            className="duration"
            defaultValue={0}
            min="0"
            max="100"
            onChange={duration}
          />
          <div className="time">
            <div className="current-time">0:00</div>
            <div className="total-time">0:00</div>
          </div>
        </div>
        <div className="controller">
          <div className="cv-image">
            <Preview className="icon" />
          </div>
          <div className="cv-image play" onClick={songState}>
            {playState ? <Pause className="icon" /> : <Play className="icon" />}
          </div>
          <div className="cv-image">
            <Next className="icon" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
