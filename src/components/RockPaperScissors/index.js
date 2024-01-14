import {Component} from 'react'
import Popup from 'reactjs-popup'
import {RiCloseLine} from 'react-icons/ri'
import ImageItem from '../ImageItem'

import {
  RockPaperScissorsContainer,
  RockPaperScissorScoreCard,
  Heading,
  ScoreCard,
  ScoreHeading,
  ScoreCount,
  RulesButton,
  Image,
  ImageDeleteCard,
  DeleteButton,
  ImageCard,
  HeadingCard,
  GameResultContainer,
  SelecterOptionContainer,
  GameUserOptionContainer,
  GameViewContainer,
  GameResult,
  GameResultH1,
  PlayAgainBtn,
  ResultImage,
  UnOrderedImageContainer,
} from './styledComponents'

const statusConstants = {
  inProgress: 'IN_PROGRESS',
  win: 'WIN',
  loss: 'LOSS',
  draw: 'DRAW',
}

class RockPaperScissors extends Component {
  state = {
    score: 0,
    gameStatus: statusConstants.inProgress,
    userChoice: '',
    gameChoice: '',
  }

  onClickUserChoice = id => {
    this.setState(
      {userChoice: id, gameChoice: this.getGameChoice()},
      this.calculateScore,
    )
  }

  onClickGameView = () => {
    this.setState({gameStatus: statusConstants.inProgress})
  }

  getGameChoice = () => {
    const {choicesList} = this.props
    const gameChoiceList = choicesList.map(eachItem => eachItem.id)
    const randomIndex = Math.floor(Math.random() * 3)
    return gameChoiceList[randomIndex]
  }

  calculateScore = () => {
    const {userChoice, gameChoice} = this.state

    if (userChoice === gameChoice) {
      this.setState({gameStatus: statusConstants.draw})
    } else if (userChoice === 'ROCK') {
      if (gameChoice === 'SCISSORS') {
        this.setState(prevState => ({
          gameStatus: statusConstants.win,
          score: prevState.score + 1,
        }))
      } else {
        this.setState(prevState => ({
          gameStatus: statusConstants.loss,
          score: prevState.score - 1,
        }))
      }
    } else if (userChoice === 'PAPER') {
      if (gameChoice === 'ROCK') {
        this.setState(prevState => ({
          gameStatus: statusConstants.win,
          score: prevState.score + 1,
        }))
      } else {
        this.setState(prevState => ({
          gameStatus: statusConstants.loss,
          score: prevState.score - 1,
        }))
      }
    } else if (userChoice === 'SCISSORS') {
      if (gameChoice === 'PAPER') {
        this.setState(prevState => ({
          gameStatus: statusConstants.win,
          score: prevState.score + 1,
        }))
      } else {
        this.setState(prevState => ({
          gameStatus: statusConstants.loss,
          score: prevState.score - 1,
        }))
      }
    }
  }

  renderInProgressView = () => {
    const {choicesList} = this.props

    return (
      <UnOrderedImageContainer>
        {choicesList.map(eachImg => (
          <ImageItem
            key={eachImg.id}
            imageDetails={eachImg}
            onClickUserChoice={this.onClickUserChoice}
          />
        ))}
      </UnOrderedImageContainer>
    )
  }

  renderWonView = () => {
    const {userChoice, gameChoice} = this.state
    const {choicesList} = this.props
    const userChoiceList = choicesList.filter(
      eachChoice => eachChoice.id === userChoice,
    )
    const userChoiceObj = userChoiceList[0]
    const gameChoiceList = choicesList.filter(
      eachChoice => eachChoice.id === gameChoice,
    )
    const gameChoiceObj = gameChoiceList[0]

    return (
      <GameResultContainer>
        <SelecterOptionContainer>
          <GameUserOptionContainer>
            <GameResult>You</GameResult>
            <ResultImage src={userChoiceObj.imageUrl} alt="your choice" />
          </GameUserOptionContainer>
          <GameUserOptionContainer>
            <GameResult>OTHER</GameResult>
            <ResultImage src={gameChoiceObj.imageUrl} alt="opponent choice" />
          </GameUserOptionContainer>
        </SelecterOptionContainer>
        <GameResultH1>YOU WON</GameResultH1>
        <PlayAgainBtn type="button" onClick={this.onClickGameView}>
          PLAY AGAIN
        </PlayAgainBtn>
      </GameResultContainer>
    )
  }

