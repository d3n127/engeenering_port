/* ============================================================
   Small but complete chess engine
   - full legal move generation (castling, en passant, promotion)
   - check / checkmate / stalemate / draw detection
   - SAN move notation for the move list
   - alpha-beta AI (negamax)
   ============================================================ */

export const WHITE = 'w'
export const BLACK = 'b'

const FILES = 'abcdefgh'
const KNIGHT = [
  [-2, -1], [-2, 1], [-1, -2], [-1, 2],
  [1, -2], [1, 2], [2, -1], [2, 1],
]
const KING = [
  [-1, -1], [-1, 0], [-1, 1],
  [0, -1], [0, 1],
  [1, -1], [1, 0], [1, 1],
]
const BISHOP = [[-1, -1], [-1, 1], [1, -1], [1, 1]]
const ROOK = [[-1, 0], [1, 0], [0, -1], [0, 1]]

const PIECE_VALUE = { p: 100, n: 320, b: 330, r: 500, q: 900, k: 0 }

// piece-square tables (white perspective, index 0 = a8)
const PST = {
  p: [
    0, 0, 0, 0, 0, 0, 0, 0,
    5, 10, 10, -20, -20, 10, 10, 5,
    5, -5, -10, 0, 0, -10, -5, 5,
    0, 0, 0, 20, 20, 0, 0, 0,
    5, 5, 10, 25, 25, 10, 5, 5,
    10, 10, 20, 30, 30, 20, 10, 10,
    50, 50, 50, 50, 50, 50, 50, 50,
    0, 0, 0, 0, 0, 0, 0, 0,
  ],
  n: [
    -50, -40, -30, -30, -30, -30, -40, -50,
    -40, -20, 0, 5, 5, 0, -20, -40,
    -30, 5, 10, 15, 15, 10, 5, -30,
    -30, 0, 15, 20, 20, 15, 0, -30,
    -30, 5, 15, 20, 20, 15, 5, -30,
    -30, 0, 10, 15, 15, 10, 0, -30,
    -40, -20, 0, 0, 0, 0, -20, -40,
    -50, -40, -30, -30, -30, -30, -40, -50,
  ],
  b: [
    -20, -10, -10, -10, -10, -10, -10, -20,
    -10, 5, 0, 0, 0, 0, 5, -10,
    -10, 10, 10, 10, 10, 10, 10, -10,
    -10, 0, 10, 10, 10, 10, 0, -10,
    -10, 5, 5, 10, 10, 5, 5, -10,
    -10, 0, 5, 10, 10, 5, 0, -10,
    -10, 0, 0, 0, 0, 0, 0, -10,
    -20, -10, -10, -10, -10, -10, -10, -20,
  ],
  r: [
    0, 0, 0, 5, 5, 0, 0, 0,
    -5, 0, 0, 0, 0, 0, 0, -5,
    -5, 0, 0, 0, 0, 0, 0, -5,
    -5, 0, 0, 0, 0, 0, 0, -5,
    -5, 0, 0, 0, 0, 0, 0, -5,
    -5, 0, 0, 0, 0, 0, 0, -5,
    5, 10, 10, 10, 10, 10, 10, 5,
    0, 0, 0, 0, 0, 0, 0, 0,
  ],
  q: [
    -20, -10, -10, -5, -5, -10, -10, -20,
    -10, 0, 5, 0, 0, 0, 0, -10,
    -10, 5, 5, 5, 5, 5, 0, -10,
    0, 0, 5, 5, 5, 5, 0, -5,
    -5, 0, 5, 5, 5, 5, 0, -5,
    -10, 0, 5, 5, 5, 5, 0, -10,
    -10, 0, 0, 0, 0, 0, 0, -10,
    -20, -10, -10, -5, -5, -10, -10, -20,
  ],
  k: [
    20, 30, 10, 0, 0, 10, 30, 20,
    20, 20, 0, 0, 0, 0, 20, 20,
    -10, -20, -20, -20, -20, -20, -20, -10,
    -20, -30, -30, -40, -40, -30, -30, -20,
    -30, -40, -40, -50, -50, -40, -40, -30,
    -30, -40, -40, -50, -50, -40, -40, -30,
    -30, -40, -40, -50, -50, -40, -40, -30,
    -30, -40, -40, -50, -50, -40, -40, -30,
  ],
}

export function colorOf(piece) {
  if (piece === '.') return null
  return piece === piece.toUpperCase() ? WHITE : BLACK
}

