import images from './images.json';

function App() {
   return (
    <div className='container grid grid-cols-3 gap-4 mx-auto '>
       {images.map(image => ( 
      <img className='w-full rounded' src={image.src} alt={image.alt}/>
  ))}
      </div>
  );

}

export default App;

  