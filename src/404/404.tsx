import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./404.scss";

const _404 = () => {
  const history = useHistory();

  useEffect(() => {
    const timeoutID = window.setTimeout(() => {
      history.push("/");
    }, 2000);

    return () => window.clearTimeout(timeoutID);
  }, [history]);

  return (
    <div className="_404">
      <img src="./icons/404.svg" alt="404" />
      <p>Sayfa bulunamadı, ana sayfaya yönlendiriliyorsunuz...</p>
    </div>
  );
};

export default _404;
