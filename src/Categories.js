import { ReactComponent as Compilation } from "./compilation.svg";
import { ReactComponent as Single } from "./single.svg";
import { ReactComponent as Album } from "./album.svg";

export function NewRelease({ track }) {
  return (
    <div className="container">
      <div className="cv-image lg">
        <img src={track.albumUrl} alt={track.title} />
        {track.albumType === "single" ? <Single className="albumType"/> : track.albumType === "album" ? <Album className="albumType"/> : <Compilation className="albumType"/>}
      </div>
      <div className="category-title">
        {track.title}
      </div>
      <div className='category-artists'>{track.artists.join(", ")}</div>
    </div>
  )
}

export function NewAlbums({ track }) {
  if (track.albumType === 'album') {
  return (
    <div className="container">
      <div className="cv-image lg">
        <img src={track.albumUrl} alt={track.title} />
        <Album className="albumType"/>
      </div>
      <div className="category-title">
        {track.title}
      </div>
    </div>
  )}
}

export function NewCompilation({ track }) {
  if (track.albumType === 'compilation') {
  return (
    <div className="container">
      <div className="cv-image lg">
        <img src={track.albumUrl} alt={track.title} />
      </div>
      <div className="category-title">
        {track.title}
      </div>
    </div>
  )}
}
