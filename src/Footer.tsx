import './Footer.scss';
import { useEffect, useState } from 'react';
import { years, data } from './_data';
import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';

function Footer() {
  const numPoint: number = 6;
  const arcAngle: number = 360 / numPoint;
  const shift: number = 60;
  const diameterCircle: number = 450;
  /*   const diameterPoint: number = 10; */
  const [currentPoint, setCurrentPoint] = useState(1);
  let swiper: Swiper | null = null;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    swiper = new Swiper('.swiper-container', {
      slidesPerView: 'auto',
      spaceBetween: 100,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }, []);

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
        document.getElementsByClassName("second-year")[0].innerHTML = years[counter].last;
        await sleep(time);
      } while (numSelected !== counter);
    } else {
      do {
        counter++;
        document.getElementsByClassName("first-year")[0].innerHTML = years[counter].first;
        document.getElementsByClassName("second-year")[0].innerHTML = years[counter].last;
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

  function renderSlider() {
    const currentYears = years[currentPoint - 1].first + years[currentPoint - 1].last;

    return (
      <div className='swiper-container'>
        <div className='swiper-wrapper'>
          {data[currentYears].map((blockInfo) => (
            <div className='swiper-slide' key={blockInfo.year}>
              <p className='year'>{blockInfo.year}</p>
              <p className='info'>{blockInfo.info}</p>
            </div>
          ))}
        </div>
        {/* Кнопки навигации добавлены как дочерние элементы к swiper-container */}
        <div className='swiper-button-prev' onClick={() => swiper?.slidePrev()}></div>
        <div className='swiper-button-next' onClick={() => swiper?.slideNext()}></div>
      </div>
    );
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
          <p className='second-year'>{years[0].last}</p>
        </div>
        <p className='current-point'>{`0${currentPoint}/0${numPoint}`}</p>
        <div className='container-button'>
          <div className={`arrow arrow-left ${currentPoint === 1 ? "btn-off" : "btn-on"}`} onClick={() => rotateLeft()}></div>
          <div className={`arrow arrow-right ${currentPoint === numPoint ? "btn-off" : "btn-on"}`} onClick={() => rotateRight()}></div>
        </div>
      </div>
      {renderSlider()}
    </div>
  );
}

export default Footer;
