import './App.css'
import Playlist from './components/playlist/Playlist'
import VideoPlayer from './components/videoPlayer/VideoPlayer'
import { useVideoConext } from './contexts/VideoContext'


function App() {
const {selectedVideo}=useVideoConext()

  return (
    <div className='flex flex-wrap md:flex-nowrap gap-2 p-4 h-[calc(100vh-16px)] min-w-full'>
    
    {selectedVideo ? <VideoPlayer />: <div className='w-full flex rounded-lg items-center justify-center bg-black text-white'>Please Select the video to play</div>} 
     <Playlist /> 
    </div>
  )
}

export default App