export function initialState() {
  const board = [
    'r', 'n', 'b', 'q', 'k', 'b', 'n', 'r',
    'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p',
    '.', '.', '.', '.', '.', '.', '.', '.',
    '.', '.', '.', '.', '.', '.', '.', '.',
    '.', '.', '.', '.', '.', '.', '.', '.',
    '.', '.', '.', '.', '.', '.', '.', '.',
    'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P',
    'R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R',
  ]
  return {
    board,
    turn: WHITE,
    castling: 'KQkq',
    ep: null, // en-passant target square index
    halfmove: 0,
  }
}

function inside(r, f) {
  return r >= 0 && r < 8 && f >= 0 && f < 8
}

export function isAttacked(board, sq, bySide) {
  const r = sq >> 3
  const f = sq & 7

  // pawns
  const pawnDir = bySide === WHITE ? 1 : -1 // attacker sits one rank "behind"
  for (const df of [-1, 1]) {
    const rr = r + pawnDir
    const ff = f + df
    if (inside(rr, ff)) {
      const p = board[rr * 8 + ff]
      if (p !== '.' && colorOf(p) === bySide && p.toLowerCase() === 'p') return true
    }
  }

  // knights
  for (const [dr, df] of KNIGHT) {
    const rr = r + dr
    const ff = f + df
    if (!inside(rr, ff)) continue
    const p = board[rr * 8 + ff]
    if (p !== '.' && colorOf(p) === bySide && p.toLowerCase() === 'n') return true
  }

  // king
  for (const [dr, df] of KING) {
    const rr = r + dr
    const ff = f + df
    if (!inside(rr, ff)) continue
    const p = board[rr * 8 + ff]
    if (p !== '.' && colorOf(p) === bySide && p.toLowerCase() === 'k') return true
  }

  // sliders
  const rays = [
    [BISHOP, ['b', 'q']],
    [ROOK, ['r', 'q']],
  ]
  for (const [dirs, types] of rays) {
    for (const [dr, df] of dirs) {
      let rr = r + dr
      let ff = f + df
      while (inside(rr, ff)) {
        const p = board[rr * 8 + ff]
        if (p !== '.') {
          if (colorOf(p) === bySide && types.includes(p.toLowerCase())) return true
          break
        }
        rr += dr
        ff += df
      }
    }
  }
  return false
}

export function kingSquare(board, side) {
  const target = side === WHITE ? 'K' : 'k'
  for (let i = 0; i < 64; i++) if (board[i] === target) return i
  return -1
}

export function inCheck(state, side = state.turn) {
  const ksq = kingSquare(state.board, side)
  if (ksq < 0) return false
  return isAttacked(state.board, ksq, side === WHITE ? BLACK : WHITE)
}

function pseudoMoves(state) {
  const { board, turn, castling, ep } = state
  const moves = []
  const enemy = turn === WHITE ? BLACK : WHITE

  const push = (from, to, extra = {}) => {
    moves.push({ from, to, piece: board[from], ...extra })
  }

  for (let i = 0; i < 64; i++) {
    const piece = board[i]
    if (piece === '.' || colorOf(piece) !== turn) continue

    const type = piece.toLowerCase()
    const r = i >> 3
    const f = i & 7

    if (type === 'p') {
      const dir = turn === WHITE ? -8 : 8
      const startRank = turn === WHITE ? 6 : 1
      const promoRank = turn === WHITE ? 0 : 7
      const one = i + dir

      if (board[one] === '.') {
        if ((one >> 3) === promoRank) {
          for (const promo of ['q', 'r', 'b', 'n']) push(i, one, { promo })
        } else {
          push(i, one)
          const two = i + dir * 2
          if (r === startRank && board[two] === '.') push(i, two, { double: true })
        }
      }

      for (const df of [-1, 1]) {
        const rr = r + (turn === WHITE ? -1 : 1)
        const ff = f + df
        if (!inside(rr, ff)) continue
        const to = rr * 8 + ff
        const target = board[to]
        const isCapture = (target !== '.' && colorOf(target) === enemy) || to === ep
        if (!isCapture) continue
        if ((to >> 3) === promoRank) {
          for (const promo of ['q', 'r', 'b', 'n']) {
            push(i, to, { promo, captured: target === '.' ? null : target, ep: to === ep })
          }
        } else {
          push(i, to, {
            captured: target === '.' ? null : target,
            ep: to === ep,
          })
        }
      }
      continue
    }

    if (type === 'n' || type === 'k') {
      const offsets = type === 'n' ? KNIGHT : KING
      for (const [dr, df] of offsets) {
        const rr = r + dr
        const ff = f + df
        if (!inside(rr, ff)) continue
        const to = rr * 8 + ff
        const target = board[to]
        if (target !== '.' && colorOf(target) === turn) continue
        push(i, to, { captured: target === '.' ? null : target })
      }

      // castling
      if (type === 'k' && !inCheck(state, turn)) {
        const rank = turn === WHITE ? 7 : 0
        const kingSide = turn === WHITE ? 'K' : 'k'
        const queenSide = turn === WHITE ? 'Q' : 'q'
        const home = rank * 8 + 4
        if (i === home) {
          if (
            castling.includes(kingSide) &&
            board[home + 1] === '.' &&
            board[home + 2] === '.' &&
            !isAttacked(board, home + 1, enemy) &&
            !isAttacked(board, home + 2, enemy)
          ) {
            push(i, home + 2, { castle: 'K' })
          }
          if (
            castling.includes(queenSide) &&
            board[home - 1] === '.' &&
            board[home - 2] === '.' &&
            board[home - 3] === '.' &&
            !isAttacked(board, home - 1, enemy) &&
            !isAttacked(board, home - 2, enemy)
          ) {
            push(i, home - 2, { castle: 'Q' })
          }
        }
      }
      continue
    }

    const dirs = type === 'b' ? BISHOP : type === 'r' ? ROOK : [...BISHOP, ...ROOK]
    for (const [dr, df] of dirs) {
      let rr = r + dr
      let ff = f + df
      while (inside(rr, ff)) {
        const to = rr * 8 + ff
        const target = board[to]
        if (target === '.') {
          push(i, to)
        } else {
          if (colorOf(target) === enemy) push(i, to, { captured: target })
          break
        }
        rr += dr
        ff += df
      }
    }
  }

  return moves
}

