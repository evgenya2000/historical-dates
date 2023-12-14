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
      let pointRotation = index * arcAngle + rotationValue - shift;
      const currentTransform = `translate(-50%, -50%) rotate(${pointRotation}deg) translate(${diameterCircle / 2}px) rotate(${-pointRotation}deg)`;
      point.style.transform = currentTransform;
      point.addEventListener('mouseenter', function() {
        point.style.transform = currentTransform + 'scale(6)';
      });
      
      point.addEventListener('mouseleave', function() {
        point.style.transform = currentTransform + 'scale(1)';
        point.style.backgroundColor = '$black-blue';
      });      
    });
  }  
 
  return (
    <div className="footer">
      <div className='container-circle'>
        <div className="circle">
        {Array.from({length: numPoint}, (_, index) => index + 1).map((point, index) => (
          <div className="point" /* id={`${index === 0 ? 'current' : null}`} */ key={point} onClick={() => rotateToSelectedPoint(point)}>
            <p>{point}</p>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
}

export default Footer;
