import axios from "axios";

var token = null;
export function theToken(val) {
  token = val;
}

export async function getRecentlyPlayed() {
  const { data } = await axios.get(
    "https://api.spotify.com/v1/me/player/recently-played",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        limit: 6,
      },
    }
  );

  if (data) {
    const songDetails = data.items.map((track) => {
      return {
        title: track.track.name,
        uri: track.track.uri,
        albumUrl: track.track.album.images[0].url,
        artists: [track.track.artists.map((e) => e.name)],
      };
    });
    return songDetails;
  }
}

export async function getNewRelease() {
  const { data } = await axios.get(
    "https://api.spotify.com/v1/browse/new-releases",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        limit: 15,
        country: "PH",
      },
    }
  );
  if (data) {
    // console.log(data.albums.items)
    const songDetails = data.albums.items.map((e) => {
      return {
        title: e.name,
        uri: e.uri,
        albumUrl: e.images[0].url,
        albumType: e.album_type,
        artists: [e.artists.map((e) => e.name)],
      };
    });
    return songDetails;
  }
}

export async function getUser() {
  const { data } = await axios.get("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}

export const getPlaybackState = async () => {
  const { data } = await axios.get("https://api.spotify.com/v1/me/player", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const getNowPlaying = async () => {
  const { data } = await axios.get(
    "https://api.spotify.com/v1/me/player/curreny-playing",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (data) {
    return data.map((e) => {
      return {
        title: e.item.name,
        uri: e.item.uri,
        albumUrl: e.item.album.images[0].url,
        artists: [e.artists.map((e) => e.name)],
        playingType: e.currently_playing_type,
        duration: e.item.duration_ms,
        shuffleState: e.shuffle_state,
        repeatState: e.repeat_state,
      };
    });
  }
};

export function msToTime(ms) {
  return new Date(ms).toISOString().slice(14, 19);
}

export function msToPercent(ms, totalms) {
  return `${Math.floor((ms * 100) / totalms)}%`;
}
