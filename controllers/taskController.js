const Task = require("../models/Task.js");

// Index controller
exports.index = async (req, res) => {
    const lang = req.cookies.lang || "en";
    iconsArray = ['airplane.png', 'chat.png', 'checkmark.png', 'home.png', 'key.png', 'mail.png', 'phone.png', 'pin.png',
     'question-mark.png', 'upload.png', 'us-dollar.png','x-mark.png'];
    try {
        if (req.session.user) {
            const userTasks = await Task.find({ user: req.session.user._id });
            if (lang === "en") {
                res.render('en/index', { user: req.session.user, tasks: userTasks, trimDeadline, icons: iconsArray });
            } else {
                res.render('ru/index', { user: req.session.user, tasks: userTasks, trimDeadline, icons: iconsArray });
            }
            
        } else {
            if (lang === "en") {
                res.render('en/index', { user: null, tasks: [], trimDeadline, icons: iconsArray});
            } else { 
                res.render('ru/index', { user: null, tasks: [], trimDeadline, icons: iconsArray});
            }
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

        const { description, deadline_date, deadline_time, selectedIcon1, selectedIcon2, selectedIcon3 } = req.body;

        // Concatenate date and time into one datetime string
        const deadline = `${deadline_date} ${deadline_time}`;

        // Create a new Date object from the deadline string
        let deadlineDateTime = new Date(deadline);

        // Subtract 5 hours from the deadline
        deadlineDateTime.setHours(deadlineDateTime.getHours() - 5);

        // Create a new task with the adjusted deadline
        const newTask = new Task({
            description: description,
            deadline: deadlineDateTime,
            status: 'not_completed', // Default status is not completed
            icons: [selectedIcon1, selectedIcon2, selectedIcon3],
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
    // Convert the deadline string to a Date object
    const deadline = new Date(deadlineString);
    console.log(deadline);
    // Return the trimmed deadline in the desired format
    return deadline.toLocaleString('en-US', { timeZone: 'Asia/Yekaterinburg', timeZoneName: 'short' });
}




