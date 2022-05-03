import React from 'react'
import images from './images.json';

function Images() {
  return (
    <div className='container grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 mx-auto px-2 md:px-1 mt-6 '>
    {images.map(image => ( 
   <img className="w-full rounded" src={image.src} alt={image.alt}/>
))}
   </div>
  )
}

export default Images