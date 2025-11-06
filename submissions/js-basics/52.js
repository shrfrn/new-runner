'use strict'

console.log('Ex 52 Solution');
console.log('monsters');
// reviewed ✔️

var gNextId = 100
var gMonsters = createMonsters()

console.log('gMonsters', gMonsters);
// console.log('get by id', getMonsterById(101));
updateMonster(101, 9000);
console.log('updated monsters', gMonsters);
console.log('most powerful monster', findMostPowerfulSort(gMonsters));
console.log('breeded monster', breedMonsters(101, 102));
removeMonster(103);
console.log('gMonsters after remove', gMonsters);

function createMonsters() {
    var monsters = []
    for (var i = 0; i < 4; i++) {
        var monster = createMonster(getRandomStr())
        // var monster = createMonster(prompt('monster name: '))

        monsters.push(monster)
    }
    return monsters
}

function createMonster(name = 'monster', power = 100) {
    return {
        id: gNextId++,
        name: name,
        power: power
    }
}

function getMonsterById(id) {
    for (var i = 0; i < gMonsters.length; i++) {
        if (gMonsters[i].id === id) return gMonsters[i]
    }
    return null
}

function removeMonster(id) {
    for (var i = 0; i < gMonsters.length; i++) {
        if (gMonsters[i].id === id) {
            gMonsters.splice(i, 1)
            break
        }
    }
}

function updateMonster(id, newPower) {
    var monster = getMonsterById(id)
    if (monster) monster.power = newPower
    return monster
}

function findMostPowerful(monsters) {
    if (!monsters.length) return null
    var mostPowerfulMonster = monsters[0]
    for (var i = 1; i < monsters.length; i++) {
        if (monsters[i].power > mostPowerfulMonster.power) {
            mostPowerfulMonster = monsters[i]
        }
    }
    return mostPowerfulMonster
}

//Another option O(N*log(N))
function findMostPowerfulSort(monsters) {
    if (!monsters.length) return null
    monsters.sort(function (monster1, monster2) {
        return monster2.power - monster1.power
    })
    return monsters[0]
}

function breedMonsters(monsterId1, monsterId2) {
    var monster1 = getMonsterById(monsterId1)
    var monster2 = getMonsterById(monsterId2)
    var name = monster1.name.substring(0, Math.floor(monster1.name.length / 2)) +
        monster2.name.substring(Math.floor(monster2.name.length / 2), monster2.name.length)
    var power = (monster1.power + monster2.power) / 2
    var breededMonster = createMonster(name, power)
    return breededMonster
}


function getRandomStr() {
    const LETTERS = 'abcdefghijklmnopqrstuvwxyz'
    var str = '';
    for (var i = 0; i < getRandomInteger(3, 5); i++) {
        str += LETTERS.charAt(getRandomInteger(0, 23));
    }
    return str;
}
function getRandomInteger(min, max) {
    return (Math.floor(Math.random() * (max - min + 1) + min));
}