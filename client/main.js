/* global _ */
'use strict';
$(document).ready(init);

function init() {
  playTheme();
  createFighters();
  paintFighters();
  createWeapons();
  paintWeapons();
  chooseWeapon();
  $('#weapons').on('click', 'weapon', clickWeapon);
}

var weapons = [];
var fighters = [];
var equipped = [];

function clickWeapon() {
  var name = $(this).find('.name').text();
  var weapon = _.find(weapons, function(w) {return w.name === name});
  console.log(name, weapon);

}

function playTheme() {
  $('audio').attr('src', '/audio/RE6.mp3');
  $('audio')[0].play();
}

function chooseWeapon() {
  var fighter = _.sample(fighters);
  var $fighter = $('.fighter:contains("' + fighter.name + '")');
  $fighter.addClass('choose');

}

function createFighters() {
  var f1 = new Fighter('Jake Muller', 'http://images.wikia.com/residentevil/images/5/55/RE6_Lanshiang_Jake.jpg');
  var f2 = new Fighter('Albert Wesker', 'http://vignette4.wikia.nocookie.net/residentevil/images/6/6e/Albert_Wesker_RE5.jpg/revision/latest?cb=20131220032825');
  var f3 = new Fighter('Ada Wong', 'http://vignette2.wikia.nocookie.net/residentevil/images/0/06/Ada_7.jpg/revision/latest?cb=20120703025054');
  var f4 = new Fighter('Leon Kennedy', 'https://lovelycosplay.files.wordpress.com/2013/03/re6-leon.jpg');
  var f5 = new Fighter('Las Plagas', 'http://sp6.fotolog.com/photo/6/23/33/nintendo_legend/1242489884382_f.jpg');
  var f6 = new Fighter('Jill Valentine', 'https://mognetcentral.files.wordpress.com/2009/12/jill.jpg');
  fighters.push(f1, f2, f3, f4, f5, f6);
}

function paintFighters() {
  fighters.forEach(function(fighter) {
    var $outer = $('<div>');
    $outer.addClass('fighter');

    var $img = $('<div>');
    $img.css('background-image', 'url("' + fighter.image + '")');

    var $info = $('<div>');
    var $name = $('<div>');
    $name.text(fighter.name);

    var $armor = $('<div>');
    $armor.text(fighter.armor);

    var $health = $('<div>');
    $health.text(fighter.health);

    var $strength = $('<div>');
    $strength.text('s: ' + fighter.strength);

    $outer.append($img, $info);
    $info.append($name, $armor, $health, $strength);
    $('#fighters').append($outer);

  });
}

function createWeapons() {
  var w1 = new Weapon('Hydra', 'http://vignette4.wikia.nocookie.net/residentevil/images/0/08/Hydrare6.jpg/revision/latest?cb=20121012162451');
  var w2 = new Weapon('Elephant Killer', 'http://www.polyvore.com/cgi/img-thing?.out=jpg&size=l&tid=81060725');
  var w3 = new Weapon('Semi-Rifle', 'http://gamesdreams.com/attachment.php?attachmentid=13820&d=1354033088');
  var w4 = new Weapon('Giant Destoyer', 'http://images1-1.gamewise.co/119032-large.jpeg');
  var w5 = new Weapon('Eagle Eye', 'http://images1-1.gamewise.co/119033-large.jpeg');
  var w6 = new Weapon('Sniper Rifle', 'http://images2.fanpop.com/images/polls/219000/219895_1239572800582_full.jpg');
  weapons.push(w1, w2, w3, w4, w5, w6);
}

function paintWeapons() {
  weapons.forEach(function(weapon) {
    var $outer = $('<div>');
    $outer.addClass('weapon');

    var $img = $('<div>');
    $img.css('background-image', 'url("' + weapon.image + '")');

    var $info = $('<div>');
    var $name = $('<div>');
    $name.text(weapon.name);

    var $damage = $('<div>');
    $damage.text(weapon.damage);

    $outer.append($img, $info);
    $info.append($name, $damage);
    $('#weapons').append($outer);

  });
}
