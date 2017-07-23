import React, { Component } from 'react';

const formatFloat = (num, pos) => {
  const size = 10 ** pos;
  return Math.round(num * size) / size;
};

const countProb = (x, y) => {
  if (x === 0 && y === 1) {
    return 93 / 256;
  } else if (x === 0 && y === 2) {
    return 29 / 128;
  } else if (x === 0 && y === 3) {
    return 7 / 64;
  } else if (x === 0 && y === 4) {
    return 1 / 32;
  } else if (x === 1 && y === 0) {
    return 163 / 256;
  } else if (x === 1 && y === 1) {
    return 1 / 2;
  } else if (x === 1 && y === 2) {
    return 11 / 32;
  } else if (x === 1 && y === 3) {
    return 3 / 16;
  } else if (x === 1 && y === 4) {
    return 1 / 16;
  } else if (x === 2 && y === 0) {
    return 99 / 128;
  } else if (x === 2 && y === 1) {
    return 31 / 32;
  } else if (x === 2 && y === 2) {
    return 1 / 2;
  } else if (x === 2 && y === 3) {
    return 5 / 16;
  } else if (x === 2 && y === 4) {
    return 1 / 8;
  } else if (x === 3 && y === 0) {
    return 57 / 64;
  } else if (x === 3 && y === 1) {
    return 13 / 16;
  } else if (x === 3 && y === 2) {
    return 11 / 16;
  } else if (x === 3 && y === 3) {
    return 1 / 2;
  } else if (x === 3 && y === 4) {
    return 1 / 4;
  } else if (x === 4 && y === 0) {
    return 31 / 32;
  } else if (x === 4 && y === 1) {
    return 15 / 16;
  } else if (x === 4 && y === 2) {
    return 7 / 8;
  } else if (x === 4 && y === 3) {
    return 3 / 4;
  } else if (x === 4 && y === 4) {
    return 1 / 2;
  }
  return 1 / 2;
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      totalMoneyA: 0,
      totalMoneyB: 0,
      currentMoneyA: 0,
      currentMoneyB: 0,
      inputMoneyA: 0,
      inputMoneyB: 0,
      winA: 0,
      winB: 0,
      rateA: 1.8,
      rateB: 1.8,
      handA: 0,
      handB: 0,
      result: false,
      winnerName: '',
    };
    this.handleInputMoneyA = this.handleInputMoneyA.bind(this);
    this.handleInputMoneyB = this.handleInputMoneyB.bind(this);
    this.updateCurrentMoneyA = this.updateCurrentMoneyA.bind(this);
    this.updateCurrentMoneyB = this.updateCurrentMoneyB.bind(this);
    this.setHandA = this.setHandA.bind(this);
    this.setHandB = this.setHandB.bind(this);
    this.checkWin = this.checkWin.bind(this);
    this.setResult = this.setResult.bind(this);
    this.reset = this.reset.bind(this);
  }

  setHandA(handA) {
    this.setState({ handA });
  }

  setHandB(handB) {
    this.setState({ handB });
  }

  setResult() {
    let { rateA, rateB } = this.state;
    const { totalMoneyA, totalMoneyB, currentMoneyA, currentMoneyB, winA, winB } = this.state;
    if (winA === 5) {
      console.log('A win');
      this.setState({ result: true, winnerName: 'A' });
    } else if (winB === 5) {
      console.log('B win');
      this.setState({ result: true, winnerName: 'B' });
    } else {
      const newTotalMoneyA = (+currentMoneyA) + (+totalMoneyA);
      const newTotalMoneyB = (+currentMoneyB) + (+totalMoneyB);
      let aProb = 0.5;
      if (newTotalMoneyA === 0 && newTotalMoneyB === 0 && winA === 0 && winB === 0) {
        aProb = 0.5;
      } else if (newTotalMoneyA === 0 && newTotalMoneyB === 0) {
        aProb = ((countProb(winA, winB) * 3) + (0.5 * 2)) * 0.2;
      } else if (winA === 0 && winB === 0) {
        aProb = ((0.5 * 3)
          + ((0.21 + ((newTotalMoneyA / (newTotalMoneyA + newTotalMoneyB)) * 0.58)) * 2)) * 0.2;
      } else {
        aProb = (((0.21 + ((newTotalMoneyA / (newTotalMoneyA + newTotalMoneyB)) * 0.58)) * 2)
          + (countProb(winA, winB) * 3)) * 0.2;
      }
      rateA = (1 / aProb) * 0.9;
      rateB = (1 / (1 - aProb)) * 0.9;
      this.setState({ totalMoneyA: newTotalMoneyA,
        totalMoneyB: newTotalMoneyB,
        currentMoneyA: 0,
        currentMoneyB: 0,
        rateA,
        rateB,
        handA: 0,
        handB: 0 });
    }
  }

  handleInputMoneyA(event) {
    this.setState({ inputMoneyA: event.target.value });
  }

  handleInputMoneyB(event) {
    this.setState({ inputMoneyB: event.target.value });
  }

  updateCurrentMoneyA() {
    const currentMoneyA = this.state.currentMoneyA;
    const inputMoneyA = this.state.inputMoneyA;
    const newCurrentMoneyA = (+currentMoneyA) + (+inputMoneyA);
    if (isNaN(newCurrentMoneyA)) {
      console.log('Please input Number');
      this.setState({ inputMoneyA: 0 });
    } else {
      this.setState({ currentMoneyA: newCurrentMoneyA, inputMoneyA: 0 });
    }
  }

  updateCurrentMoneyB() {
    const currentMoneyB = this.state.currentMoneyB;
    const inputMoneyB = this.state.inputMoneyB;
    const newCurrentMoneyB = (+currentMoneyB) + (+inputMoneyB);
    if (isNaN(newCurrentMoneyB)) {
      console.log('Please input Number');
      this.setState({ inputMoneyB: 0 });
    } else {
      this.setState({ currentMoneyB: newCurrentMoneyB, inputMoneyB: 0 });
    }
  }

  checkWin() {
    const handA = this.state.handA;
    const handB = this.state.handB;
    if (((handA === 2) && (handB === 1)) ||
    ((handA === 3) && (handB === 2)) ||
    ((handA === 1) && (handB === 3))) {
      let winA = this.state.winA;
      winA += 1;
      this.setState({ winA }, () => this.setResult());
    } else if (((handA === 1) && (handB === 2)) ||
    ((handA === 2) && (handB === 3)) ||
    ((handA === 3) && (handB === 1))) {
      let winB = this.state.winB;
      winB += 1;
      this.setState({ winB }, () => this.setResult());
    } else if (((handA === 1) && (handB === 1)) ||
    ((handA === 2) && (handB === 2)) ||
    ((handA === 3) && (handB === 3))) {
      console.log('same');
      this.setResult();
    }
  }

  reset() {
    this.setState({
      totalMoneyA: 0,
      totalMoneyB: 0,
      currentMoneyA: 0,
      currentMoneyB: 0,
      inputMoneyA: 0,
      inputMoneyB: 0,
      winA: 0,
      winB: 0,
      rateA: 1.8,
      rateB: 1.8,
      handA: 0,
      handB: 0,
      result: false,
      winnerName: '',
    });
  }

  render() {
    return (
      <div>
        {
          this.state.result ?
            <div>{this.state.winnerName} WINS!
            <button onClick={() => this.reset()}>RESET</button></div>
            :
            <div className="center">
              <div className="row">
                <div className="rate">
                  {formatFloat(this.state.rateA, 2)}
                </div>
                <img src="assets/A.jpg" className="player" alt="A" />
                <div className="score">
                  {this.state.winA}
                </div>
                <div>
                  此輪總投注: {this.state.currentMoneyA}
                </div>
                <input
                  type="text"
                  value={this.state.inputMoneyA}
                  onChange={this.handleInputMoneyA}
                />
              <div onClick={this.updateCurrentMoneyA}>加注</div>
                <div className="hands">
                  <div
                    className="handdiv"
                    onClick={() => this.setHandA(1)}
                  >
                    {(this.state.handA === 1) ?
                      <img src="assets/hand/paper-red.png" className="hand" alt="paper" /> :
                      <img src="assets/hand/paper.png" className="hand" alt="paper" />
                    }
                  </div>
                  <div
                    className="handdiv"
                    onClick={() => this.setHandA(2)}
                  >
                    {(this.state.handA === 2) ?
                      <img src="assets/hand/scissor-red.png" className="hand" alt="paper" /> :
                      <img src="assets/hand/scissor.png" className="hand" alt="paper" />
                    }
                  </div>
                  <div
                    className="handdiv"
                    onClick={() => this.setHandA(3)}
                  >
                    {(this.state.handA === 3) ?
                      <img src="assets/hand/stone-red.png" className="hand" alt="paper" /> :
                      <img src="assets/hand/stone.png" className="hand" alt="paper" />
                    }
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="rate">
                  {formatFloat(this.state.rateB, 2)}
                </div>
                <img src="assets/B.jpg" className="player" alt="B" />
                <div className="score">
                  {this.state.winB}
                </div>
                <div>
                  此輪總投注: {this.state.currentMoneyB}
                </div>
                <input
                  type="text"
                  value={this.state.inputMoneyB}
                  onChange={this.handleInputMoneyB}
                />
                <div onClick={this.updateCurrentMoneyB}>加注</div>
                <div className="hands">
                  <div
                    className="handdiv"
                    onClick={() => this.setHandB(1)}
                  >
                    {(this.state.handB === 1) ?
                      <img src="assets/hand/paper-red.png" className="hand" alt="paper" /> :
                      <img src="assets/hand/paper.png" className="hand" alt="paper" />
                    }
                  </div>
                  <div
                    className="handdiv"
                    onClick={() => this.setHandB(2)}
                  >
                    {(this.state.handB === 2) ?
                      <img src="assets/hand/scissor-red.png" className="hand" alt="paper" /> :
                      <img src="assets/hand/scissor.png" className="hand" alt="paper" />
                    }
                  </div>
                  <div
                    className="handdiv"
                    onClick={() => this.setHandB(3)}
                  >
                    {(this.state.handB === 3) ?
                      <img src="assets/hand/stone-red.png" className="hand" alt="paper" /> :
                      <img src="assets/hand/stone.png" className="hand" alt="paper" />
                    }
                  </div>
                </div>
                <button onClick={this.checkWin}>Check</button>
              </div>
            </div>
        }
      </div>

    );
  }
}
export default App;
