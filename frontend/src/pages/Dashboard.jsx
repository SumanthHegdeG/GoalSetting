import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import GoalForm from '../components/GoalForm'
import GoalItem from '../components/GoalItem'
import Spinner from '../components/Spinner'
import { getGoals, reset } from '../features/goals/goalSlice'
import { useState } from 'react'
import { toast } from 'react-toastify'

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { goals, isLoading, isError, message } = useSelector(
    (state) => state.goals
  )

  const [updateGoal, setUpdateGoal] = useState(null)

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/login')
    }

    dispatch(getGoals())

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <div className='d-flex justify-content-center'>
        <section className='text-center my-5 border p-3 col-lg-6 col-md-9 col-sm-12 align-self-center rounded-3 shadow'>
          <h1>Welcome {user && user.name}</h1>
          <p>Goals Dashboard</p>
        </section>
      </div>
      <hr />
      <div className='d-md-flex gap-5 justify-content-center'>
        <GoalForm newGoal={updateGoal} setUpdateGoal={setUpdateGoal} />

        <div className='col-md-7 p-3 border rounded-3'>
          <h3 className='text-center'>Your Goals</h3>
          {goals.length > 0 ? (
            <div className='goals'>
              {goals.map((goal) => (
                <GoalItem
                  key={goal._id}
                  goal={goal}
                  setUpdateGoal={setUpdateGoal}
                />
              ))}
            </div>
          ) : (
            <h3 className='text-center mt-5'>You have not set any goals</h3>
          )}
        </div>
      </div>
    </>
  )
}

export default Dashboard
