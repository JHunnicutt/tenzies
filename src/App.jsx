import React from 'react'
import Die from './Die'


const App = () => {
   const [dice, setDice] = React.useState(allNewDice)

   function allNewDice() {
      const newDice = []
      for(let i = 0; i < 10; i++) {
         newDice.push({
            value: Math.ceil(Math.random() * 6),
            isHeld: false
         })
      }
      return newDice
   }

   function rollDice() {
      setDice(allNewDice)
   }

   const diceElements = dice.map((die, index) => {
      return (
         <Die
            key={index}
            value={die.value}
         />
      )
   })

   return (
    <main>
      <div className="dice">
         {diceElements}
      </div>
      <button class="roll-btn" onClick={rollDice}>
         Roll
      </button>
    </main>
   )
}

export default App
