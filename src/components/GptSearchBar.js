import React from 'react'

const GptSearchBar = () => {
  return (
    <div className='w-full bg-black h-screen'>
        <form className='grid justify-items-center pt-[20%]'>
            <input type='text' placeholder='What do you like to watch today' className='p-4 m-4 w-1/2 rounded-md border border-red-900 outline-none'/>
            <button className='py-2 px-4 bg-yellow-500 rounded-md text-white'>Search</button>
        </form>
    </div>
  )
}

export default GptSearchBar