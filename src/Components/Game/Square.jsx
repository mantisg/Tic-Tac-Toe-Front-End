export default function Square({value, onSquareClick}) {
  return (
    <button
      className="square"
      onClick={onSquareClick}
    >
      {["X", "O"].includes(value) ? value : null}
    </button>
  )
}
