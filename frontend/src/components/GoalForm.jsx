import { useEffect } from 'react'
import { useState } from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { createGoal, updateGoal } from '../features/goals/goalSlice'
import { Form } from 'react-bootstrap'
import { toast } from 'react-toastify'

function GoalForm({ newGoal, setUpdateGoal }) {
  const [text, setText] = useState('')

  const dispatch = useDispatch()

  useEffect(() => {
    newGoal && setText(newGoal.text)
  }, [newGoal])

  const onSubmit = (e) => {
    e.preventDefault()

    if (newGoal) {
      dispatch(updateGoal({ ...newGoal, text: text }))
      setUpdateGoal(null)
      toast.success('Goal Updated')
    } else {
      dispatch(createGoal({ text }))
      toast.success('Goal Created')
    }
    setText('')
  }

  return (
    <section className='col-md-5 my-4 p-5 shadow'>
      <Form onSubmit={onSubmit}>
        <Form.Group className='my-3'>
          <Form.Label htmlFor='text' className='text-center fs-4'>
            Enter Goal
          </Form.Label>
          <Form.Control
            type='text'
            name='text'
            id='text'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </Form.Group>
        <Button variant='dark' type='submit'>
          {newGoal ? 'Update Goal' : 'Add Goal'}
        </Button>
      </Form>
    </section>
  )
}

export default GoalForm
