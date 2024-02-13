import './App.css'
import Playlist from './components/playlist/Playlist'
import VideoPlayer from './components/videoPlayer/VideoPlayer'


function App() {


  return (
    <div className='flex gap-2'>
    <VideoPlayer />
     <Playlist /> 
    </div>
  )
}

export default App
