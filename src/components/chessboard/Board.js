import { useState } from 'react'
import { manager } from '../../socket'

import Chess from 'chess.js'
import { Chessboard } from 'react-chessboard'

const Board = () => {
	const [game, setGame] = useState(new Chess())

	const socket = manager.socket('/chessboard')

	socket.on('connection', () => {
		console.log('connected to the socket server')
	})

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

		// checkmate
		// if (move === null && )
		if (game.in_checkmate()) {
			console.log('in checkmate')
		}
    
		return true
	}

    return <Chessboard position={game.fen()} onPieceDrop={onDrop} boardWidth='600' boardOrientation='black' />
}

export default Board