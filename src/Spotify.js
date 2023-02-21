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
        artists: track.track.artists.map((data) => data.name).join(", "),
      };
    });
    return songDetails;
  } else {
    return null;
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
        artists: data.artists.map((data) => data.name).join(', '),
      };
    });
    return songDetails;
  } else {
    return null;
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
      albumUrl: data.item.album.images[1].url,
      artists: data.item.artists.map((data) => data.name).join(', '),
      playingType: data.currently_playing_type,
      duration: data.item.duration_ms,
      isPlaying: data.is_playing,
      progress: data.progress_ms,
    };
    return songDetails;
  }
  return null;
};

export const getCategory = async () => {
  const { data } = await axios.get(
    "https://api.spotify.com/v1/browse/categories",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (data) {
    return data.categories.items.map((item) => {
      return {
        title: item.name,
        link: item.href,
        iconUrl: item.icons[0].url,
      };
    });
  } else {
    return null;
  }
};

export const getFeaturedPlaylists = async () => {
  const { data } = await axios.get(
    "https://api.spotify.com/v1/browse/featured-playlists",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (data) {
    return data.playlists.items.map((item) => {
      return {
        message: data.message,
        title: item.name,
        uri: item.uri,
        playlistsUrl: item.images[0].url,
        description: item.description,
      };
    });
  } else {
    return null;
  }
};

export const getTopItems = async () => {
  const { data } = await axios.get("https://api.spotify.com/v1/me/top/tracks", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (data) {
    return data.items.map((item) => {
      return {
        title: item.name,
        uri: item.uri,
        albumUrl: item.album.images[1].url,
        artists: item.artists.map((artist) => artist.name).join(', '),
      };
    });
  } else {
    return null;
  }
};

export const categoryPlaylist = async (categoryId) => {
  const { data } = await axios.get(
    `https://api.spotify.com/v1/browse/categories/${categoryId}/playlists`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (data) {
    return data.items.map((item) => {
      return {
        title: item.name,
        uri: item.uri,
        albumUrl: item.album.images[1].url,
        artists: item.artists.map((artist) => artist.name).join(', '),
      };
    });
  } else {
    return null;
  }
};

export const getFollowedArtists = async () => {
  const { data } = await axios.get("https://api.spotify.com/v1/me/following", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      type: "artist",
    },
  });

  if (data) {
    return data.artists.items.map((item) => {
      return {
        name: item.name,
        uri: item.uri,
        imageUrl: item.images[1].url,
        genres: item.genres.map((g) => g).join(", "),
      };
    });
  } else {
    return null;
  }
};

export const toggleShuffle = (shuffle) => {
  const { data } = await axios.get("https://api.spotify.com/v1/me/player/shuffle", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      q: shuffle
    }
  });
  
  console.log(data)
}

export const toggleRepeat = (repeat) => {
  const { data } = await axios.get("https://api.spotify.com/v1/me/player/repeat", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      q: repeat
    }
  });
}

export const togglePlayback = (state) => {
  if(state) {
    const { data } = await axios.get(`https://api.spotify.com/v1/me/player/${state}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  } else {
    rsturn null
  }
}

export const toggleNextPrev = (state) => {
  const { data } = await axios.get(`https://api.spotify.com/v1/me/player/${state}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export const seekPosition = (pos) => {
  const { data } = await axios.get('https://api.spotify.com/v1/me/player/seek', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      q: pos
    }
  });
}

export function msToTime(ms) {
  return new Date(ms).toISOString().slice(14, 19);
}

export function msToPercent(ms, totalms) {
  return Math.floor((ms * 100) / totalms);
}
