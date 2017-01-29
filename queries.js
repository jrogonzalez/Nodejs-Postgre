var promise = require('bluebird');

var options = {
    // Initialization Options
    promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/got';
var db = pgp(connectionString);

// add query functions

function getAllCharacters(req, res, next) {
    db.any('select * from gotCharacter')
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved ALL puppies'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function getSingleCharacter(req, res, next) {
    var gotID = parseInt(req.params.id);
    db.one('select * from gotCharacter where id = $1', gotID)
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved ONE got Character'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function createCharacter(req, res, next) {
    req.body.age = parseInt(req.body.age);
    db.none('insert into gotCharacter(name, family, age, sex)' +
            'values(${name}, ${family}, ${age}, ${sex})',
        req.body)
        .then(function () {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Inserted one Got Character'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function updateCharacter(req, res, next) {
    db.none('update gotCharacter set name=$1, family=$2, age=$3, sex=$4 where id=$5',
        [req.body.name, req.body.family, parseInt(req.body.age),
            req.body.sex, parseInt(req.params.id)])
        .then(function () {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Updated Got Character'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function removeCharacter(req, res, next) {
    var gotID = parseInt(req.params.id);
    db.result('delete from gotCharacter where id = $1', gotID)
        .then(function (result) {
            /* jshint ignore:start */
            res.status(200)
                .json({
                    status: 'success',
                    message: `Removed ${result.rowCount} Got Character`
                });
            /* jshint ignore:end */
        })
        .catch(function (err) {
            return next(err);
        });
}

module.exports = {
    getAllCharacters: getAllCharacters,
    getSingleCharacter: getSingleCharacter,
    createCharacter: createCharacter,
    updateCharacter: updateCharacter,
    removeCharacter: removeCharacter    
};