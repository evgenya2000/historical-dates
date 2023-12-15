import './Footer.scss';
import { useState } from 'react';
import { years } from './_data';

function Footer() {
  const numPoint: number = 6;
  const arcAngle: number = 360 / numPoint;
  const shift: number = 60;
  const diameterCircle: number = 450;
  /*   const diameterPoint: number = 10; */
  const [currentPoint, setCurrentPoint] = useState(1);

  async function changeOfYears(numSelected: number) {
    function sleep(ms: number) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    let counter = currentPoint - 1;
    const time = 100;
    if (counter > numSelected) {
      do {
        counter--;
        document.getElementsByClassName("first-year")[0].innerHTML = years[counter].first;
        document.getElementsByClassName("second-year")[0].innerHTML = years[counter].second;
        await sleep(time);
      } while (numSelected !== counter);
    } else {
      do {
        counter++;
        document.getElementsByClassName("first-year")[0].innerHTML = years[counter].first;
        document.getElementsByClassName("second-year")[0].innerHTML = years[counter].second;
        await sleep(time);
      } while (numSelected !== counter);
    }
  }

  function rotateToSelectedPoint(selectedPoint: number) {
    changeOfYears(selectedPoint - 1);
    let rotationValue = (-selectedPoint + 1) * arcAngle;
    const points = document.querySelectorAll('.point') as NodeListOf<HTMLElement>;

    points.forEach((point, index) => {
      if (point.id === "current") {
        point.id = `point${index + 1}`
      }
      let pointRotation = index * arcAngle + rotationValue - shift;
      const currentTransform = `translate(-50%, -50%) rotate(${pointRotation}deg) translate(${diameterCircle / 2}px) rotate(${-pointRotation}deg)`;

      point.style.transform = currentTransform;
      if (index + 1 === selectedPoint) {
        point.id = "current";
      }
    });

    setCurrentPoint(selectedPoint);
  }

  function rotateLeft() {
    if (currentPoint === 1) {
      rotateToSelectedPoint(numPoint);
    } else {
      rotateToSelectedPoint(currentPoint - 1);
    }
  }

  function rotateRight() {
    if (currentPoint === numPoint) {
      rotateToSelectedPoint(1);
    } else {
      rotateToSelectedPoint(currentPoint + 1);
    }
  }

  return (
    <div className="footer">
      <div className='container-circle'>
        <div className="circle">
          {Array.from({ length: numPoint }, (_, index) => index + 1).map((point, index) => (
            <div className="point" id={`${index === 0 ? 'current' : `point${index + 1}`}`} key={point} onClick={() => rotateToSelectedPoint(point)}>
              <p>{point}</p>
            </div>
          ))}
        </div>
        <div className='container-years'>
          <p className='first-year'>{years[0].first}</p>
          <p className='second-year'>{years[0].second}</p>
        </div>
        <p className='current-point'>{`0${currentPoint}/0${numPoint}`}</p>
        <div className='container-button'>
          <div className={`arrow arrow-left ${currentPoint === 1 ? "btn-off" : "btn-on"}`} onClick={() => rotateLeft()}></div>
          <div className={`arrow arrow-right ${currentPoint === numPoint ? "btn-off" : "btn-on"}`} onClick={() => rotateRight()}></div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
