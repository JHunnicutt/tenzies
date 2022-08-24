import React from 'react'
import Die from './Die'
import { nanoid } from 'nanoid'

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
      setDice(prevState => {
         return prevState.map(die => {
            return !die.isHeld ? generateDie() : die
         })
      })
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

   return (
    <main>
      <h1>Tenzies</h1>
      <p>Roll until all the dice are the same. Click each die to hold it at its current value between rolls.</p>
      <div className="dice">
         {diceElements}
      </div>
      <button className="roll-btn" onClick={rollDice}>
         Roll
      </button>
    </main>
   )
}

export default App
