import React from 'react'
import SpotifyPlayer from 'react-spotify-web-playback'

export default function Player({accessToken, trackUri}) {
  return (
    <SpotifyPlayer
    token={accessToken}
    uris={trackUri ? [trackUri] : []} />
  )
}
