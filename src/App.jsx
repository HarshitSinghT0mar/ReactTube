import './App.css'
import Playlist from './components/playlist/Playlist'
import VideoPlayer from './components/videoPlayer/VideoPlayer'


function App() {


  return (
    <div className='flex flex-wrap md:flex-nowrap gap-2 p-4 h-[calc(100vh-16px)] min-w-full'>
    <VideoPlayer />
     <Playlist /> 
    </div>
  )
}

export default App
