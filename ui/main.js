console.log('Loaded!');

var x = document.getElementById('hideit');


function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
      x.style.display = 'none';
    });
  }


$('.madi2').hover(function () {
  $(this).addClass('magictime vanishIn');
});
setTimeout(function(){
     $('.madi2').addClass('magictime puffIn');
 }, 2000);




var button = document.getElementById('counter');

button.onclick = function() {
    
    var request = new XMLHttpRequest();
    
    request.onreadystatechange = function() {
        if (request.readyState ===XMLHttpRequest.DONE){
            if(request.status === 200) {
                var counter = request.responseText;
                var span = document.getElementById('count');
                span.innerHTML = counter.toString();
            }
        }
    };
    request.open('GET','http://sanattaori.imad.hasura-app.io/counter',true);
    request.send(null);

};

var submit = document.getElementById('submit_btn');
submit.onclick = function(){
alert('click on sign in button to post your comment');
}

  
 x.style.display = 'none';
//submit
function onSignIn(googleUser) {
    
  
  
        x.style.display = 'block';
  
  //      x.style.display = 'none';
  
    var profile = googleUser.getBasicProfile();
        console.log('Full Name: ' + profile.getName());
        console.log('Given Name: ' + profile.getGivenName());
    var gname = profile.getName();
    
var submit = document.getElementById('submit_btn');
submit.onclick = function(){
    var request = new XMLHttpRequest();
     
    request.onreadystatechange = function() {
        if (request.readyState ===XMLHttpRequest.DONE){
            if(request.status === 200) {
               var names = request.responseText;
               names = JSON.parse(names);
    var list ='';
    for (var i=0; i<names.length; i++) {
        list+='<li>' + names[i] + '</li>' +'</br>'
    }
    var ul = document.getElementById('namelist');
    ul.innerHTML = list;
            }
        }
    };
    var space =' :-'+'</br>';
    var nameInput = document.getElementById('name');
    var name = nameInput.value;
    request.open('GET','http://sanattaori.imad.hasura-app.io/submit-name?name=' + gname + space + name ,true);
    request.send(null);
    
    
};

};
//loder

$(document).ready(function() {
 
  // Fakes the loading setting a timeout
    setTimeout(function() {
        $('body').addClass('loaded');
    }, 3500);
 
});
  



setTimeout(function(){
     $('.madi2').addClass('magictime puffIn');
 }, 5000);
