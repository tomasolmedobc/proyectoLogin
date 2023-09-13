const expres = require('express');
const router = expres.Router('');

router.get('/contacto', (req,res) =>{
    res.send('Contacto');
})

module.exports = router;