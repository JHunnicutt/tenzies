import React from 'react'
import Die from './Die'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

const App = () => {
   const [dice, setDice] = React.useState(allNewDice)
   const [tenzies, setTenzies] = React.useState(false)

   function generateDie() {
      return {
         value: Math.ceil(Math.random() * 6),
         isHeld: false,
         id: nanoid()
      }
   }

   function allNewDice() {
      const newDice = []
      for(let i = 0; i < 10; i++) {
         newDice.push(generateDie())
      }
      return newDice
   }

   function rollDice(id) {
      if(!tenzies) {
         setDice(prevState => {
            return prevState.map(die => {
               return !die.isHeld ? generateDie() : die
            })
         })
      } else {
         setTenzies(false)
         setDice(allNewDice())
      }
   }

   function holdDice(id) {
      setDice(prevState => {
         return prevState.map(die => {
            return die.id === id ?
            {...die, isHeld: !die.isHeld} :
            die
         })
      })
   }

   React.useEffect(() => {
      const heldDice = dice.every(die => die.isHeld)
      const allEqual = dice.every(die => die.value === dice[0].value)
      if(heldDice && allEqual) {
         setTenzies(true)
         console.log('You won!')
      }
   }, [dice])

   const diceElements = dice.map(die => (
         <Die
            key={die.id}
            value={die.value}
            isHeld={die.isHeld}
            holdDice={() => holdDice(die.id)}
         />
      ))

   const introText = `Roll until all the dice are the same. Click each die to hold it at its current value between rolls.`
   const winText = `Congratulations! Click the New Game button to play again!`

   return (
    <main>
      {tenzies && <Confetti />}
      <h1>{tenzies ? 'You Won!' : 'Tenzies'}</h1>
      <p>{tenzies ? winText : introText}</p>
      <div className="dice">
         {diceElements}
      </div>
      <button
         className="roll-btn"
         onClick={rollDice}
      >
         {tenzies ? 'New Game' : 'Roll'}
      </button>
    </main>
   )
}

export default App
