import React from 'react'

const VideoTile = ({title,overview}) => {
  return (
    <div className='max-w-screen aspect-video pt-[15%] px-24 absolute text-white bg-gradient-to-r from-black '>
        <h1 className='text-4xl font-bold w-1/2'>{title}</h1>
        <p className='py-6 text-lg w-1/3'>{overview}</p>
        <div className=''>
            <button className='bg-white text-black  p-4 px-12 text-xl  rounded-md m-2 hover:bg-opacity-70 transition duration-700'>‣    Play</button>
            <button className='bg-gray-600 text-white  p-4 px-12 text-xl bg-opacity-50 rounded-md'>More info</button>
        </div>
    </div>
  )
}

export default VideoTile