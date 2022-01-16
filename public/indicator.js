setInterval(() => {
    if($('.indicator').css('background-color')==='rgb(59, 59, 59)'){
        $('.indicator').css('background-color','#91ff00');
    }else{
        $('.indicator').css('background-color','rgb(59, 59, 59)');
    }
},500);