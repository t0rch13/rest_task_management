const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    description: String,
    status: String,
    deadline: Date,
    completed_at: Date,
    icons: [String], 
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

const Task = mongoose.model("Task", TaskSchema);

module.exports =  Task ;
