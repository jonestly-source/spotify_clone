import { ReactComponent as Heart } from "./heart.svg";
import { ReactComponent as Hide } from "./hide.svg";
import { ReactComponent as Next } from "./next.svg";
import { ReactComponent as Pause } from "./pause.svg";
import { ReactComponent as Play } from "./play.svg";
import { ReactComponent as Preview } from "./preview.svg";
import { ReactComponent as Search } from "./search.svg";
import { ReactComponent as Share } from "./share.svg";
import { ReactComponent as Shuffle } from "./shuffle.svg";
import { ReactComponent as Repeat } from "./repeat.svg";
// eslint-disable-next-line
import { ReactComponent as Single } from "./single.svg";
import { average } from "color.js";
import "./App.css";
import { useEffect, useState, useRef } from "react";
import * as spotify from "./Spotify";
import RecentTracks from "./RecentTracks";
import { NewRelease, Category, FeaturedPlaylists, TopItems } from "./Categories";

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
  const [featuredPlaylists, setFeaturedPlaylists] = useState([])
  const [topItems, setTopItems] = useState([])
  const [categories, setCategories] = useState([])
  const [newRelease, setNewRelease] = useState([]);
  const [playState, setPlayState] = useState(false);
  const [heartState, setHeartState] = useState(false);
  const [greetings, setGreetings] = useState("");
  const [playerWrapper, setPlayerWrapper] = useState(true);
  const [currentTime, setCurrentTime] = useState("0:00")
  const [totalDur, setTotalDur] = useState("0:00")
  const [shuffleState, setShuffleState] = useState(false)
  const [repeatState, setRepeatState] = useState()
  const [nowPlaying, setNowPlaying] = useState()

  const showPlayer = useRef();

  useEffect(() => {
    const date = new Date().getHours();
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
    if (date < 12) {
      setGreetings("Good Morning");
    } else if (date < 18) {
      setGreetings("Good Afternoon");
    } else if (date < 24) {
      setGreetings("Good Evening");
    }
    setToken(token);
    if (token) {
      spotify.theToken(token);
      spotify.getRecentlyPlayed().then((e) => setRecentlyPlayed(e));
      spotify.getNewRelease().then((el) => setNewRelease(el));
      spotify.getNowPlaying().then(el => setNowPlaying(el))
      spotify.getCategory().then(e => setCategories(e))
      spotify.getFeaturedPlaylists().then(e => setFeaturedPlaylists(e))
      spotify.getTopItems().then(e => setTopItems(e))
      spotify.getFollowedArtists().then(e => console.log(e))
    }
  }, []);



  function duration(e) {
    document.body.style.setProperty("--duration", `${e.target.value}%`);
  }

  const playerContainer = (e) => {
    e.stopPropagation()
    if (showPlayer.current.style.display === "flex") {
      showPlayer.current.style.display = "none";
      document.body.style.setProperty("--overflow", "overlay");
      document.body.style.setProperty("--height", "initial");
      setPlayerWrapper(true)
    } else {
      showPlayer.current.style.display = "flex";
      document.body.style.setProperty("--overflow", "hidden");
      document.body.style.setProperty("--height", "100svh");
      setPlayerWrapper(false)
    }
  }

  useEffect(() => {
    if (nowPlaying) {
      average(nowPlaying.albumUrl, { format: "hex" }).then(color => document.body.style.setProperty("--player-color", color))
      setPlayState(nowPlaying.isPlaying)
      document.body.style.setProperty("--duration", `${spotify.msToPercent(nowPlaying.progress, nowPlaying.duration)}%`)
      setTotalDur(spotify.msToTime(nowPlaying.duration))
      setCurrentTime(spotify.msToTime(nowPlaying.progress))
    }
  }, [nowPlaying])




  const favState = (e) => {
    e.stopPropagation();
    heartState ? setHeartState(false) : setHeartState(true);
  }

  const songState = (e) => {
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
        {
          nowPlaying ?
            <section className="player" onClick={playerContainer} style={{ display: playerWrapper && nowPlaying ? "flex" : "none" }}>
              <div className="player-wrapper">
                <div className="cv-image">
                  <img src={nowPlaying.albumUrl} alt={nowPlaying.title} />
                </div>
                <div className="song">
                  <div className="title">{nowPlaying.title}</div>
                  <div className="artist">{nowPlaying.artists}</div>
                </div>
                <div className="cv-image" onClick={favState}>
                  <Heart className="icon" fill={heartState ? "white" : "transparent"} />
                </div>
                <div className="cv-image" onClick={songState}>
                  {playState ? (
                    <Pause className="icon" />
                  ) : (
                    <Play className="icon" />
                  )}
                </div>
              </div>
            </section> : null
        }
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
          <div className="title">New Released</div>
          <div className="category">
            {newRelease.map((track) => (
              <NewRelease track={track} uri={track.uri} />
            ))}
          </div>
        </section>
        <section className="categories">
          <div className="title">{featuredPlaylists.length ? featuredPlaylists[0].message : null}</div>
          <div className="category">
            {featuredPlaylists.map((playlists) => (
              <FeaturedPlaylists playlists={playlists} />
            ))}
          </div>
        </section>
        <section className="categories">
          <div className="title">Your Favorite Tracks</div>
          <div className="category">
            {topItems.map((track) => (
              <TopItems track={track} uri={track.uri}/>
            ))}
          </div>
        </section>
        <section className="categories">
          <div className="title">Categories</div>
          <div className="category">
            {categories.map((category) => (
              <Category category={category} />
            ))}
          </div>
        </section>
      </div>
      {
        nowPlaying ?
          <div className="player-container" ref={showPlayer}>
            <div className="player-navbar">
              <div className="cv-image" onClick={playerContainer}>
                <Hide className="icon" />
              </div>
              <div className="cv-image">
                <Share className="icon" />
              </div>
            </div>
            <div className="cover-section">
              <div className="cv-image lg">
                <img src={nowPlaying.albumUrl} alt={nowPlaying.title} />
              </div>
            </div>
            <section>
              <div className="song-details">
                <div className="title">{nowPlaying.title}</div>
                <div className="artist">{nowPlaying.artists.join(", ")}</div>
              </div>
              <div className="cv-image" onClick={favState}>
                <Heart className="icon" fill={heartState ? "white" : "transparent"} />
              </div>
            </section>
            <div className="song-duration">
              <input
                type="range"
                className="duration"
                defaultValue={spotify.msToPercent(nowPlaying.progress, nowPlaying.duration)}
                min="0"
                max="100"
                onChange={duration}
              />
              <div className="time">
                <div className="current-time">{currentTime}</div>
                <div className="total-time">{totalDur}</div>
              </div>
            </div>
            <div className="controller">
              <div className="cv-image" style={{ marginRight: "auto" }} onClick={shuffleState ? () => setShuffleState(false) : () => setShuffleState(true)} >
                <Shuffle className="icon" aria-selected={shuffleState} />
              </div>
              <div className="cv-image">
                <Preview className="icon" />
              </div>
              <div className="cv-image play" onClick={songState}>
                {playState ? <Pause className="icon" /> : <Play className="icon" />}
              </div>
              <div className="cv-image">
                <Next className="icon" />
              </div>
              <div className="cv-image" style={{ marginLeft: "auto" }}>
                <Repeat className="icon" />
              </div>
            </div>
          </div> : null
      }
    </div>
  );
}

export default App;
