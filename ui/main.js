/*console.log('Loaded!');
var element=document.getElementById('main-text');

element.innerHTML='New Vaue';
var img=document.getElementById('madi');
var marginLeft=0;
function moveRight()
{
    marginLeft=marginLeft+1;
    img.style.marginLeft=marginLeft+'px';
}
img.onclick=function(){
    var interval=setInterval(moveRight,50);
  //img.style.marginLeft='100px';
  
};*/
//counter code

/*var button=document.getElementById('counter');

button.onclick=function()
{
    var request=new XMLHttpRequest();
    //capture the response and store in a variable
    request.onreadystatechange=function()
    {
        if(request.readyState===XMLHttpRequest.DONE){
        //take some action.
        if(request.status===200){
           var counter= request.responseText;
           var span=document.getElementById('count');
           span.innerHTML=counter.toString();
           
           
        }
        }
        
    };
    request.open('GET','http://piyushrj100.imad.hasura-app.io/counter',true);
    request.send(null);*/
    
   // counter=counter+1;
   

//};

var submit=document.getElementById('submit_btn');
submit.onclick=function(){
        var request=new XMLHttpRequest();
    //capture the response and store in a variable
    request.onreadystatechange=function()
    {
        if(request.readyState===XMLHttpRequest.DONE){
        //take some action.
        if(request.status===200){
         //capture a list of names and render it on the list
         console.log('user logged in');
         alert('Logged in successfully');
        }else if(request.status===403){
            alert('Username/password is wrong');
        }else if(request.status===500){
            alert('Something went wrong');
        }
   /* var names=request.responseText;
    names=JSON.parse(names);
    var list='';
    for(var i=0;i<names.length;i++){
        list+='<li>'+names[i]+'</li>';
    }
    var ul=document.getElementById('namelist');
    ul.innerHTML=list;*/
        }
    
        
    };
    //make the request
    //var nameInput=document.getElementById('name');
//var name=nameInput.value;
var username= document.getElementById('username').value;
var password= document.getElementById('password').value;
    
    request.open('POST','http://piyushrj100.imad.hasura-app.io/login', true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify({username: username, password: password}));
   
    
    
};
 


