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

var button=document.getElementById('counter');

button.onclick=function()
{
    var request=new XMLHttpREquest();
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
    request.open('GET','piyushrj100.imad.hasura-app.io/counter',true);
    request.send(null);
    
   // counter=counter+1;

};

