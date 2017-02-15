'use strict'

function vernamEncryption(ascii) {
    var
        token = '',
        result = '';

    for(var i=0; i< ascii.length; i++){
        var randomBinary = Math.floor(Math.random()*10%2);
        token += randomBinary;
        result += ascii[i]==randomBinary? 0:1; //XOR operation
    }

    console.log(token);
    console.log(result);

    return {
        token,
        result
    };
}
function asciiEncode(message){
    var asciiMessage = '';
    for (var i =0; i<message.length; i++){
        var ascii = message[i].charCodeAt().toString(2);
        while(ascii.length < 8){
            ascii = '0' + ascii;
        }
        asciiMessage = asciiMessage + ascii;
        console.log( ascii+ " " + message[i]);
    }
    console.log(asciiMessage);
    return asciiMessage;
}
function asciiDecode(ascii) {
    var result = '';
    var i=0;
    while(i < ascii.length){
        var block = ascii.substring(i, i+=8);
         console.log(String.fromCharCode(parseInt(block,2)), parseInt(block,2));
        result += String.fromCharCode(parseInt(block,2));
    }
    console.log(result);
    return result;
}
function encrypt (message){
    var
        asciiMessage = asciiEncode(message),
        encryption = vernamEncryption(asciiMessage),
        encryptedAsciiMessage = encryption.result,
        token = encryption.token,
        encryptedMessage = asciiDecode(encryptedAsciiMessage);

}
function decrypt(message) {
    var
        asciiEncryptedMessage = asciiEncode(message),
        decryption = vernamEncryption(asciiEncryptedMessage),
        decryptedAsciiMessage = decryption.result,
        token = decryption.token,
        decryptedMessage = asciiDecode(decryptedAsciiMessage);

}
$('.cifrado button').on('click', function(){
    encrypt($('#message').val());
})
$('.descifrado button').on('click', function(){
    decrypt($('#encrypted-message').val());
})
