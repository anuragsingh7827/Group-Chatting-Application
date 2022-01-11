const socket = io();
$('.app').hide();
$('.login-input').focus();
let username = null;
$('.login-form').submit((e) => {
    e.preventDefault();
    username = $('.login-input').val();
    if(username === '') return alert('Kindly enter a valid username!!');

    socket.emit('send-user-data',{
        user: username
    });

    $('.login').hide();
    $('.app').show();
    $('.send-msg').focus();

    if(!$('.msges').children().length){
        $('.msges').hide();
    }

});

$('.msg-form').submit((e) => {
    e.preventDefault();

    const msgText = $('.send-msg').val().trim();

    if(msgText === '') return;
    socket.emit('send-msg',{
        id: socket.id,
        msg: msgText
    });

    $('.send-msg').val('');

});

let lastLiUser = null;

socket.on('received-msg', (data) => {

    if(!$('.msges').children().length){
        $('.welcome').hide();
        $('.msges').show();
    }

    const liClass = data.user === username ? "justify-content-end" : "justify-content-start";

    if(lastLiUser && lastLiUser === data.user){
        $('.msges')
        .append(`<li class="d-flex mt-1">
                    <div class="list-item px-2 pt-2">
                        <p class="msg lh-sm text-break">
                            ${data.msg}
                        </p>
                    </div>
                </li>`);

        data.user === username ? $('ul li:last-child').addClass('me-3') 
                                    : $('ul li:last-child').addClass('ms-3');


    }else{
        
        lastLiUser = data.user;

        $('.msges')
        .append(`<li class="d-flex mt-2 align-items-center">
                    <div class="list-item px-2 pt-2">
                        <p class="name fw-bold">${data.user}:</p> 
                        <p class="msg lh-sm text-break"
                            style="margin-top: -10px;">
                            ${data.msg}
                        </p>
                    </div>
                </li>`);

        data.user === username ? $('<div class="triangle-right"></div>')
                                    .insertAfter('ul li:last-child .list-item')
                                    : $('<div class="triangle-left"></div>')
                                        .insertBefore('ul li:last-child .list-item');


    }

    $('ul li:last-child').addClass(liClass);
    
    $('.msges').scrollTop(1000 * $('.msges').outerHeight());

});