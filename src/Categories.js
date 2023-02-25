import { ReactComponent as Compilation } from "./compilation.svg";
import { ReactComponent as Single } from "./single.svg";
import { ReactComponent as Album } from "./album.svg";

export function NewRelease({ track }) {
  return (
    <div className="container">
      <div className="cv-image lg">
        <img src={track.albumUrl} alt={track.title} />
        {track.albumType === "single" ? <Single className="albumType" /> : track.albumType === "album" ? <Album className="albumType" /> : <Compilation className="albumType" />}
      </div>
      <div className="song-details">
        <div className="category-title">
          {track.title}
        </div>
        <div className='category-artists'>{track.artists}</div>
      </div>
    </div>
  )
}

export function Category({ category }) {
  return (
    <div className="container" href={category.link}>
      <div className="cv-image lg">
        <img src={category.iconUrl} alt={category.title} />
      </div>
      <div className="song-details">
        <div className="category-title">
          {category.title}
        </div>
      </div>
    </div>
  )
}

export function FeaturedPlaylists({ playlists }) {
  return (
    <div className="container" href={playlists.uri}>
      <div className="cv-image lg">
        <img src={playlists.playlistsUrl} alt={playlists.title} />
      </div>
      <div className="song-details">
        <div className="category-title">
          {playlists.title}
        </div>
        <div className="category-artists">
          {playlists.description}
        </div>
      </div>
    </div>
  )
}

export function TopItems({ track }) {
  return (
    <div className="container" href={track.uri}>
      <div className="cv-image lg">
        <img src={track.albumUrl} alt={track.title} />
      </div>
      <div className="song-details">
        <div className="category-title">
          {track.title}
        </div>
        <div className="category-artists">
          {track.artists}
        </div>
      </div>
    </div>
  )
}

export function FollowedArtists({artists}) {
  return (
    <div className="container">
      <div className="cv-image lg">
        <img src={artists.imageUrl} alt={artists.name} />
      </div>
      <div className="song-details">
        <div className="category-title">
          {artists.name}
        </div>
        <div className="category-artists">
          {artists.genres}
        </div>
      </div>
    </div>
  )
}