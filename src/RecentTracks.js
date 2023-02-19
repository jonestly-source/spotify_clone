export default function RecentTracks({track}) {
  console.log(track)
  return (
    <div className='tiles'>
      <div className='cv-image'>
        <img src={track.albumUrl} alt={track.name}/>
      </div>
      <div className='category-title'>{track.title}</div>
      <div className="category-artists">{track.artists}</div>
    </div>
  )
}
