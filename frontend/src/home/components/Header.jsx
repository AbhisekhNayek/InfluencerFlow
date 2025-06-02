import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  return (
    <header className="relative h-screen w-full overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full object-cover z-0">
        <video src={`/video.mp4`} loop autoPlay muted className="w-full h-full object-cover" />
      </div>

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-center">
        <h1 className="text-white text-5xl font-bold mb-6">Welcome to MicroMatch</h1>
        <div className="flex space-x-4">
          <button className="px-6 py-3 rounded-md font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300" onClick={() => navigate("/signup")}>
            Sign Up
          </button>

          <button className="px-6 py-3 rounded-md font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300" onClick={() => navigate("/login")}>
            Log in
          </button>
        </div>
      </div>

    </header>
  );
}

export default Header;
