///////////////////////////////////////////////////////////////////////////
//player 1//
let player1_Name = document.getElementById("player1_name").value;
let health1 = document.getElementById("health1");
let player1_health = document.getElementById("player1_health").value;
let mana1 = document.getElementById("mana1");
let player1_mana = document.getElementById("player1_mana").value;
let player1_attack = document.getElementById("player1_attack").value;
let player1_defense = document.getElementById("player1_defense").value;
let player1_accuracy = document.getElementById("layer1_accuracy").value;
let player1_stance = document.getElementById("player1_stance").value;
//audio
var hero_start = new Audio("./voice/hero/start.wav");
var hero_win = new Audio("./voice/hero/win.wav");
var hero_lose = new Audio("./voice/hero/lose.wav");
var hero_attack1 = new Audio("./voice/hero/attack1.wav");
var hero_attack2 = new Audio("./voice/hero/attack2.wav");
var hero_damage = new Audio("./voice/hero/damage.wav");

//player 2//
let player2_Name = document.getElementById("monster_name").value;
let health2 = document.getElementById("health2");
let player2_health = document.getElementById("monster_health").value;
let player2_attack = document.getElementById("monster_attack").value;
let player2_defense = document.getElementById("monster_defense").value;
let player2_accuracy = document.getElementById("monster_accuracy").value;
//audio
var villian_start = new Audio("./voice/villian/start.wav");
var villian_win = new Audio("./voice/villian/win.wav");
var villian_dead = new Audio("./voice/villian/dead.wav");
var villian_attack1 = new Audio("./voice/villian/attack1.wav");
var villian_attack2 = new Audio("./voice/villian/attack2.wav");
// var hero_damage = new Audio("./voice/hero/damage.wav");

var battleOST = new Audio("./voice/bgm/FFXIV OST - Lakshmis Theme.mp3");

//Player1 Skill
function skill_key_o() {
  return (health2.value -= 20), (mana1.value -= 20);
}

function skill_key_p() {
  return (health2.value -= 35), (mana1.value -= 35);
}

function skill_key_k() {
  return (health2.value -= 50), (mana1.value -= 60);
}

function skill_key_l() {
  return (health2.value -= 110), (mana1.value -= 120);
}


//Press to Commence Battle//
function engage() {
    villian_start.play();

  battleOST.play();
//   hero_start.play();

  document.onkeydown = function(e) {
    if (e.ctrlKey && e.which == 79) {
      if (mana1.value < 20) {
        return (health2.value -= 0);
      } else {
        $("#animationMonster1").animate({ left: "50px" }, 100, function() {
          skill_key_o();
          hero_attack2.play();
          $("#animationMonster1").animate({ left: "1px" });
        });
      }
    }

    if (e.ctrlKey && e.which == 80) {
      let cooldown = false;

      // if (mana1.value < 35) {
      //   return (health2.value -= 0);
      // } else {
      // }

      if (!cooldown) {
        $("#animationMonster1").animate({ left: "50px" }, 100, function() {
          skill_key_p();
          hero_attack1.play();
          $("#animationMonster1").animate({ left: "1px" });
        });

        setTimeout(function() {
          return (cooldown = false);
        }, 3000);
      }
    }

    if (e.ctrlKey && e.which == 76) {
      if (mana1.value < 60) {
        return (health2.value -= 0);
      } else {
        $("#animationMonster1").animate({ left: "50px" }, 100, function() {
          skill_key_k();
          hero_attack1.play();

          $("#animationMonster1").animate({ left: "1px" });
        });
      }
    }
    if (e.ctrlKey && e.which == 75) {
      if (mana1.value < 120) {
        return (health2.value -= 0);
      } else {
        $("#animationMonster1").animate({ left: "50px" }, 100, function() {
          skill_key_l();
          hero_attack2.play();

          $("#animationMonster1").animate({ left: "1px" });
        });
      }
    }
  };

  // Each milisecond is damage by each side has done//
  var interval = setInterval(function battle() {
    function dpsPlayer1() {
      return player1_attack * (100 / (100 + player2_defense));
    }

    function dpsPlayer2() {
      return player2_attack * (100 / (100 + player1_defense));
    }

    function calculateDamage_1() {
      return (health2.value -= dpsPlayer1()), (mana1.value += 0.1);
    }

    function calculateDamage_2() {
      return (health1.value -= dpsPlayer2());
    }

    if (health2.value > 0) {
      calculateDamage_1();
    }

    if (health1.value > 0) {
      calculateDamage_2();
    }

    if (health2.value <= 0) {
      clearInterval(interval);

      $(document).ready(function() {
        $("#animationMonster2").fadeOut(1000);
      });
    } else if (health1.value <= 0) {
      hero_lose.play();
      clearInterval(interval);
      $("#animationMonster1").fadeOut(1000);
    }
  }, 5);

  let bossAI = setInterval(function() {
    if (health1.value <= 0 || health2.value <= 0) {
      $(document).ready(function() {
        clearInterval(bossAI);
      });
    }

    function bossAttackPattern() {
      return Math.ceil(Math.random() * 6);
    }
    console.log(bossAttackPattern());

    function skirmish(bossAttack) {
      if (bossAttack >= 5) {
        console.log(`skirmish==>`, bossAttack);

        $("#animationMonster2").animate({ left: "-50px" }, 100, function() {
          villian_attack1.play();
          $("#animationMonster2").animate({ left: "1px" });
        });
        return (health1.value -= 100);
      } else {
        return (health1.value -= 0);
      }
    }

    function saltedEarth(bossAttack) {
      if (bossAttack < 3) {
        console.log(`salted earth==>`, bossAttack);

        $("#animationMonster2").animate({ left: "-50px" }, 100, function() {
          villian_attack2.play();
          $("#animationMonster2").animate({ left: "1px" });
        });
        return (health1.value -= 500);
      } else {
        return (health1.value -= 0);
      }
    }

    skirmish(bossAttackPattern());
    saltedEarth(bossAttackPattern());
    // carveAndSplit(bossAttackPattern());
  }, 3500);
}

//////////////////////////////////////////////////////////
