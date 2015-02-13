/* global _, Weapon, Fighter */
'use strict';
$(document).ready(init);

function init() {
  playTheme();
  createFighters();
  paintFighters();
  createWeapons();
  paintWeapons();
  chooseFighter();
  $('#weapons').on('click', '.weapon:not(".picked")', clickWeapon);
  $('#fight').click(clickFight);
}

var weapons = [];
var fighters = [];
var equipped = [];
var deadFighters = [];

function playerColor() {

}

function clickFight() {
  if(equipped.length >= 2) {
    var p1 =_.sample(equipped);
    var p2;
    while(true) {
      p2 = _.sample(equipped);
      if(p2.name !== p1.name) {
        break;
      }
    }
    p1.hit(p2);
    if (p2.health > 0) {
      p2.hit(p1);
    }
    console.log(p1.health);
    console.log(p2.health);


    playerFuneral(p1);
    playerFuneral(p2);

    $('.fighter:not(".dead")').css('background-color', 'white');
    paintPlayer(p1, 'red');
    paintPlayer(p2, 'blue');

    // p1.hit(p2);
    // var $p1 = $('#' + p1.id);
    // $p1.addClass('p1');
    // p2.hit(p1);
    // var $p2 = $('#' + p2.id);
    // $p2.addClass('p2');
  }
}

function paintPlayer(player, color) {
  var $player = $('.fighter:contains("' + player.name +'")');
  $player.find('.health').text('Health: ' + player.health);

  if (player.health <= 0) {
    $player.addClass('dead');
  } else {
    $player.css('background-color', color);
  }
}

function playerFuneral(player) {
  if (player.health <= 0) {
    deadFighters.push(_.remove(equipped, function(f) {return f.name === player.name;})[0]);
  }
}

function clickWeapon() {
  var weaponName = $(this).find('.name').text();
  var weapon = _.find(weapons, function(w) {return w.name === weaponName;});
  var $fighter = $('.choose');
  var fighterName = $fighter.find('.name').text();
  var fighter = _.find(fighters, function(f) {return f.name === fighterName;});
  fighter.weapon = weapon;
  addWeaponToFighter($fighter, weapon);
  equipped.push(_.remove(fighters, function(f) {return f.name ===fighterName;})[0]);
  $(this).addClass('picked');
  $fighter.removeClass('choose');

  if(fighters.length) {
    chooseFighter();
  }

}

function playTheme() {
  $('audio').attr('src', '/audio/RE6.mp3');
  $('audio')[0].play();
}

function chooseFighter() {
  var fighter = _.sample(fighters);
  var $fighter = $('.fighter:contains("' + fighter.name + '")');
  $fighter.addClass('choose');
}

function createFighters() {
  var f1 = new Fighter(1 , 'Jake Muller', 'http://images.wikia.com/residentevil/images/5/55/RE6_Lanshiang_Jake.jpg');
  var f2 = new Fighter(2, 'Albert Wesker', 'http://vignette4.wikia.nocookie.net/residentevil/images/6/6e/Albert_Wesker_RE5.jpg/revision/latest?cb=20131220032825');
  var f3 = new Fighter(3, 'Ada Wong', 'http://vignette2.wikia.nocookie.net/residentevil/images/0/06/Ada_7.jpg/revision/latest?cb=20120703025054');
  var f4 = new Fighter(4, 'Leon Kennedy', 'https://lovelycosplay.files.wordpress.com/2013/03/re6-leon.jpg');
  var f5 = new Fighter(5, 'Las Plagas', 'http://sp6.fotolog.com/photo/6/23/33/nintendo_legend/1242489884382_f.jpg');
  var f6 = new Fighter(6, 'Jill Valentine', 'https://mognetcentral.files.wordpress.com/2009/12/jill.jpg');
  fighters.push(f1, f2, f3, f4, f5, f6);
}

function paintFighters() {
  fighters.forEach(function(fighter) {
    var $outer = $('<div>', {id: fighter.id});
    $outer.addClass('fighter');


    var $img = $('<div>');
    $img.css('background-image', 'url("' + fighter.image + '")');

    var $info = $('<div>');
    var $name = $('<div>');
    $name.text(fighter.name);
    $name.addClass('name');

    var $armor = $('<div>');
    $armor.text('Armor: ' + fighter.armor);

    var $health = $('<div>');
    $health.text('Health: ' + fighter.health);

    var $strength = $('<div>');
    $strength.text('Strength: ' + fighter.strength);

    $outer.append($img, $info);
    $info.append($name, $armor, $health, $strength);
    $('#fighters').append($outer);

  });
}

function createWeapons() {
  var w1 = new Weapon('Hydra', 'http://vignette4.wikia.nocookie.net/residentevil/images/0/08/Hydrare6.jpg/revision/latest?cb=20121012162451');
  var w2 = new Weapon('Magnum', 'http://www.polyvore.com/cgi/img-thing?.out=jpg&size=l&tid=81060725');
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
    $name.addClass('name');

    var $damage = $('<div>');
    $damage.text('Damage: ' + weapon.damage);

    $outer.append($img, $info);
    $info.append($name, $damage);
    $('#weapons').append($outer);

  });
}

function addWeaponToFighter($fighter, weapon) {
  $fighter.children().eq(1).append('<div>w: ' + weapon.name + '</div>');

}
