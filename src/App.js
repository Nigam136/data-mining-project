import { useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [binSize, setBinSize] = useState();
  // const [lowerBound, setLowerBound] = useState();
  // const [upperBound, setUpperBound] = useState();
  const [smoothedByMean, setSmoothedByMean] = useState([]);
  const [smoothedByMedian, setSmoothedByMedian] = useState([]);
  const [smoothedByBoundary, setSmoothedByBoundary] = useState([]);

  const binMeanSmooth = (e) => {
    e.preventDefault();
    const numBins = Math.ceil(data.length / binSize);
    // data.sort();
    for (let i = 0; i < data.length; i++) {
      for (let j = i + 1; j < data.length; j++) {
        if (data[i] > data[j]) {
          var temp = data[i];
          data[i] = data[j];
          data[j] = temp;
        }
      }
    }
    // console.log(data);//
    // console.log(numBins);//

    const binnedData = Array(numBins)
      .fill()
      .map((_, i) => {
        // console.log(i);
        const start = i * binSize;
        // console.log(start);
        // const end = Math.min(start + binSize, data.length);
        const end = parseInt(start) + parseInt(binSize);
        // console.log(end);
        const bin = data.slice(start, end);
        // console.log(bin);
        // console.log(data);
        var avg = 0;
        var sum = 0;
        for (let i = 0; i < bin.length; i++) {
          sum = sum + bin[i];
        }
        avg = sum / bin.length;
        console.log(avg);
        return avg;
        // return bin.reduce((a, b) => a + b, 0) / bin.length;
      });
    // console.log(binnedData);//
    setSmoothedByMean(binnedData);
  };

  const binMedianSmooth = (e) => {
    e.preventDefault();
    const numBins = Math.ceil(data.length / binSize);

    for (let i = 0; i < data.length; i++) {
      for (let j = i + 1; j < data.length; j++) {
        if (data[i] > data[j]) {
          var temp = data[i];
          data[i] = data[j];
          data[j] = temp;
        }
      }
    }

    const binnedData = Array(numBins)
      .fill()
      .map((_, i) => {
        const start = i * binSize;
        console.log(start);
        // const end = Math.min(start + binSize, data.length);
        const end = parseInt(start) + parseInt(binSize);
        console.log(end);
        const bin = data.slice(start, end);
        // console.log(bin);
        // console.log(data);
        if (bin.length % 2 === 0) {
          const midIndex = bin.length / 2;
          return parseInt((bin[midIndex - 1] + bin[midIndex]) / 2);
        } else {
          const midIndex = Math.floor(bin.length / 2);
          return bin[midIndex];
        }
      });
    // console.log(binnedData);//
    setSmoothedByMedian(binnedData);
  };

  const boundarySmooth = (e) => {
    e.preventDefault();
    var binnedData = [];
    const numBins = Math.ceil(data.length / binSize);

    for (let i = 0; i < numBins; i++) {
      var start = i * binSize;
      var end = 0;
      // console.log(start);
      if (i === numBins - 1) {
        end = data.length;
      } else {
        end = (i + 1) * binSize;
      }
      // console.log(end);
      var min = data[start];
      console.log(min);
      var max = data[end - 1];
      console.log(max);
      for (let i = start; i < end; i++) {
        var a = data[i] - min;
        var b = max - data[i];
        if (a < b) {
          binnedData.push(min);
        } else if (a > b) {
          binnedData.push(max);
        } else {
          binnedData.push(min);
        }
      }
    }
    setSmoothedByBoundary(binnedData);
    // const smoothedData = data.map((val) => {
    //   if (val < lowerBound) {
    //     return lowerBound;
    //   } else if (val > upperBound) {
    //     return upperBound;
    //   } else {
    //     return val;
    //   }
    // });
    // console.log(smoothedData);
    // setSmoothedByBoundary(smoothedData);
  };

  return (
    <div className="App">
      <label for="inputPassword2" className="visually-hidden head">
        Smoothing data by mean, median, boundary...
      </label>

      <form className="row g-3">
        <div className="cont">
          <div className="col-auto entry">
            <label htmlFor="inputPassword2" className="visually-hidden">
              Dataset
            </label>
            <input
              type="text"
              className="form-control"
              id="inputPassword2"
              placeholder="enter the data"
              // value={data}
              onChange={(e) => setData(e.target.value.split(",").map(Number))}
            />
            <label htmlFor="inputPassword2" className="visually-hidden">
              Bin Size
            </label>
            <input
              type="text"
              className="form-control"
              id="inputPassword2"
              placeholder="enter Bin Size"
              // value={binSize}
              onChange={(e) => setBinSize(e.target.value)}
            />
          </div>
          <div className="btn">
            <button
              type="submit"
              className="btn btn-primary mb-3 b b1"
              onClick={(e) => binMeanSmooth(e)}
            >
              By Mean
            </button>
            <button
              type="submit"
              className="btn btn-primary mb-3 b b2"
              onClick={(e) => binMedianSmooth(e)}
            >
              By Median
            </button>
            <div className="bin">
              {/* <label
                htmlFor="inputPassword2"
                className="visually-hidden bin-lable"
              >
                Lower Bound
              </label>
              <input
                type="text"
                className="form-control"
                id="inputPassword2"
                placeholder="enter lower bound value"
                // value={binSize}
                onChange={(e) => setLowerBound(e.target.value)}
              /> */}
              {/* <label
                htmlFor="inputPassword2"
                className="visually-hidden bin-lable"
              >
                Upper Bound
              </label>
              <input
                type="text"
                className="form-control"
                id="inputPassword2"
                placeholder="enter upper bound value"
                // value={binSize}
                onChange={(e) => setUpperBound(e.target.value)}
              /> */}
              <button
                type="submit"
                className="btn btn-primary mb-3 b b3"
                onClick={(e) => boundarySmooth(e)}
              >
                By boundary
              </button>
            </div>
            {smoothedByMean.length > 0 && (
              <p id="res">Smoothed by bin mean: {smoothedByMean.join(", ")}</p>
            )}
            {smoothedByMedian.length > 0 && (
              <p id="res">
                Smoothed by bin median: {smoothedByMedian.join(", ")}
              </p>
            )}
            {smoothedByBoundary.length > 0 && (
              <p id="res">
                Smoothed by boundary: {smoothedByBoundary.join(", ")}
              </p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

export default App;
