import React from 'react'
import './styles.scss'
import { BoardList } from '../board-list'

const App: React.FC = () => {
  return (
    <main className="app">
      <h2 className="app-title">Trello-clone</h2>
      <BoardList />
    </main>
  )
}

export default App