  renderLostView = () => {
    const {userChoice, gameChoice} = this.state
    const {choicesList} = this.props
    const userChoiceList = choicesList.filter(
      eachChoice => eachChoice.id === userChoice,
    )
    const userChoiceObj = userChoiceList[0]
    const gameChoiceList = choicesList.filter(
      eachChoice => eachChoice.id === gameChoice,
    )
    const gameChoiceObj = gameChoiceList[0]

    return (
      <GameResultContainer>
        <SelecterOptionContainer>
          <GameUserOptionContainer>
            <GameResult>You</GameResult>
            <ResultImage src={userChoiceObj.imageUrl} alt="your choice" />
          </GameUserOptionContainer>
          <GameUserOptionContainer>
            <GameResult>OTHER</GameResult>
            <ResultImage src={gameChoiceObj.imageUrl} alt="opponent choice" />
          </GameUserOptionContainer>
        </SelecterOptionContainer>
        <GameResultH1>YOU LOSE</GameResultH1>
        <PlayAgainBtn type="button" onClick={this.onClickGameView}>
          PLAY AGAIN
        </PlayAgainBtn>
      </GameResultContainer>
    )
  }

  renderDrawView = () => {
    const {userChoice, gameChoice} = this.state
    const {choicesList} = this.props
    const userChoiceList = choicesList.filter(
      eachChoice => eachChoice.id === userChoice,
    )
    const userChoiceObj = userChoiceList[0]
    const gameChoiceList = choicesList.filter(
      eachChoice => eachChoice.id === gameChoice,
    )
    const gameChoiceObj = gameChoiceList[0]

    return (
      <GameResultContainer>
        <SelecterOptionContainer>
          <GameUserOptionContainer>
            <GameResult>You</GameResult>
            <ResultImage src={userChoiceObj.imageUrl} alt="your choice" />
          </GameUserOptionContainer>
          <GameUserOptionContainer>
            <GameResult>OTHER</GameResult>
            <ResultImage src={gameChoiceObj.imageUrl} alt="opponent choice" />
          </GameUserOptionContainer>
        </SelecterOptionContainer>
        <GameResultH1>IT IS DRAW</GameResultH1>
        <PlayAgainBtn type="button" onClick={this.onClickGameView}>
          PLAY AGAIN
        </PlayAgainBtn>
      </GameResultContainer>
    )
  }

  renderGameView = () => {
    const {gameStatus} = this.state
    switch (gameStatus) {
      case statusConstants.inProgress:
        return this.renderInProgressView()
      case statusConstants.win:
        return this.renderWonView()
      case statusConstants.loss:
        return this.renderLostView()
      case statusConstants.draw:
        return this.renderDrawView()

      default:
        return null
    }
  }

  render() {
    const {score} = this.state
    return (
      <RockPaperScissorsContainer>
        <RockPaperScissorScoreCard>
          <HeadingCard>
            <Heading>Rock Paper Scissors</Heading>
          </HeadingCard>
          <ScoreCard>
            <ScoreHeading>Score</ScoreHeading>
            <ScoreCount>{score}</ScoreCount>
          </ScoreCard>
        </RockPaperScissorScoreCard>
        <GameViewContainer>{this.renderGameView()}</GameViewContainer>
        <Popup modal trigger={<RulesButton type="button">Rules</RulesButton>}>
          {close => (
            <ImageDeleteCard>
              <div>
                <ImageCard>
                  <Image
                    src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png"
                    alt="rules"
                  />
                </ImageCard>
              </div>

              <DeleteButton type="button" onClick={() => close()}>
                <RiCloseLine />
              </DeleteButton>
            </ImageDeleteCard>
          )}
        </Popup>
      </RockPaperScissorsContainer>
    )
  }
}

export default RockPaperScissors
