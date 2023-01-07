// /controllers/api/exercises

const Exercise = require('../../models/exercise')

module.exports = {
    create,
    indexComplete,
    indexNotComplete,
    show,
    update,
    destroy,
    jsonExercises,
    jsonExercise
}


// jsonExercises, jsonExercise

function jsonExercise (req, res){
    res.json(res.locals.data.exercise)
}

function jsonExercises (req, res){
    res.json(res.locals.data.exercises)
}


// create
async function create(req, res, next){
    try {
        const exercise = await Exercise.create(req.body)
        console.log(exercise)
        res.locals.data.exercise = exercise
        next()
    } catch (error) {
        res.status(400).json({ msg: error.message })        
    }
}


// read - index, show
async function indexComplete(req, res, next){
    try {
        const exercises = await Exercise.find({ completed: true })
        res.locals.data.exercises = exercises
        next()
    } catch (error) {
        res.status(400).json({ msg: error.message })       
    }
}

async function indexNotComplete(req, res, next){
    try {
        const exercises = await Exercise.find({ completed: true })
        res.locals.data.exercises = exercises
        next()
    } catch (error) {
        res.status(400).json({ msg: error.message })       
    }
}

async function show(req, res, next){
    try {
        const exercise = await Exercise.findById(req.params.id)
        res.locals.data.exercise = exercise
        next()
    } catch (error) {
        res.status(400).json({ msg: error.message })       
    }
}



// update

async function update(req, res, next){
    try {
        const exercise = await Exercise.findByIdAndUpdate(req.params.id, req.body, { new : true })
        res.locals.data.exercise = exercise
        next()
    } catch (error) {
        res.status(400).json({ msg: error.message })       
    }
}


// destroy

async function destroy(req, res, next){
    try {
        const exercise = await Exercise.findByIdAndDelete(req.params.id)
        res.locals.data.exercise = exercise
        next()
    } catch (error) {
        res.status(400).json({ msg: error.message })       
    }
}