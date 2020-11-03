import React, {Component} from 'react';
import {
  Row, Col, Container,
  Card, CardText, CardBody,
  CardTitle, Button, CardHeader,
} from 'reactstrap'
import quiz from '../../quiz.json';
import classnames from 'classnames';
class Quiz extends Component {
  constructor (props){
    super(props);
    this.state = {
      quiz,
      answer: '',
      currentQ: {},
      nextQ: {},
      previousQ: {},
      numberOfQ: 10,
      numberOfAnsweredQ: 0,
      currentQIndex: 0,
      score: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
      fiftyFifty: 1,
      usedFiftyFifty: false,
      nextButtonDisabled: false,
      previousButtonDisabled: true,
      previousRandomNumbers: [],
      addTime: 0,
      time: {}
    };
    this.interval = null;
  }
  componentDidMount () {
    const { quiz, currentQ, nextQ, previousQ } = this.state;
    this.showquiz(quiz, currentQ, nextQ, previousQ);
    this.timer();
  }

  componentWillUnmount () {
    clearInterval(this.interval);
  }
  showquiz = (quiz = this.state.quiz, currentQ, nextQ, previousQ) => {
    let {currentQIndex} = this.state;

    if (this.state.quiz !== null || this.state.quiz !== '') {
      quiz = this.state.quiz;
      currentQ = quiz[currentQIndex];
      nextQ = quiz[currentQIndex +1];
      previousQ = quiz[currentQIndex -1];
      const answer = currentQ.answer;
      this.setState({
        currentQ,
        nextQ,
        previousQ,
        numberOfQ: quiz.length,
        answer,
        previousRandomNumbers: []
      }, () => {
        this.showOptions();

      });
    }
  };
  handleOptClick = (e) => {
    if (e.target.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
      this.correctAnswer();
    } else {
      this.wrongAnswer();
    }
  }
  handleaddTime= (e) => {
    this.setState({
     //TODO set time + 10 sec
    })
    console.log('added +10 sec')
  }
  correctAnswer = () => {
    alert('is correct!');
    this.setState(prevState => ({
      score: prevState.score + 1,
      correctAnswers: prevState.correctAnswers + 1,
      currentQIndex: prevState.currentQIndex + 1,
      numberOfAnsweredQ: prevState.numberOfAnsweredQ + 1
    }), () => {
      if (this.state.nextQ === undefined) {
        this.endQuiz()
      } else {
        this.showquiz(this.state.quiz, this.state.currentQ, this.state.nextQ, this.state.previousQ);
      }
    });
  }

  wrongAnswer = () => {
    alert('answer is wroooong');
    this.setState(prevState => ({
      wrongAnswers: prevState.wrongAnswers + 1,
      currentQIndex: prevState.currentQIndex + 1,
      numberOfAnsweredQ: prevState.numberOfAnsweredQ + 1
    }), () => {
      if (this.state.nextQ === undefined) {
        this.endQuiz()
      } else {
        this.showquiz(this.state.quiz, this.state.currentQ, this.state.nextQ, this.state.previousQ);
      }
    });
  }

  showOptions = () => {
    const options = Array.from(document.querySelectorAll('.option'));

    options.forEach(option => {
      option.style.visibility = 'visible';
    });

    this.setState({
      usedFiftyFifty: false
    });
  }
  handleBtnNext = () => {
    if (this.state.nextQ !== undefined) {
      this.setState(prevState => ({
        currentQIndex: prevState.currentQIndex + 1
      }), () => {
        this.showquiz(this.state.state, this.state.currentQ, this.state.nextQ, this.state.previousQ);
      });
    }
  };
  handleBtnPrev = () => {
    if (this.state.previousQ !== undefined) {
      this.setState(prevState => ({
        currentQIndex: prevState.currentQIndex - 1
      }), () => {
        this.showquiz(this.state.state, this.state.currentQ, this.state.nextQ, this.state.previousQ);
      });
    }
  };
  handleQuit = () => {
    if (window.confirm('Are you sure you want to quit?')) {
      this.props.history.push('/');
    }
  };

