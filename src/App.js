import heart from "./heart.svg";
import hide from "./hide.svg";
import library from "./library.svg";
import next from "./next.svg";
import pause from "./pause.svg";
import play from "./play.svg";
import preview from "./preview.svg";
import search from "./search.svg";
import share from "./share.svg";
import "./App.css";
import { useEffect, useState, useRef } from "react";

function App() {
  const CLIENT_ID = "6f948a1c7d894133992a9aaad8f196df";
  const REDIRECT_URI = "http://localhost:3000";
  const RESPONSE_TYPE = "token";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const [token, setToken] = useState("");
  var playState = false;
  const playStateRef = useRef();

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
  
  useEffect(() => {
    playStateRef.current.src = playState ? { pause } : { play };
  }, [token])

  function duration(e) {
    console.log(e);
  }

  function playerContainer() {
    return;
  }

  function songState(e) {
    e.stopPropagation();
    playState ? (playState = false) : (playState = true);
    console.log(playState);
  }

  if (!token) {
    return (
      <a
        className="login-btn"
        href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
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
            <div className="cv-image">
              <img src={heart} alt="" className="icon" />
            </div>
            <div className="cv-image" onClick={songState}>
              <img src={play} alt="" className="icon" ref={playStateRef} />
            </div>
          </div>
        </section>
        <div className="top-bar">
          <h1>Good Afternoon</h1>
          <nav>
            <div className="cv-image">
              <input
                type="search"
                name=""
                id=""
                onChange={() => console.log("hello")}
              />
              <img src={search} alt="" className="icons" />
            </div>
            <div className="cv-image">
              <img src={library} alt="" className="icons" />
            </div>
          </nav>
        </div>
        <section className="recent-play">
          <div className="tiles">
            <div className="cv-image"></div>
            <div className="category-title">Pasilyo</div>
          </div>
          <div className="tiles">
            <div className="cv-image"></div>
            <div className="category-title">Liked Songs</div>
          </div>
          <div className="tiles">
            <div className="cv-image"></div>
            <div className="category-title">It's a Hit</div>
          </div>
          <div className="tiles">
            <div className="cv-image"></div>
            <div className="category-title">Viral Hits</div>
          </div>
          <div className="tiles">
            <div className="cv-image"></div>
            <div className="category-title">Drunk Text</div>
          </div>
          <div className="tiles">
            <div className="cv-image"></div>
            <div className="category-title">New Music Friday Phillipines</div>
          </div>
        </section>
        <section className="categories likes">
          <div className="title">More of what you like</div>
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
        <section className="categories likes">
          <div className="title">Torjak</div>
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
      <div className="player-container">
        <div className="player-navbar">
          <div className="cv-image" onClick={playerContainer}>
            <img src={hide} alt="" className="icon" />
          </div>
          <div className="album">Album</div>
          <div className="cv-image">
            <img src={share} alt="" className="icon" />
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
          <div className="cv-image">
            <img src={heart} alt="" className="icon" />
          </div>
        </section>
        <div className="song-duration">
          <input
            type="range"
            className="duration"
            value="0"
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
            <img src={preview} alt="" className="icon" />
          </div>
          <div className="cv-image">
            <img src={play} alt="" className="icon play" />
          </div>
          <div className="cv-image">
            <img src={next} alt="" className="icon" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
