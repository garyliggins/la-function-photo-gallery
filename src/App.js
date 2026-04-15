import Navbar from "./Navbar";
import Images from "./Images";

function App() {
  return (
    <div className="page-bg">
      <Navbar />
      <Images />
      <footer className="gallery-footer">
        <p>
          © 2026{" "}
          <a href="https://lafunction.com" rel="noopener noreferrer">
            LA Function
          </a>{" "}
          · LA's Summer Music Festival
        </p>
      </footer>
    </div>
  );
}

export default App;
