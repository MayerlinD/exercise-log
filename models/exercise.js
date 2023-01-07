const { model, Schema } = require('mongoose')

const exerciseSchema = new Schema({
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    date: { type: Date, required: true },
  }, {
    timestamps: true,
  });

const Exercise = model('Exercise', exerciseSchema)

module.exports = Exercise;