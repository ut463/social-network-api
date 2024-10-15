const router = require('express').Router();
const apiRoutes = require('./apiRoutes');

router.use('/api', apiRoutes);

router.use((req,res) =>{
    returnres.status(404),send('wrong route');
});

module.exports = router;