function stripCastling(castling, piece, from, to) {
  let rights = castling
  const remove = (chars) => {
    for (const c of chars) rights = rights.replace(c, '')
  }
  if (piece === 'K') remove('KQ')
  if (piece === 'k') remove('kq')
  if (from === 63 || to === 63) remove('K')
  if (from === 56 || to === 56) remove('Q')
  if (from === 7 || to === 7) remove('k')
  if (from === 0 || to === 0) remove('q')
  return rights
}

export function applyMove(state, move) {
  const board = state.board.slice()
  const piece = board[move.from]

  board[move.from] = '.'

  // en passant capture removes the pawn behind the target square
  if (move.ep) {
    const capSq = move.to + (piece === 'P' ? 8 : -8)
    board[capSq] = '.'
  }

  board[move.to] = move.promo
    ? piece === 'P'
      ? move.promo.toUpperCase()
      : move.promo
    : piece

  // rook shuffle for castling
  if (move.castle === 'K') {
    const rank = piece === 'K' ? 7 : 0
    board[rank * 8 + 5] = board[rank * 8 + 7]
    board[rank * 8 + 7] = '.'
  } else if (move.castle === 'Q') {
    const rank = piece === 'K' ? 7 : 0
    board[rank * 8 + 3] = board[rank * 8 + 0]
    board[rank * 8 + 0] = '.'
  }

  const halfmove =
    piece.toLowerCase() === 'p' || move.captured || move.ep ? 0 : state.halfmove + 1

  return {
    board,
    turn: state.turn === WHITE ? BLACK : WHITE,
    castling: stripCastling(state.castling, piece, move.from, move.to),
    ep: move.double ? (move.from + move.to) / 2 : null,
    halfmove,
  }
}

export function legalMoves(state) {
  const side = state.turn
  const enemy = side === WHITE ? BLACK : WHITE
  const result = []
  for (const move of pseudoMoves(state)) {
    const next = applyMove(state, move)
    const ksq = kingSquare(next.board, side)
    if (ksq >= 0 && isAttacked(next.board, ksq, enemy)) continue
    result.push(move)
  }
  return result
}

function insufficientMaterial(board) {
  const pieces = board.filter((p) => p !== '.' && p.toLowerCase() !== 'k')
  if (pieces.length === 0) return true
  if (pieces.length === 1 && ['b', 'n'].includes(pieces[0].toLowerCase())) return true
  return false
}

/** Returns 'checkmate' | 'stalemate' | 'draw' | 'check' | 'play' */
export function status(state) {
  const moves = legalMoves(state)
  const checked = inCheck(state)
  if (moves.length === 0) return checked ? 'checkmate' : 'stalemate'
  if (state.halfmove >= 100) return 'draw'
  if (insufficientMaterial(state.board)) return 'draw'
  return checked ? 'check' : 'play'
}

export function squareName(sq) {
  return `${FILES[sq & 7]}${8 - (sq >> 3)}`
}

