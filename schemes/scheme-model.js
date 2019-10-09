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


// add(scheme):
// Expects a scheme object.
// Inserts scheme into the database.
// Resolves to the newly inserted scheme, including id.

function add(scheme) {

    return db('schemes').insert(scheme)
    .then(scheme => {
        return scheme[0];
    })
}


// update(changes, id):
// Expects a changes object and an id.
// Updates the scheme with the given id.
// Resolves to the newly updated scheme object.

function update(changes, id) {
    return db('scheme')
    .where({id: id})
    .update(changes)
        

    .then(update => {
        return update;
    })
};


// remove(id):
// Removes the scheme object with the provided id.
// Resolves to the removed scheme
// Resolves to null on an invalid id.
// (Hint: Only worry about removing the scheme. 
// The database is configured to automatically remove all associated steps.)

function remove(id){
    return db('schemes')
    .where({id: id})
    .delete()
    .then(del => {
        return del;
    })
}



module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove
    
}