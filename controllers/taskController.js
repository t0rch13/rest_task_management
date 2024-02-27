const Task = require("../models/Task.js");

// Index controller
exports.index = async (req, res) => {
    const lang = req.cookies.lang || "en";
    try {
        if (req.session.user) {
            const userTasks = await Task.find({ user: req.session.user._id });
            res.render('index', { user: req.session.user, tasks: userTasks, lang, trimDeadline });
        } else {

            res.render('index', { user: null, tasks: [], lang, trimDeadline });
        }
    } catch (error) {
        console.error('Error in index controller:', error);
    }
};
  
// Add task controller
exports.add = async (req, res) => {
    try {
        if (!req.session.user) {
            return res.redirect('/login');
        }

        const { description, deadline_date, deadline_time } = req.body;

        // Concatenate date and time into one datetime string
        const deadline = `${deadline_date} ${deadline_time}`;

        // Create a new task
        const newTask = new Task({
            description: description,
            deadline: deadline,
            status: 'not_completed', // Default status is not completed
            user: req.session.user._id 
        });

        await newTask.save();

        res.redirect('/');
    } catch (error) {
        console.error('Error in add controller:', error);
        res.render('error', { error });
    }
};

// Complete task controller
exports.complete = async (req, res) => {
    try {
        // Find the task by ID and update its status to "completed"
        const task = await Task.findByIdAndUpdate(req.params.id, { status: 'completed' }, { new: true });

        if (task) {
            res.redirect('/');
        } else {
            res.status(404).json({ error: 'Task not found' });
        }
    } catch (error) {
        console.error('Error completing task:', error);
        res.status(500).json({ error: 'There was an error completing the task' });
    }
};

exports.delete = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (task) {
            res.redirect('/');
        } else {
            res.status(404).json({ error: 'Task not found' });
        }
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ error: 'There was an error deleting the task' });
    }
}

//Util function to trim deadline
function trimDeadline(deadlineString) {
    const deadline = new Date(deadlineString);
    return deadline.toLocaleString('en-US', { timeZone: 'Asia/Almaty', timeZoneName: 'short' });
}


