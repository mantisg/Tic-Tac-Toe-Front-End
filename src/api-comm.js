function harness(path, opts) {
    return fetch(`http://localhost:5000/${path}`, {
        headers: {'Content-Type': 'application/json'},
        ...opts,
    })
    .then(res => res.json())
    .catch(err => console.log(err))
}

export function getAppData() {
    return harness('core')
}

export function getAllGames() {
    return harness('games')
}

export function createGame() {
    return harness("games", {method: 'POST'})
}

export function getGame(id) {
    return harness(`game/${id}`)
}

export function deleteGame(id) {
    return harness(`game/${id}`,
        {method: 'DELETE'},
    )
}

export function updateHistory(id, history) {
    return harness(`game/${id}`,
      {method: "PUT",
      body: JSON.stringify({history})}
    )
}