const socket = io();
$('.app').hide();
$('.view-members').hide();
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
    $('.view-members').show();
    $('.app').show();
    $('.send-msg').focus();

});

socket.on('current-users',(data) => {
    $('.users li').remove();

    for(let user in data.users){
        $('.users').append(`<li class="user-list my-3 p-2 d-flex align-items-center 
                            justify-content-between rounded-3"
                                <p class="m-0">${data.users[user]}</p>
                                <span class="indicator me-2"></span> 
                            </li>`);
    }


    $('.msges').append(`<li class="mt-2">
                            <p class="bg-secondary text-white 
                            w-75 mx-auto rounded text-center">
                                ${data.user} has ${data.status} the group!!
                            </p>
                        </li>`);

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

        data.user === username ? $('.msges li:last-child').addClass('me-3') 
                                    : $('.msges li:last-child').addClass('ms-3');


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
                                    .insertAfter('.msges li:last-child .list-item')
                                    : $('<div class="triangle-left"></div>')
                                        .insertBefore('.msges li:last-child .list-item');


    }

    $('.msges li:last-child').addClass(liClass);
    
    $('.msges').scrollTop(1000000 * $('.msges').outerHeight());

});