  handleClick = (e) => {
    switch (e.target.id) {
      case 'next':
        this.handleBtnNext();
        break;

      case 'previous':
        this.handleBtnPrev();
        break;

      case 'quit':
        this.handleQuit();
        break;

      default:
        break;
    }
  };
  handleFiftyFifty = () => {
    if (this.state.fiftyFifty > 0 && this.state.usedFiftyFifty === false) {
      const options = document.querySelectorAll('.option');
      const randomNumbers = [];
      let indexOfAnswer;

      options.forEach((option, index) => {
        if (option.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
          indexOfAnswer = index;
        }
      });
      let count = 0;
      do {
        const randomNumber = Math.round(Math.random() * 3);
        if (randomNumber !== indexOfAnswer) {
          if (randomNumbers.length < 2 && !randomNumbers.includes(randomNumber) && !randomNumbers.includes(indexOfAnswer)) {
            randomNumbers.push(randomNumber);
            count ++;
          } else {
            while (true) {
              const newRandomNumber = Math.round(Math.random() * 3);
              if (!randomNumbers.includes(newRandomNumber) && newRandomNumber !== indexOfAnswer) {
                randomNumbers.push(newRandomNumber);
                count ++;
                break;
              }
            }
          }
        }
      } while (count < 2);
      options.forEach((option, index) => {
        if (randomNumbers.includes(index)) {
          option.style.visibility = 'hidden';
        }
      });
      this.setState(prevState => ({
        fiftyFifty: prevState.fiftyFifty - 1,
        usedFiftyFifty: true
      }));
    }
  }

  timer = () => {
    const countDownTime = Date.now() + 16000;
    this.interval = setInterval(() => {
      const now = new Date();
      const distance = countDownTime - now;

      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        clearInterval(this.interval);
        this.setState({
          time: {
            minutes: 0,
            seconds: 0
          }
        }, () => {
          this.setState(prevState => ({
            currentQIndex: prevState.currentQIndex + 1
          }), () => {
            this.showquiz(this.state.state, this.state.currentQ, this.state.nextQ, this.state.previousQ);
          });
          this.timer();
        });
      } else {
        this.setState({
          time: {
            minutes,
            seconds,
            distance
          }
        });
      }
    }, 1000);
  }

  endQuiz = () => {
    alert('The quiz has eneded!');
    const { state } = this;
    const playerStats = {
      score: state.score,
      numberOfQ: state.numberOfQ,
      numberOfAnsweredQ: state.correctAnswers + state.wrongAnswers,
      correctAnswers: state.correctAnswers,
      wrongAnswers: state.wrongAnswers,
      fiftyFiftyUsed: 1 - state.fiftyFifty,
    };
    setTimeout(() => {
      this.props.history.push('/summary', playerStats);
    }, 1000);
  }
  render() {
    console.log(quiz)
    const {
      currentQ,
      fiftyFifty,
      numberOfQ,
      currentQIndex,
      time
    } = this.state;
    return(
      <>
        <Container>
          <Row className={'justify-content-center '}>
            <Col md={'8'}>
              <Card className={'bg-light'}>
                <div className="p-4">
                  <CardTitle className={'d-flex justify-content-between'}>
                    <h3>Quiz</h3> <h4 className={''}>
                    ({currentQIndex + 1} of {numberOfQ})
                  </h4>
                  </CardTitle>
                  <CardHeader>

                    <p onClick={this.handleFiftyFifty} className={'float-right'}>
                      {fiftyFifty} (50/50)
                    </p>
                    <span onClick={this.handleaddTime}>+10 sec</span>
                  </CardHeader>
                  <CardBody>
                    <CardText>{currentQ.question}</CardText>
                    <Col>
                      <Button className={'option m-3 btn-info'} onClick={this.handleOptClick}>{currentQ.option1}</Button>
                      <Button className={'option m-3 btn-info'} onClick={this.handleOptClick}>{currentQ.option2}</Button>
                    </Col>
                    <Col>
                    <Button className={'option m-3 btn-info'} onClick={this.handleOptClick}>{currentQ.option3}</Button>
                    <Button className={'option m-3 btn-info'} onClick={this.handleOptClick}>{currentQ.option4}</Button>
                    </Col>
                  </CardBody>
                  <Col md={4} className={'offset-4 justify-content-center'}>
                    <div className={'circle'}>
                      <div className={classnames('text-white pt-2 text-center', {
                        'warning': time.distance <= 120000,
                        'invalid': time.distance < 30000
                      })}>
                        <h4 className={'pt-4'}>{time.minutes}:{time.seconds}</h4>
                      </div>
                    </div>
                  </Col>
                  <div>

                </div>
                  <div className={'mt-3 d-flex justify-content-end'}>
                    <Button
                      className={classnames('', 'btn mr-2', {'disable': this.state.previousButtonDisabled})}
                      id="previous"
                      onClick={this.handleClick}>
                      Previous
                    </Button>
                    <Button
                      className={classnames('', 'btn green mr-2', {'disable': this.state.nextButtonDisabled})}
                      id="next"
                      onClick={this.handleClick}>
                      Next
                    </Button>
                    <Button id="quit" onClick={this.handleClick} className={'btn red'}>
                      Quit
                    </Button>
                  </div>
                </div>

              </Card>
            </Col>
          </Row>
        </Container>
      </>
    )
  }
}
export default Quiz;