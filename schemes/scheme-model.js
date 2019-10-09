// Write helpers methods in ./schemes/scheme-model.js 

const db = require('../data/db-config.js');

// find():
// Calling find returns a promise that resolves to an array of all 
// schemes in the database. No steps are included.

function find() {
    return db('schemes')
    .select()
    .then(schemes => {
        return schemes;
    })
};

// findById(id):
// Expects a scheme id as its only parameter.
// Resolve to a single scheme object.
// On an invalid id, resolves to null.

function findById() {
    return db('schemes')
    .where({id: id})
    // .first so we dont have to use res[0]
    .first()
    .then(res => {

        if (res) {

            return res;

        } else {

            return null;
        }
    })
};


// findSteps(id):
// Expects a scheme id.
// Resolves to an array of all correctly ordered steps for the given 
// scheme: [ { id: 17, scheme_name: 'Find the Holy Grail', step_number: 1, 
// instructions: 'quest'}, { id: 18, scheme_name: 'Find the Holy Grail', 
// step_number: 2, instructions: '...and quest'}, etc. ].
// This array should include the scheme_name not the scheme_id.

function findSteps(id) {
    return db('steps')
    .select('scheme_name', 'step_number', 'instructions')
    .from('steps')

    .join('schemes', 'scheme_id', '=', 'steps.scheme_id')
    .where({scheme_id : id})

    .then(res => {
        if (res) {
            return res;
        } else {
             return null;
        }
    });
}




module.exports = {
    find,
    findById,
    findSteps
}