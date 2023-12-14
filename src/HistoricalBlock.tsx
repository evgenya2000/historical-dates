import './HistoricalBlock.scss';
import Footer from './Footer';

function HistorycalBlock() {
  return (
    <div className="HistoricalBlock">
      <div className="background-container">
        <div className="horizontal-vector"></div>
        <div className="vertical-vector"></div>
      </div>
      <div className="header">
        <div className="vector"></div>
        <p className="text-header">Исторические даты</p>
      </div>
      <Footer/>
    </div>
  );
}

export default HistorycalBlock;
