'use strict'

$('input[type="checkbox"]').on('change', function(){
    var action = '.'+$(this).data('action');

    $( action +' input.token').toggleClass('enable');
})

function generateToken(size){
    var token ='';
    for(var i=0; i<size; i++){
        token += Math.floor(Math.random()*10%2);
    }
    return token;
}
function vernamEncryption(message, token) {
    var
        result = '',
        ascii = asciiEncode(message);

    token = token? asciiEncode(token): generateToken(ascii.length);

    for(var i=0; i< ascii.length; i++){

        result += ascii[i]==token[i]? 0:1; //XOR operation
    }
    // console.log(token);
    // console.log(result);

    return asciiDecode(result);
}
function asciiEncode(message){
    var asciiMessage = '';
    for (var i =0; i<message.length; i++){
        var ascii = message[i].charCodeAt().toString(2);
        while(ascii.length < 8){
            ascii = '0' + ascii;
        }
        asciiMessage = asciiMessage + ascii;
        // console.log( ascii+ " " + message[i]);
    }
    // console.log(asciiMessage);
    return asciiMessage;
}
function asciiDecode(ascii) {
    var result = '';
    var i=0;
    while(i < ascii.length){
        var block = ascii.substring(i, i+=8);
        //  console.log(String.fromCharCode(parseInt(block,2)), parseInt(block,2));
        result += String.fromCharCode(parseInt(block,2));
    }
    // console.log(result);
    return result;
}
// function encrypt(message, token){
//     var
//         asciiMessage = asciiEncode(message),
//         encryption = vernamEncryption(asciiMessage, token),
//         encryptedAsciiMessage = encryption.result,
//         token = encryption.token,
//         encryptedMessage = asciiDecode(encryptedAsciiMessage);
//
//     return encryptedMessage;
//
// }
// function decrypt(message, token) {
//     var
//         asciiEncryptedMessage = asciiEncode(message),
//         decryption = vernamEncryption(asciiEncryptedMessage, token),
//         decryptedAsciiMessage = decryption.result,
//         token = decryption.token,
//         decryptedMessage = asciiDecode(decryptedAsciiMessage);
//
//     return decryptedMessage;
//
// }
$('.cifrado button.cifrar').on('click', function(){
    var message = $('#message').val();
    var token = $('.cifrado input[type="checkbox"]').is(":checked")? $('.cifrado .token').val(): null;

    if(message != '') {
        $('.cifrado .result').text(vernamEncryption(message, token));
    }else {
        alert('Inserta un mensaje para cifrarlo');
    }

})
$('.descifrado button.descifrar').on('click', function(){

    var message = $('#encrypted-message').val();
    var token = $('.descifrado input[type="checkbox"]').is(":checked")? $('.descifrado .token').val(): null;
    if(message != '') {
        $('.descifrado .result').text(vernamEncryption(message, token));
    }else {
        alert('Inserta un mensaje cifrado para descifrarlo');
    }

})
