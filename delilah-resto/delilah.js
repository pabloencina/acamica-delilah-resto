
const fs = require('fs') //File System. Modulo para administrar el sistema de archivos.
const moment = require('moment') //libreria
const hoy = moment();
const coolImages = require("cool-images");
//console.log(hoy.format('YYYY Do MM HH:mm:ss'))
//console.log(moment('1987 22 8').fromNow())

console.log(coolImages.many(600, 800, 12))