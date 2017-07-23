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
    return 21 / 32;
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
      currentMoneyAList: [],
      currentMoneyBList: [],
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
    this.undoCurrentMoneyA = this.undoCurrentMoneyA.bind(this);
    this.undoCurrentMoneyB = this.undoCurrentMoneyB.bind(this);
    this.setHandA = this.setHandA.bind(this);
    this.setHandB = this.setHandB.bind(this);
    this.checkWin = this.checkWin.bind(this);
    this.setResult = this.setResult.bind(this);
    this.reset = this.reset.bind(this);
    this.renderWinner = this.renderWinner.bind(this);
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
        currentMoneyAList: [],
        currentMoneyBList: [],
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
    const { currentMoneyA, inputMoneyA, currentMoneyAList } = this.state;
    const newCurrentMoneyA = (+currentMoneyA) + (+inputMoneyA);
    currentMoneyAList.push(+inputMoneyA);
    this.setState({ currentMoneyA: newCurrentMoneyA, inputMoneyA: 0, currentMoneyAList });
  }

  updateCurrentMoneyB() {
    const { currentMoneyB, inputMoneyB, currentMoneyBList } = this.state;
    const newCurrentMoneyB = (+currentMoneyB) + (+inputMoneyB);
    currentMoneyBList.push(+inputMoneyB);
    this.setState({ currentMoneyB: newCurrentMoneyB, inputMoneyB: 0, currentMoneyBList });
  }

  undoCurrentMoneyA() {
    const { currentMoneyA, currentMoneyAList } = this.state;
    if (currentMoneyAList.length > 0) {
      const lastInput = currentMoneyAList.pop();
      const newCurrentMoneyA = (+currentMoneyA) - (+lastInput);
      this.setState({ currentMoneyA: newCurrentMoneyA, currentMoneyAList });
    }
  }

  undoCurrentMoneyB() {
    const { currentMoneyB, currentMoneyBList } = this.state;
    if (currentMoneyBList.length > 0) {
      const lastInput = currentMoneyBList.pop();
      const newCurrentMoneyB = (+currentMoneyB) - (+lastInput);
      this.setState({ currentMoneyB: newCurrentMoneyB, currentMoneyBList });
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
      currentMoneyAList: [],
      currentMoneyBList: [],
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

  renderWinner() {
    if (this.state.winnerName === 'A') {
      return (<div className="winner"><img src="assets/A.jpg" alt="A" />
      <div className="winner-text">勝者</div>
        <button onClick={() => this.reset()}>RESET</button></div>);
    } else {
      return (<div className="winner"><img src="assets/B.jpg" alt="B" />
      <div className="winner-text">勝者</div>
        <button onClick={() => this.reset()}>RESET</button></div>);
    }
  }

  render() {

    return (
      <div>
        {
          this.state.result ?
            this.renderWinner() :
            <div className="center">
              <div className="row">
                <div className="rate">
                  {formatFloat(this.state.rateA, 2)}
                </div>
                <img src="assets/A.jpg" className="player" alt="A" />
                <div className="score">
                  {this.state.winA}
                </div>
                <div className="money">
                  此輪總投注: {this.state.currentMoneyA}
                </div>
                <input
                  type="number"
                  value={this.state.inputMoneyA}
                  onChange={this.handleInputMoneyA}
                />
              <button className="money-button" onClick={this.updateCurrentMoneyA}>加注</button>
              <button className="money-button" onClick={this.undoCurrentMoneyA}>復原</button>
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
                <div className="money">
                  此輪總投注: {this.state.currentMoneyB}
                </div>
                <input
                  type="number"
                  value={this.state.inputMoneyB}
                  onChange={this.handleInputMoneyB}
                />
              <button className="money-button" onClick={this.updateCurrentMoneyB}>加注</button>
              <button className="money-button" onClick={this.undoCurrentMoneyB}>復原</button>
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
              </div>
              <button onClick={this.checkWin} className="check">F I G H T !</button>
            </div>
        }
      </div>

    );
  }
}
export default App;
