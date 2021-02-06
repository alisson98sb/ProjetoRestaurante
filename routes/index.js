var conn = require('./../inc/db');
var express = require('express');
var menus = require('./../inc/menus');
var reservations = require('./../inc/reservations');
var contacts = require('./../inc/contacts');
const { save } = require('./../inc/reservations');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  menus.getMenus().then(results => {
    res.render('index', { 
      title: 'Saboroso :)',
      menus: results,
      isHome: true
    });
  })   
    
});


router.get('/menus', function(req, res, next){


  menus.getMenus().then(results => {

    res.render('menus',{
      title: 'Menu - Restaurante Saboroso :)',
      background: 'images/img_bg_1.jpg',
      h1: 'Saboreie nosso menu!',
      menus: results
    });
  });


});

router.get('/services', function(req, res, next){
  res.render('services',{
    title: 'Serviços - Restaurante Saboroso :)',
    background: 'images/img_bg_1.jpg',
    h1: ' um prazer poder servir!'
  })
})

router.get('/contacts', function(req, res, next){
  contacts.render(req, res);
})

router.post('/contacts', function(req, res, next){

  if (!req.body.name){
    contacts.render(req, res, "Digite o nome")
  } else if(!req.body.email){
    contacts.render(req, res, "Digite o Email")
  } else if(!req.body.message) {
    contacts.render(req, res, "Digite a menssagem")
  } else {
    contacts.save(req.body).then(results => {
      
      req.body = {};

      contacts.render(req, res, null, "Contato enviado com sucesso!");
    }).catch(err => {
      contacts.render(req, ress, err.menssage);
    })
  }
})

router.get('/reservations', function(req, res, next){
  reservations.render(req, res);
});

router.post('/reservations', function(req, res, next){
  if(!req.body.name) {
    reservations.render(req, res, "Digite o nome");
  } else if(!req.body.email) {
    reservations.render(req, res, "Digite o email");
  } else if (!req.body.people){
    reservations.render(req, res, "Defina a quantidade de pessoas");
  } else if (!req.body.date) {
    reservations.render(req, res, "Defina uma data");
  } else if (!req.body.time) {
    reservations.render(req, res, "Defina um horario");
  } else {

    reservations.save(req.body).then(results => {

      req.body = {};
      reservations.render(req, res, null, "Reserva realizada com sucesso!");
    
    }).catch(err=>{
      reservations.render(req, res, err.message);
    });
  
  }
});



module.exports = router;
