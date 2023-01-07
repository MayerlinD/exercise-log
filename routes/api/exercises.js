const express = require('express')
const router = express.Router()
const exerciseCtrl = require('../../controllers/api/exercises')


// Index /api/exercises
router.get('/', exerciseCtrl.indexNotComplete, exerciseCtrl.jsonExercises)
// Index /api/exercises/completed
router.get('/completed', exerciseCtrl.indexComplete, exerciseCtrl.jsonExercises)
// Delete /api/exercises/:id
router.delete('/:id', exerciseCtrl.destroy, exerciseCtrl.jsonExercise)
// Update /api/exercises/:id
router.put('/:id', exerciseCtrl.update, exerciseCtrl.jsonExercise)
// Create /api/exercises
router.post('/', exerciseCtrl.create, exerciseCtrl.jsonExercise)
// Show /api/exercises/:id
router.get('/:id', exerciseCtrl.show, exerciseCtrl.jsonExercise)

module.exports = router

// const express = require('express')
// const router = express.Router()
// const { dataController, apiController } = require('../../controllers/api/exercises')

// // add routes
// // Index /api/exercises
// router.get('/', dataController.index, apiController.index)
// // Delete /api/exercises/:id
// router.delete('/:id', dataController.destroy, apiController.show)
// // Update /api/exercises/:id
// router.put('/:id', dataController.update, apiController.show)
// // Create /api/exercises
// router.post('/', dataController.create, apiController.show)
// // Show /api/exercises/:id
// router.get('/:id', dataController.show, apiController.show)


module.exports = router