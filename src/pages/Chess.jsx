import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from '../router.jsx'
import {
  applyMove,
  chooseMove,
  initialState,
  legalMoves,
  status,
  toSan,
} from '../chess/engine.js'
import '../Chess.css'

const GLYPH = { K: '♚', Q: '♛', R: '♜', B: '♝', N: '♞', P: '♟' }
const FILES = 'abcdefgh'

const INITIAL_COUNTS = { P: 8, N: 2, B: 2, R: 2, Q: 1, K: 1 }

export default function Chess() {
  const [game, setGame] = useState(initialState)
  const [history, setHistory] = useState([])
  const [selected, setSelected] = useState(null)
  const [lastMove, setLastMove] = useState(null)
  const [flipped, setFlipped] = useState(false)
  const [mode, setMode] = useState('cpu')
  const [thinking, setThinking] = useState(false)

  const moves = useMemo(() => legalMoves(game), [game])
  const gameStatus = useMemo(() => status(game), [game])
  const targets = useMemo(
    () => (selected === null ? [] : moves.filter((m) => m.from === selected)),
    [moves, selected],
  )

  const doMove = useCallback(
    (move) => {
      const san = toSan(game, move, moves)
      setHistory((h) => [
        ...h,
        { san, from: move.from, to: move.to, before: game },
      ])
      setGame(applyMove(game, move))
      setLastMove({ from: move.from, to: move.to })
      setSelected(null)
    },
    [game, moves],
  )

  /* ---- computer opponent ---- */
  useEffect(() => {
    if (mode !== 'cpu' || game.turn !== 'b') return
    if (gameStatus === 'checkmate' || gameStatus === 'stalemate' || gameStatus === 'draw') {
      return
    }
    setThinking(true)
    const id = setTimeout(() => {
      const move = chooseMove(game, 3)
      if (move) doMove(move)
      setThinking(false)
    }, 320)
    return () => {
      clearTimeout(id)
      setThinking(false)
    }
  }, [game, mode, gameStatus, doMove])

  const onSquare = (sq) => {
    const target = targets.find((m) => m.to === sq)
    if (target) {
      doMove(target)
      return
    }
    const piece = game.board[sq]
    if (piece === '.') {
      setSelected(null)
      return
    }
    const side = piece === piece.toUpperCase() ? 'w' : 'b'
    if (side !== game.turn) {
      setSelected(null)
      return
    }
    if (mode === 'cpu' && game.turn === 'b') return
    setSelected((cur) => (cur === sq ? null : sq))
  }

  const newGame = () => {
    setGame(initialState())
    setHistory([])
    setSelected(null)
    setLastMove(null)
    setThinking(false)
  }

  const undo = () => {
    if (!history.length) return
    const steps = mode === 'cpu' && history.length >= 2 ? 2 : 1
    const target = history[history.length - steps]
    setGame(target.before)
    setHistory((h) => h.slice(0, h.length - steps))
    setSelected(null)
    setLastMove(null)
    setThinking(false)
  }

  /* ---- captured pieces, derived from the board ---- */
  const captured = useMemo(() => {
    const count = { w: {}, b: {} }
    for (const p of game.board) {
      if (p === '.') continue
      const white = p === p.toUpperCase()
      const key = p.toUpperCase()
      const bag = white ? count.w : count.b
      bag[key] = (bag[key] || 0) + 1
    }

    const lost = (bag) => {
      const out = []
      for (const key of Object.keys(INITIAL_COUNTS)) {
        const gone = INITIAL_COUNTS[key] - (bag[key] || 0)
        if (gone > 0) out.push({ key, n: gone })
      }
      return out
    }

    return { white: lost(count.w), black: lost(count.b) }
  }, [game.board])

  const rows = flipped ? [...Array(8).keys()].reverse() : [...Array(8).keys()]
  const cols = flipped ? [...Array(8).keys()].reverse() : [...Array(8).keys()]

  const message = (() => {
    if (gameStatus === 'checkmate') {
      return game.turn === 'w' ? 'Black wins — checkmate' : 'White wins — checkmate'
    }
    if (gameStatus === 'stalemate') return 'Draw — stalemate'
    if (gameStatus === 'draw') return 'Draw'
    if (gameStatus === 'check') return 'Check!'
    if (mode === 'cpu') {
      if (thinking) return 'Computer is thinking…'
      return game.turn === 'w' ? 'Your move' : 'Computer’s turn'
    }
    return game.turn === 'w' ? 'White to move' : 'Black to move'
  })()

  const pairs = []
  for (let i = 0; i < history.length; i += 2) {
    pairs.push([history[i], history[i + 1]])
  }

  return (
    <div className="chess">
      <div className="shell chess__shell">
        <header className="chess__head">
          <div>
            <Link to="/beyond" className="chess__back">
              ← Back to Beyond
            </Link>
            <h1 className="chess__title">
              Chess<span className="dot">.</span>
            </h1>
            <p className="chess__sub">Strategy over impulse — play a game right here.</p>
          </div>

          <div className="chess__controls">
            <div className="seg" role="group" aria-label="Game mode">
              <button
                type="button"
                className={`seg__btn ${mode === 'cpu' ? 'is-on' : ''}`}
                onClick={() => {
                  setMode('cpu')
                  newGame()
                }}
              >
                vs Computer
              </button>
              <button
                type="button"
                className={`seg__btn ${mode === '2p' ? 'is-on' : ''}`}
                onClick={() => {
                  setMode('2p')
                  newGame()
                }}
              >
                Two players
              </button>
            </div>
            <button type="button" className="chess__btn" onClick={undo} disabled={!history.length}>
              Undo
            </button>
            <button type="button" className="chess__btn" onClick={() => setFlipped((v) => !v)}>
              Flip
            </button>
            <button type="button" className="chess__btn chess__btn--accent" onClick={newGame}>
              New game
            </button>
          </div>
        </header>

        <div className="chess__body">
          {/* ---------------- board ---------------- */}
          <div className="chess__board-wrap">
            <div className={`board ${flipped ? 'is-flipped' : ''}`}>
              {rows.map((r) =>
                cols.map((f) => {
                  const sq = r * 8 + f
                  const piece = game.board[sq]
                  const isTarget = targets.some((m) => m.to === sq)
                  const isCapture = isTarget && piece !== '.'
                  const isSel = selected === sq
                  const isLast = lastMove && (lastMove.from === sq || lastMove.to === sq)
                  const isLight = (r + f) % 2 === 0
                  const white = piece !== '.' && piece === piece.toUpperCase()

                  return (
                    <button
                      type="button"
                      key={sq}
                      className={[
                        'sq',
                        isLight ? 'sq--light' : 'sq--dark',
                        isSel ? 'is-sel' : '',
                        isLast ? 'is-last' : '',
                        isTarget ? 'is-target' : '',
                      ].join(' ')}
                      onClick={() => onSquare(sq)}
                      aria-label={`${FILES[f]}${8 - r}`}
                    >
                      {f === 0 && <span className="sq__rank">{8 - r}</span>}
                      {r === 7 && <span className="sq__file">{FILES[f]}</span>}
                      {piece !== '.' && (
                        <span className={`piece ${white ? 'piece--w' : 'piece--b'}`}>
                          {GLYPH[piece.toUpperCase()]}
                        </span>
                      )}
                      {isTarget && !isCapture && <span className="sq__dot" />}
                      {isCapture && <span className="sq__ring" />}
                    </button>
                  )
                }),
              )}
            </div>

            <p className={`chess__status ${gameStatus === 'check' ? 'is-check' : ''}`}>
              <span className="chess__status-dot" />
              {message}
            </p>
          </div>

          {/* ---------------- side panel ---------------- */}
          <aside className="panel">
            <div className="panel__block">
              <span className="panel__label">Position</span>
              <p className="panel__state">
                {gameStatus === 'checkmate'
                  ? 'Checkmate'
                  : gameStatus === 'stalemate'
                    ? 'Stalemate'
                    : gameStatus === 'draw'
                      ? 'Draw'
                      : `${game.turn === 'w' ? 'White' : 'Black'} to move${
                          gameStatus === 'check' ? ' — check' : ''
                        }`}
              </p>
            </div>

            <div className="panel__block">
              <span className="panel__label">Captured</span>
              <div className="panel__captured">
                <div className="panel__cap-row">
                  <small>White lost</small>
                  <span>
                    {captured.white.length
                      ? captured.white.map((c) => `${GLYPH[c.key]}${c.n > 1 ? c.n : ''}`).join(' ')
                      : '—'}
                  </span>
                </div>
                <div className="panel__cap-row">
                  <small>Black lost</small>
                  <span>
                    {captured.black.length
                      ? captured.black.map((c) => `${GLYPH[c.key]}${c.n > 1 ? c.n : ''}`).join(' ')
                      : '—'}
                  </span>
                </div>
              </div>
            </div>

            <div className="panel__block panel__block--moves">
              <span className="panel__label">Moves {history.length ? `· ${history.length}` : ''}</span>
              <ol className="panel__moves">
                {pairs.length === 0 && (
                  <li className="panel__empty">Click a piece, then a highlighted square.</li>
                )}
                {pairs.map(([w, b], i) => (
                  <li className="panel__pair" key={i}>
                    <span className="panel__n">{i + 1}.</span>
                    <span className="panel__mv">{w?.san || ''}</span>
                    <span className="panel__mv">{b?.san || ''}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="panel__block panel__tip">
              <span className="panel__label">How to play</span>
              <p>
                Select a piece to see its legal moves (dots = free square, ring =
                capture). Castling, en passant and promotion are all supported.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
