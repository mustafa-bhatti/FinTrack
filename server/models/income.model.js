import mongoose from 'mongoose';

let incomeSchema = mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  inc_date: {
    type: String,
    required: true,
  },
  inc_value: {
    type: String,
    default: 0,
  },
  inc_source: {
    type: String,
    required: true,
  },
  inc_location: {
    type: String,
    required: true,
  },
});

const incomeModel = mongoose.model('income', incomeSchema);
export default incomeModel;
