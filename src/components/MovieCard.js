
import React from 'react'
import { IMG_CDN_URL } from '../utils/constants';

const MovieCard = ({posterPath}) => {
  return (
    <div className='w-48 pr-4'>
      <img alt='MoviesCard' src={IMG_CDN_URL + posterPath} className=''/>
    </div>
  )
}
export default MovieCard;