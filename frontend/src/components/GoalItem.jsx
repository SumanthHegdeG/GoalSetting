import { Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { deleteGoal } from '../features/goals/goalSlice'
import { RiDeleteBin2Fill, RiEdit2Fill } from 'react-icons/ri'
import { toast } from 'react-toastify'

function GoalItem({ goal, setUpdateGoal }) {
  const dispatch = useDispatch()

  return (
    <div className='d-flex justify-content-between p-3 rounded-3 shadow border m-2'>
      <div>
        <p>{new Date(goal.updatedAt).toLocaleString('en-US')}</p>
        <h2>{goal.text}</h2>
      </div>

      <div className='d-flex flex-column gap-4'>
        <Button
          className='rounded-circle p-0 px-1  border-2'
          variant='outline-danger'
          onClick={() => {
            dispatch(deleteGoal(goal._id))
            toast.success('goal Deleted')
          }}
        >
          <RiDeleteBin2Fill />
        </Button>
        <Button
          className='rounded-circle p-0 px-1  border-2'
          variant='outline-success'
          onClick={() => setUpdateGoal(goal)}
        >
          <RiEdit2Fill />
        </Button>
      </div>
    </div>
  )
}

export default GoalItem
