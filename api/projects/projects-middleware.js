// add middlewares here related to projects
const Projects = require('../projects/projects-model');


function validateProjectId(req, res, next) {
    Projects.get(req.params.id)
        .then(project => {
            if(project) {
                req.existingProject = project;
                next();
            } else {
                res.status(404).json({ message: 'project not found' })
            }
        })
}

function validateProject(req, res, next) {
    if( typeof req.body.name != 'string' 
        || req.body.name.trim() == '' 
        || typeof req.body.description != 'string' 
        || req.body.description.trim() == ''
        || typeof req.body.completed != 'boolean') {
        res.status(400).json({ message: 'missing required fields' })
        return;
    }
    req.project = { name: req.body.name.trim(), description: req.body.description.trim(), completed: req.body.completed }
    next()
}


module.exports = {
    validateProjectId,
    validateProject
};