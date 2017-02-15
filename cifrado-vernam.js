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
function resizeToken(token, size){
    while(token.length<size){
        token+=token;
    }
    return token.substring(0,size);
}

function vernamEncryption(message, token, recipher) {
    var
        result = '',
        ascii = asciiEncode(message);

    token = token? asciiEncode(resizeToken(token,message.length)) : generateToken(ascii.length);

    for(var i=0; i< ascii.length; i++){
        var temp = ascii[i]==token[i]? 0:1; //XOR operation
        for(var j=1; j<recipher; j++){
          temp = temp==token[i]? 0:1;
        }
        result += temp;
    }
    console.log('binary token: ',token);
    console.log('binary result: ',result);

    return asciiDecode(result);
}

// A partir del mensaje obtiene su codificacion binaria
function asciiEncode(message){
    var result = '';
    for (var i =0; i<message.length; i++){
        var ascii = message[i].charCodeAt().toString(2);
        while(ascii.length < 8){
            ascii = '0' + ascii;
        }
        result = result + ascii;
        console.log( ascii+ " " + message[i]);
    }
    console.log(result);
    return result;
}
// A partir del string de numeros binarios obtiene los caracteres
function asciiDecode(asciiBinary) {
    var result = '';
    var i=0;
    while(i < asciiBinary.length){
        var block = asciiBinary.substring(i, i+=8);
         console.log(String.fromCharCode(parseInt(block,2)), parseInt(block,2));
        result += String.fromCharCode(parseInt(block,2));
    }
    console.log(result);
    return result;
}

$('.cifrado button.cifrar').on('click', function(){
    var message = $('#message').val();
    var token = $('.cifrado input[type="checkbox"]').is(":checked")? $('.cifrado .token').val(): null;
    var recipher = $('.cifrado input.recipher').val() ;

    if(message != '') {
        $('.cifrado .result').text(vernamEncryption(message, token,recipher));
    }else {
        alert('Inserta un mensaje para cifrarlo');
    }

})
$('.descifrado button.descifrar').on('click', function(){

    var message = $('#encrypted-message').val();
    var token = $('.descifrado input[type="checkbox"]').is(":checked")? $('.descifrado .token').val(): null;
    var recipher = $('.cifrado input.recipher').val();
    if(message != '') {
        $('.descifrado .result').text(vernamEncryption(message, token,recipher));
    }else {
        alert('Inserta un mensaje cifrado para descifrarlo');
    }

})
