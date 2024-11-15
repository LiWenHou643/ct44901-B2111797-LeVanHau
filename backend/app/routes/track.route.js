const express = require('express');
const tracks = require('../controllers/track.controller');

const router = express.Router();

router
    .route('/')
    .get(tracks.findAll)
    .post(tracks.create)
    .delete(tracks.deleteAll);

router.route('/:id').put(tracks.update).delete(tracks.delete);

module.exports = router;
