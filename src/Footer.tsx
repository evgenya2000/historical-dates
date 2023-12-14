import './Footer.scss';

function Footer() {
  const numPoint: number = 6;
  const arcAngle: number = 360 / numPoint;
  const shift: number = 60;
  const diameterCircle: number = 450;

  function rotateToSelectedPoint(selectedPoint: any) {
    let rotationValue = (-parseInt(selectedPoint) + 1) * arcAngle;
    const points = document.querySelectorAll('.point') as NodeListOf<HTMLElement>;
    
    points.forEach((point, index) => {
      if (point.id === "current"){
        point.id = `point${index + 1}`
      } 
      let pointRotation = index * arcAngle + rotationValue - shift;
      const currentTransform = `translate(-50%, -50%) rotate(${pointRotation}deg) translate(${diameterCircle / 2}px) rotate(${-pointRotation}deg)`;

      let mouseEnterHandler = function () {
        if (point.id !== "current") {
          point.style.transform = point.style.transform.split(" ").slice(0, 5).join(" ") + "scale(6)"; 
        }
      }
      let mouseLeaveHandler = function() {
        if (point.id !== "current") {
          point.style.transform = point.style.transform.split(" ").slice(0, 5).join(" ") + "scale(1)";
          point.style.backgroundColor = '$black-blue';
        }
      }
      if (index + 1 === selectedPoint) {
        point.style.transform = currentTransform;
        point.id = "current";
        point.removeEventListener('mouseenter', mouseEnterHandler);
        point.removeEventListener('mouseleave', mouseLeaveHandler);
      } else {
        point.style.transform = currentTransform;
        point.addEventListener("mouseenter", mouseEnterHandler);
        point.addEventListener("mouseleave", mouseLeaveHandler);
      }
      point.style.transform = currentTransform;
    });
  }  
 
  return (
    <div className="footer">
      <div className='container-circle'>
        <div className="circle">
        {Array.from({length: numPoint}, (_, index) => index + 1).map((point, index) => (
          <div className="point" id={`${index === 0 ? 'current' : `point${index + 1}`}`} key={point} onClick={() => rotateToSelectedPoint(point)}>
            <p>{point}</p>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
}

export default Footer;
