import { useState } from 'react'
import './App.css'
import Form from './components/Form'
import Task from './components/Task'

function App() {

  const [open, setOpen] = useState(false)
  const [getId, setGetId] = useState(null)

  return (
    <div className='app'>
      <div className='container'>
        <Task setOpen={setOpen} setGetId={setGetId}/>
        <Form setOpen={setOpen} open={open} getId={getId} setGetId={setGetId}/>
      </div>
    </div>
  )
}

export default App
