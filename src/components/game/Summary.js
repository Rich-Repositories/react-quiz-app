import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardTitle, Col, Container, Row } from 'reactstrap'

class Summary extends Component {
  constructor (props) {
    super(props);
    this.state = {
      score: 0,
      numberOfQ: 0,
      numberOfAnsweredQ: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
      fiftyFiftyUsed: 0
    };
  }

  componentDidMount () {
    const { state } = this.props.location;
    if (state) {
      this.setState({
        score: (state.score / state.numberOfQ) * 100,
        numberOfQ: state.numberOfQ,
        numberOfAnsweredQ: state.numberOfAnsweredQ,
        correctAnswers: state.correctAnswers,
        wrongAnswers: state.wrongAnswers,
        fiftyFiftyUsed: state.fiftyFiftyUsed
      });
    }
  }

  render () {
    const { state } = this.props.location;
    let stats, remark;
    const userScore = this.state.score;

    if (userScore <= 60 ) {
      remark = 'You need more practice!';
    } else {
      remark = 'You\'re an absolute genius!';
    }

    if (state !== undefined) {
      stats = (

        <>
          <Container>
            <Row className={'justify-content-center '}>
              <Col md={'8'}>
                <Card className={'bg-light'}>
                  <div className="p-4">
                    <CardTitle className={''}>
                      <h3>Quiz has ended</h3>
                    </CardTitle>
                    <CardBody>
                      <div className="container stats">
                        <h4>{remark}</h4>
                        <h2>Your Score: {this.state.score.toFixed(0)}&#37;</h2>
                        <span className="stat left">Total number of questions: </span>
                        <span className="right">{this.state.numberOfQ}</span><br />

                        <span className="stat left">Number of attempted questions: </span>
                        <span className="right">{this.state.numberOfAnsweredQ}</span><br />

                        <span className="stat left">Number of Correct Answers: </span>
                        <span className="right">{this.state.correctAnswers}</span> <br />

                        <span className="stat left">Number of Wrong Answers: </span>
                        <span className="right">{this.state.wrongAnswers}</span><br />


                        <span className="stat left">50-50 Used: </span>
                        <span className="right">{this.state.fiftyFiftyUsed}</span>
                      </div>
                      <section>
                        <ul>
                          <li>
                            <Link to ="/quiz">Play Again</Link>
                          </li>
                          <li>
                            <Link to ="/">Back to Home</Link>
                          </li>
                        </ul>
                      </section>
                    </CardBody>
                  </div>
                </Card>
              </Col>
            </Row>
          </Container>
        </>
      );
    } else {
      stats = (
        <section>
          <h1 className="no-stats">No Statistics Available</h1>
          <ul>
            <li>
              <Link to ="/quiz">Take a Quiz</Link>
            </li>
            <li>
              <Link to ="/">Back to Home</Link>
            </li>
          </ul>
        </section>
      );
    }
    return (
      <>
        <div className="quiz-summary">
          {stats}
        </div>
      </>
    );
  }
}

export default Summary;