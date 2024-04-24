import Button from "./Button";
import { useNavigate } from "react-router-dom";

function ButtonBack({ children, type }) {
  const navigate = useNavigate();

  return (
    <Button
      type={type}
      onClick={(e) => {
        e.preventDefault();
        navigate(-1);
      }}
    >
      {children}
    </Button>
  );
}

export default ButtonBack;
