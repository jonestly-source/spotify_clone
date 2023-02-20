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
        artists: [track.track.artists.map((data) => data.name)],
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
    const songDetails = data.albums.items.map((data) => {
      return {
        title: data.name,
        uri: data.uri,
        albumUrl: data.images[0].url,
        albumType: data.album_type,
        artists: [data.artists.map((data) => data.name)],
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
    "https://api.spotify.com/v1/me/player/currently-playing",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (data) {
    const songDetails = {
      title: data.item.name,
      uri: data.item.uri,
      albumUrl: data.item.album.images[0].url,
      artists: [data.item.artists.map((data) => data.name)],
      playingType: data.currently_playing_type,
      duration: data.item.duration_ms,
      isPLaying: data.isPlaying,
      progress: data.progress_ms
    }
    return songDetails;
  }
  return null
};

export function msToTime(ms) {
  return new Date(ms).toISOString().slice(14, 19);
}

export function msToPercent(ms, totalms) {
  return `${Math.floor((ms * 100) / totalms)}%`;
}
