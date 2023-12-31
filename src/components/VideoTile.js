import React from 'react'

const VideoTile = ({title,overview}) => {
  return (
    <div className='pt-36 p-12'>
        <h1 className='text-4xl font-bold w-1/2'>{title}</h1>
        <p className='py-6 text-lg w-1/3'>{overview}</p>
        <div className='md:flex  flex-col '>
            <button className='bg-gray-600 text-white  p-4 px-12 text-xl bg-opacity-50 rounded-md m-2'>‣    Play</button>
            <button className='bg-gray-600 text-white  p-4 px-12 text-xl bg-opacity-50 rounded-md'>More info</button>
        </div>
    </div>
  )
}

export default VideoTile