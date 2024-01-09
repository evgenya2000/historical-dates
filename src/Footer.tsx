import './Footer.scss';
import { useEffect, useRef, useState } from 'react';
import { screenSizes } from './_screen-size';
import { years, data, topics } from './_data';
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/swiper-bundle.css';

function Footer() {
  const numPoint: number = 6;
  const arcAngle: number = 360 / numPoint;
  const shift: number = 60;
  const [diameterCircle, setDiameterCircle] = useState(450);
  const [currentPoint, setCurrentPoint] = useState(1);
  const swiper = useRef<any>(null);

  useEffect(() => {
    const handleResize = () => {
      const windowSize = window.innerWidth;
      for (let i = 0; i < screenSizes.length; i++) {
        if (screenSizes[i].width > windowSize) {
          setDiameterCircle(screenSizes[i].diameter);
          break;
        }
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    swiper.current = new Swiper(
      '.swiper-container',
      {
        grabCursor: true,
        observer: true,
        observeParents: true,
        slidesPerView: 'auto',
        modules: [Navigation],
        spaceBetween: 70,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      },
    );
    swiper.current.slideTo(0);
    swiper.current.update();

    return () => {
      swiper.current.update();
      swiper.current.destroy(true, true);
    };
  });


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
    swiper.current.update();
    let rotationValue = (-selectedPoint + 1) * arcAngle;
    const points = document.querySelectorAll('.point') as NodeListOf<HTMLElement>;

    points.forEach((point, index) => {

      if (point.id === "current") {
        point.id = `point${index + 1}`
        const topic = point.children[1];
        if (topic) {
          (topic as HTMLElement).style.opacity = "1";
          (topic as HTMLElement).style.opacity = "0";
          topic.id = `topic${index + 1}`;
         } 
      }
      let pointRotation = index * arcAngle + rotationValue - shift;
      const currentTransform = `translate(-50%, -50%) rotate(${pointRotation}deg) translate(${diameterCircle / 2}px) rotate(${-pointRotation}deg)`;
      point.style.transform = currentTransform;
      if (index + 1 === selectedPoint) {
        point.id = "current";
        const topic = point.children[1];
        if (topic){
          (topic as HTMLElement).style.opacity = "0";
          topic.id = "current-topic";
          setTimeout(() => (topic as HTMLElement).style.opacity = "1", 500);
        }
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
        <div className='swiper-button-prev'></div>
        <div className='swiper-wrapper'>
          {data[currentYears].map((blockInfo) => (
            <div className='swiper-slide' key={blockInfo.year}>
              <p className='year'>{blockInfo.year}</p>
              <p className='info'>{blockInfo.info}</p>
            </div>
          ))}
        </div>
        <div className='swiper-button-next'></div>
      </div>
    );
  }

  return (
    <div className="footer">
      <div className='container-circle'>
        <div className="circle">
          {Array.from({ length: numPoint }, (_, index) => index + 1).map((point, index) => (
            <div className="point" id={`${index === 0 ? "current" : `point${index + 1}`}`} key={point} onClick={() => rotateToSelectedPoint(point)}>
              <p>{point}</p>
              <p className='topic' id={`${index === 0 ? "current-topic" : `topic${index + 1}`}`}>{topics[index]}</p>
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
