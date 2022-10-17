import React from 'react'
import './styles.scss'
import { BoardList } from '../board-list'
import picture from '../../assets/picture.jpg'
import { Modal } from '../modal'
import { useActions, useAppSelector } from '../../store'
import { TaskModal } from '../task-modal'

const App: React.FC = () => {
  const { task } = useAppSelector((state) => state.modals)
  const { closeTask } = useActions()

  return (
    <section className="app" style={{ background: `url(${picture}) 0 0/100% 100% no-repeat`}}>
      <header className="app-header">
        <h2>Trello-clone</h2>
      </header>
      <main className="app-main">
        <BoardList />
      </main>
      <Modal open={!!task} onClose={closeTask}><TaskModal onClose={closeTask} /></Modal>
    </section>
  )
}

export default App
