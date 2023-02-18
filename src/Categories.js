import { ReactComponent as Compilation } from "./compilation.svg";
import { ReactComponent as Single } from "./single.svg";
import { ReactComponent as Album } from "./album.svg";

export function NewSingles({ track }) {
  console.log(track)
  if (track.albumType === 'single') {
  return (
    <div className="container">
      <div className="cv-image lg">
        <img src={track.albumUrl} alt={track.title} />
        <Single className="albumType"/>
      </div>
      <div className="category-title">
        {track.title}
      </div>
      <div className='category-artists'>{track.artists}</div>
    </div>
  )}
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