/** Simplified but readable SAN, good enough for a move list. */
export function toSan(state, move, movesBefore) {
  if (move.castle) {
    let san = move.castle === 'K' ? 'O-O' : 'O-O-O'
    const next = applyMove(state, move)
    if (inCheck(next)) san += legalMoves(next).length === 0 ? '#' : '+'
    return san
  }

  const type = move.piece.toLowerCase()
  const capture = Boolean(move.captured || move.ep)
  let san = ''

  if (type === 'p') {
    if (capture) san += FILES[move.from & 7] + 'x'
    san += squareName(move.to)
    if (move.promo) san += '=' + move.promo.toUpperCase()
  } else {
    san += type.toUpperCase()

    // disambiguation between identical pieces heading to the same square
    const rivals = movesBefore.filter(
      (m) =>
        m.to === move.to &&
        m.from !== move.from &&
        m.piece === move.piece &&
        m.promo === move.promo,
    )
    if (rivals.length) {
      const sameFile = rivals.some((m) => (m.from & 7) === (move.from & 7))
      const sameRank = rivals.some((m) => m.from >> 3 === move.from >> 3)
      if (!sameFile) san += FILES[move.from & 7]
      else if (!sameRank) san += String(8 - (move.from >> 3))
      else san += squareName(move.from)
    }

    if (capture) san += 'x'
    san += squareName(move.to)
  }

  const next = applyMove(state, move)
  if (inCheck(next)) san += legalMoves(next).length === 0 ? '#' : '+'
  return san
}

/* ---------------- evaluation + AI ---------------- */

const ABORT = Symbol('search-abort')

function evaluate(state) {
  const board = state.board
  let score = 0

  for (let i = 0; i < 64; i++) {
    const p = board[i]
    if (p === '.') continue
    const white = p === p.toUpperCase()
    const type = p.toLowerCase()
    const table = PST[type]
    const mirrored = white ? i : (i >> 3) * 8 + (7 - (i & 7))
    const value = PIECE_VALUE[type] + table[mirrored]
    score += white ? value : -value
  }

  return score
}

function orderMoves(moves) {
  return moves
    .map((m) => ({
      m,
      s: (m.captured ? 10 * PIECE_VALUE[m.captured.toLowerCase()] : 0) +
        (m.promo ? 800 : 0),
    }))
    .sort((a, b) => b.s - a.s)
    .map((x) => x.m)
}

function negamax(state, depth, alpha, beta, ctx) {
  if (ctx.nodes++ % 700 === 0 && Date.now() > ctx.deadline) throw ABORT

  if (depth === 0) {
    const base = evaluate(state)
    return state.turn === WHITE ? base : -base
  }

  const moves = legalMoves(state)
  if (moves.length === 0) {
    return inCheck(state) ? -100000 + (10 - depth) : 0
  }

  let best = -Infinity
  for (const move of orderMoves(moves)) {
    const score = -negamax(applyMove(state, move), depth - 1, -beta, -alpha, ctx)
    if (score > best) best = score
    if (best > alpha) alpha = best
    if (alpha >= beta) break
  }
  return best
}

/** Search one depth level; returns equally good moves to pick from. */
function searchRoot(state, depth, deadline) {
  const ctx = { deadline, nodes: 0 }
  let bestRaw = -Infinity
  let alpha = -Infinity
  const bucket = []

  for (const move of orderMoves(legalMoves(state))) {
    const raw = -negamax(applyMove(state, move), depth - 1, -Infinity, -alpha, ctx)
    if (raw > bestRaw + 0.001) {
      bestRaw = raw
      bucket.length = 0
      bucket.push(move)
      if (bestRaw > alpha) alpha = bestRaw
    } else if (Math.abs(raw - bestRaw) <= 0.001) {
      bucket.push(move)
    }
  }

  if (!bucket.length) return null
  return bucket[Math.floor(Math.random() * bucket.length)]
}

/**
 * Pick a move for the side to play: iterative deepening up to `depth`
 * plies, capped at `timeMs` so the UI never freezes for long.
 */
export function chooseMove(state, depth = 3, timeMs = 700) {
  const moves = legalMoves(state)
  if (!moves.length) return null

  const deadline = Date.now() + timeMs
  let picked = null

  for (let d = 1; d <= depth; d++) {
    try {
      const found = searchRoot(state, d, deadline)
      if (found) picked = found
    } catch (error) {
      if (error === ABORT) break
      throw error
    }
    if (Date.now() > deadline) break
  }

  return picked || moves[Math.floor(Math.random() * moves.length)]
}
