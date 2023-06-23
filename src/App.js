import { useState } from 'react'
import { Chessboard } from 'react-chessboard'
import Chess from 'chess.js'
function App() {
	const [game, setGame] = useState(new Chess())

	// perform modify function on game state
	function safeGameMutate(modify) {
		setGame((g) => {
			const update = { ...g }
			modify(update)
			return update
		})
	}

	function onDrop(sourceSquare, targetSquare) {
		let move = null
		safeGameMutate((game) => {
			move = game.move({
				from: sourceSquare,
				to: targetSquare,
				promotion: 'q',
			})
		})

		// illegal move made
		if (move === null) return false
    
		return true
	}
	return <Chessboard position={game.fen()} onPieceDrop={onDrop} boardWidth='600' boardOrientation='black' />
}
export default App
