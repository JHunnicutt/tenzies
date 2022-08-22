import React from 'react'

export default function Die (props) {
    // const styles = {
    //     backgroundColor: (props.isHeld ? "#59E391" : "#FFFFFF")
    // }
    let className = 'die'
    if (props.isHeld) {
        className += ' die--held'
    }
    return (
        <div
            className={className}
            onClick={props.holdDice}
        >
            <h2>{props.value}</h2>
        </div>
    )
}