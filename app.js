let player1Authority = 50
let player2Authority = 50
let player1Score = 0
let player2Score = 0
let gameHistory = []
let gameOver = false
let tableMode = false

const STARTING_AUTHORITY = 50

function init() {
    loadState()
    updateDisplay()
    updateScore()
    renderHistory()
    
    document.getElementById('name1').addEventListener('change', saveState)
    document.getElementById('name2').addEventListener('change', saveState)
}

function changeAuthority(player, amount) {
    if (gameOver && amount < 0) return
    
    const name = player === 1 
        ? document.getElementById('name1').value 
        : document.getElementById('name2').value
    
    if (player === 1) {
        player1Authority = Math.max(0, player1Authority + amount)
        updateAuthorityDisplay(1)
        
        if (amount < 0) {
            addHistory(`${name}: ${amount}`, 1)
        } else {
            addHistory(`${name}: +${amount}`, 1)
        }
        
        if (player1Authority <= 0) {
            endGame(2)
        }
    } else {
        player2Authority = Math.max(0, player2Authority + amount)
        updateAuthorityDisplay(2)
        
        if (amount < 0) {
            addHistory(`${name}: ${amount}`, 2)
        } else {
            addHistory(`${name}: +${amount}`, 2)
        }
        
        if (player2Authority <= 0) {
            endGame(1)
        }
    }
    
    saveState()
}

function updateAuthorityDisplay(player) {
    const element = document.getElementById(`authority${player}`)
    const value = player === 1 ? player1Authority : player2Authority
    
    element.textContent = value
    element.classList.remove('warning', 'danger')
    
    if (value <= 10) {
        element.classList.add('danger')
    } else if (value <= 20) {
        element.classList.add('warning')
    }
}

function updateDisplay() {
    updateAuthorityDisplay(1)
    updateAuthorityDisplay(2)
}

function updateScore() {
    document.getElementById('score1').textContent = player1Score
    document.getElementById('score2').textContent = player2Score
}

function endGame(winner) {
    gameOver = true
    const winnerName = winner === 1 
        ? document.getElementById('name1').value 
        : document.getElementById('name2').value
    
    if (winner === 1) {
        player1Score++
        document.getElementById('player1').classList.add('defeated')
    } else {
        player2Score++
        document.getElementById('player2').classList.add('defeated')
    }
    
    updateScore()
    addHistory(`${winnerName} wins!`, winner)
    showVictory(winnerName)
    saveState()
}

function showVictory(winnerName) {
    const overlay = document.getElementById('victoryOverlay')
    const text = document.getElementById('victoryText')
    text.textContent = `${winnerName} Wins!`
    overlay.classList.add('show')
}

function closeVictory() {
    document.getElementById('victoryOverlay').classList.remove('show')
}

function closeVictoryAndReset() {
    closeVictory()
    resetGame()
}

function resetGame() {
    player1Authority = STARTING_AUTHORITY
    player2Authority = STARTING_AUTHORITY
    gameOver = false
    
    document.getElementById('player1').classList.remove('defeated')
    document.getElementById('player2').classList.remove('defeated')
    
    updateDisplay()
    addHistory('--- New Game ---', 0)
    saveState()
}

function resetScore() {
    player1Score = 0
    player2Score = 0
    updateScore()
    saveState()
}

function toggleTableMode() {
    tableMode = !tableMode
    document.body.classList.toggle('table-mode', tableMode)
    document.getElementById('tableModeBtn').classList.toggle('active', tableMode)
    saveState()
}

function toggleMenu() {
    const menu = document.getElementById('menuPanel')
    menu.classList.toggle('show')
}

function addHistory(message, player) {
    const item = {
        message,
        player,
        time: new Date().toLocaleTimeString()
    }
    gameHistory.unshift(item)
    
    if (gameHistory.length > 30) {
        gameHistory.pop()
    }
    
    renderHistory()
    saveState()
}

function renderHistory() {
    const list = document.getElementById('historyList')
    list.innerHTML = gameHistory.map(item => `
        <div class="history-item ${item.player === 1 ? 'player-1-action' : item.player === 2 ? 'player-2-action' : ''}">
            <span>${item.message}</span>
            <span>${item.time}</span>
        </div>
    `).join('')
}

function saveState() {
    const state = {
        player1Authority,
        player2Authority,
        player1Score,
        player2Score,
        player1Name: document.getElementById('name1').value,
        player2Name: document.getElementById('name2').value,
        gameHistory,
        gameOver,
        tableMode
    }
    localStorage.setItem('starRealmsTracker', JSON.stringify(state))
}

function loadState() {
    const saved = localStorage.getItem('starRealmsTracker')
    if (saved) {
        try {
            const state = JSON.parse(saved)
            player1Authority = state.player1Authority ?? STARTING_AUTHORITY
            player2Authority = state.player2Authority ?? STARTING_AUTHORITY
            player1Score = state.player1Score ?? 0
            player2Score = state.player2Score ?? 0
            gameHistory = state.gameHistory ?? []
            gameOver = state.gameOver ?? false
            tableMode = state.tableMode ?? false
            
            if (state.player1Name) document.getElementById('name1').value = state.player1Name
            if (state.player2Name) document.getElementById('name2').value = state.player2Name
            
            if (tableMode) {
                document.body.classList.add('table-mode')
                document.getElementById('tableModeBtn').classList.add('active')
            }
        } catch (e) {
            console.error('Failed to load saved state:', e)
        }
    }
}

document.addEventListener('DOMContentLoaded', init)
