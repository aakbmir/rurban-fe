import { useNavigate } from "react-router-dom";

export default function PageNotFound() {
  const navigate = useNavigate();

  function logOut() {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
  }

  return (
    <div
      style={{
        margin: "auto",
        display: "grid",
        justifyContent: "space-around",
      }}
    >
      <h1>Page not found 😢</h1>
      <button onClick={logOut}>Home</button>
    </div>
  );
}
