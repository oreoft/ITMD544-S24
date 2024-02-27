var express = require('express');
var router = express.Router();
const contactsRepo = require('../src/contactsRepository');

router.get('/', function (req, res, next) {
    contactsRepo.findAll()
        .then(data => res.json(data))

});

router.post('/add', function (req, res, next) {
    let msgs = []
    msgs.push(checkFieldIsEmpty(req.body.firstName, "firstName"))
    msgs.push(checkFieldIsEmpty(req.body.lastName, "lastName"))
    msgs = msgs.filter(e => e)
    if (msgs.length > 0) {
        res.json({msgs: msgs, status: false});
    } else {
        contactsRepo.create(req.body);
        res.json({status: true});
    }
});

router.get('/:uuid', function (req, res, next) {
    contactsRepo.findById(req.params.uuid)
        .then(contact => {
            res.json({contact: contact});
        })
});

router.post('/:uuid/delete', function (req, res, next) {
    contactsRepo.deleteById(req.params.uuid);
    res.json({status: true});
});

router.post('/:uuid/edit', function (req, res, next) {
    let msgs = []
    msgs.push(checkFieldIsEmpty(req.body.firstName, "firstName"))
    msgs.push(checkFieldIsEmpty(req.body.lastName, "lastName"))
    msgs = msgs.filter(e => e)
    if (msgs.length > 0) {
        const contact = contactsRepo.findById(req.params.uuid)
            .then(contact => res.json({msgs: msgs, status: false}));
    } else {
        req.body.id = req.params.uuid
        req.body.lastEdited = new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()
        contactsRepo.update(req.body);
        res.json({status: true});
    }
});

function checkFieldIsEmpty(field, fieldName) {
    if (field.trim() === '') {
        return `Contact ${fieldName} can not be empty!`
    }
}


module.exports = router;
