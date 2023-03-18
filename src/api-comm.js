function harness(path, opts) {
    return fetch(`http://localhost:5000/${path}`, {
        headers: {'Content-Type': 'application/json'},
        ...opts,
    })
    .then(response => response.json())
    .then(({res}) => res)
    .catch(err => console.log(err))
}

export function getAllGames() {
    return harness('games')
}

export function createGame() {
    return harness("game",
        {method: 'POST',
        body: JSON.stringify({history: [Array(9).fill(0)]})}
    )
}

export function getGame(id) {
    return harness(`game/${id}`)
}

export function deleteGame(id) {
    return harness(`game/${id}`,
        {method: 'DELETE'}
    )
}

export function updateHistory(id, history) {
    return harness(`game/${id}`,
      {method: "PUT",
      body: JSON.stringify({history: JSON.stringify(history)})}
    )
}