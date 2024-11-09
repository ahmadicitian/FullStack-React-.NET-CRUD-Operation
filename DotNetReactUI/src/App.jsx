import React from 'react'
import StudentList from './components/StudentList'
import StudentForm from './components/StudentForm'

const App = () => {
  return (
    <>
      <div className="text-center py-10 text-2xl text-blue-500">
        Hello, Tailwind CSS!
      </div>
      <StudentList />
    </>
  )
}

export default App