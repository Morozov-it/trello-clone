import React from 'react'
import './styles.scss'
import { BoardList } from '../board-list'
import picture from '../../assets/picture.jpg'

const App: React.FC = () => {
  return (
    <section className="app" style={{ background: `url(${picture}) 0 0/100% 100% no-repeat`}}>
      <header className="app-header">
        <h2>Trello-clone</h2>
      </header>
      <main className="app-main">
        <BoardList />
      </main>
    </section>
  )
}

export default App
