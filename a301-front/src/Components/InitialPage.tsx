import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import showNavState from '../recoil/atoms/showNavState';
import styles from './InitialPage.module.css';
const InitialPage = () => {
  const navigate = useNavigate();
  const [isShownNavState, setIsShownNavState] = useRecoilState(showNavState);
  useEffect(() => {
    setTimeout(() => {
      navigate('/main');
    }, 1000);
    setIsShownNavState(false);
  }, []);
  return (
    <>
      <video muted loop id="myVideo">
        <source src="rain.mp4" type="video/mp4" />
      </video>
      <div
        className={styles.content}
        onClick={() => {
          setIsShownNavState(true);
          navigate('/main');
        }}
      >
        <svg width="400" height="200" viewBox="0 0 300 200">
          <text x="-50" y="65%">
            C
          </text>
          <text x="20" y="65%">
            h
          </text>
          <text x="60" y="65%">
            r
          </text>
          <text x="100" y="65%">
            o
          </text>
          <text x="140" y="65%">
            n
          </text>
          <text x="185" y="65%">
            i
          </text>
          <text x="210" y="65%">
            c
          </text>
          <text x="240" y="65%">
            l
          </text>
          <text x="265" y="65%">
            e
          </text>
          <text x="300" y="65%">
            r
          </text>
        </svg>
      </div>
    </>
  );
};
export default InitialPage;
