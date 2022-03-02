import './App.css';
import GoogleLogin from 'react-google-login';

function App() {
  const handleFailure = (result) => {
    console.log("Login Fail! issue:", result);
    alert(result);
  };

  const handleLogin = async (googleData) => {
    const res = await fetch('/api/google-login', {
      method: 'POST',
      body: JSON.stringify({
        token: googleData.tokenId,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();
    console.log("Login Success! Current user: ", data);
  };
  const handleLogout = () => {
    console.clear();
    console.log("Logout Success!");
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Google Login App</h1>
        <div>
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            buttonText="Log in with Google"
            onSuccess={handleLogin}
            onFailure={handleFailure}
            cookiePolicy={'single_host_origin'}
            isSignedIn={true}
          ></GoogleLogin>
          <div>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;