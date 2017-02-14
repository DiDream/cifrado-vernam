'use strict'


$('.cifrado button').on('click', function(){
  var assiMessage = '';
  var message = $('#message').val();
  var randomKey = '';
  for (var i =0; i<message.length; i++){
    var assi = message[i].charCodeAt().toString(2);
    while(assi.length < 7){
      assi = '0' + assi;
    }
    assiMessage = assiMessage + assi;
    console.log( assi+ " " + message[i]);

  }
  console.log(assiMessage);

  var messageLength = assiMessage.length;
  var encryptedMessage = '';
  for(var i=0; i< messageLength; i++){
    var randomBinary = Math.floor(Math.random()*10%2);
    randomKey = randomKey + randomBinary;
    if (assiMessage[i] == randomBinary){
      encryptedMessage = encryptedMessage + 0;
    }else {
      encryptedMessage = encryptedMessage + 1;
    }
  }
  console.log(randomKey);
  console.log('El mensaje cifrado en binario es:');
  console.log(encryptedMessage);
  var number = 0;
  var mensaje = '';
  while(number < messageLength){
    var block = encryptedMessage.substring(number, number+7);
    console.log(String.fromCharCode(parseInt(block,2)), number);
    number = number + 7 ;
  }
  console.log(mensaje);
})
