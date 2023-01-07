import { useState, useEffect } from 'react';


export default function ExercisePage(props){

    const [exercises, setExercises] = useState([])
    const [completedExercises, setCompletedExercises] = useState([])
    const [newExercise, setNewExercise] = useState({
        description: '',
        duration: '',
        date: ''
    })

    //createExercises
    const createExercise = async () => {
        const body = {...newExercise}
        try {
            const response = await fetch('/api/exercises', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })
            const createdExercise = await response.json()
            const exercisesCopy = [createdExercise,...exercises]
            setExercises(exercisesCopy)
            setNewExercise({
                description: '',
                duration: '',
                date: ''
            })
        } catch (error) {   
            console.error(error)
        }
    }
    //deleteExercises
    // const deleteExercise = async (id) => {
    //     try {
    //         const index = completedExercises.findIndex((exercise) => exercise._id === id)
    //         const completedExercisesCopy = [...completedExercises]
    //         const response = await fetch(`/api/exercises/${id}`, {
    //             method: 'DELETE',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         })
    //         await response.json()
    //         completedExercisesCopy.splice(index, 1)
    //         setCompletedExercises(completedExercisesCopy)
    //     } catch (error) {
    //         console.error(error)
    //     }
    // }
    //moveToCompleted
    const moveToCompleted = async (id) => {
        try {
            const index = exercises.findIndex((exercise) => exercise._id === id)
            const exercisesCopy = [...exercises]
            const subject = exercisesCopy[index]
            subject.completed = true 
            const response = await fetch(`/api/exercises/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(subject)
            })
            const updatedExercise = await response.json()
            const completedTDsCopy = [updatedExercise, ...completedExercises]
            setCompletedExercises(completedTDsCopy)
            exercisesCopy.splice(index, 1)
            setExercises(exercisesCopy)
        } catch (error) {
            console.error(error)
        }
    }
    //getExercises
    const getExercises = async () => {
        try{
            const response = await fetch('/api/exercises')
            const foundExercises = await response.json()
            setExercises(foundExercises.reverse())
            const responseTwo = await fetch('/api/exercises/completed')
            const foundCompletedExercises = await responseTwo.json()
            setCompletedExercises(foundCompletedExercises.reverse())
        } catch(error){
            console.error(error)
        }
    }
    useEffect(() => {
        getExercises()
    }, [])
    return(<>
        Description:<input type="text" 
        value={newExercise.description} 
        onChange={(e) => {
            setNewExercise({...newExercise, description: e.target.value})
        }} 
        onKeyDown={(e) => {
            e.key === 'Enter' && createExercise()
        }}
        />
        Duration:<input type="text" 
        value={newExercise.duration} 
        onChange={(e) => {
            setNewExercise({...newExercise, duration: e.target.value})
        }} 
        onKeyDown={(e) => {
            e.key === 'Enter' && createExercise()
        }}
        />
        Date:<input type="date" 
        value={newExercise.date} 
        onChange={(e) => {
            setNewExercise({...newExercise, date: e.target.value})
        }} 
        onKeyDown={(e) => {
            e.key === 'Enter' && createExercise()
        }}
        />
        
        
        <h3>Exercises</h3>
        {exercises.map(exercise => {
            return(
                <div key={exercise._id}>{exercise.description}<br />{exercise.duration}<br />{exercise.date}<br />
                    <button onClick={() => moveToCompleted(exercise._id) }>Delete Exercise</button>
                </div>
            )})
        }
        {/* <h3>Completed Exercises</h3>
        {completedExercises.map(exercise => {
            return(
                <div key={exercise._id}>{exercise.username}{exercise.description}{exercise.duration}{exercise.date} 
                    <button onClick={() => deleteExercise(exercise._id) }>Delete</button>
                </div>
            )})
        } */}
    </>)
}