import images from './images.json';

function App() {
   return (
    <div className='container grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1   gap-4 mx-auto '>
       {images.map(image => ( 
      <img className='w-full rounded' src={image.src} alt={image.alt}/>
  ))}
      </div>
  );

}

export default App;

  