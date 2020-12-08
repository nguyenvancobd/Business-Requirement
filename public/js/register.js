$(document).ready(function () { 
})
function summit(){
    var fullname = $("#fullname").val();
    var email = $("#email").val();
    var password = $("#password").val();
    var file = $('input[type="file"]');
    console.log(file[0].files.length);
    if(file[0].files.length === 0 )
    {
        showAlert("Image is required");
    }else{
        base64( file, function(data){
            var image = data.base64;
            sendapi(fullname, email, password,image);
        })
    }

}
function sendapi(fullname,email,password,image){
   
    var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
    xmlhttp.onreadystatechange  = function() {
        if (this.readyState === 4) {
            if (this.status === 200) {
               // alert("Register success");
               //$("#myModal").modal('show'); 
               showAlert("Register success");
            } else{
                var responseDict = JSON.parse(this.responseText);
              //  alert(responseDict.message);
                showAlert(responseDict.message);
            }
        }
    };
    
    xmlhttp.open("POST", "http://127.0.0.1:3000/user/create");
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify(
        {
        "fullname":fullname, 
        "email":email, 
        "password":password,
        "image": image
        }
    ));
}
function base64(file, callback){
    var coolFile = {};
    function readerOnload(e){
      var base64 = btoa(e.target.result);
      coolFile.base64 = base64;
      callback(coolFile)
    };
  
    var reader = new FileReader();
    reader.onload = readerOnload;
  
    var file = file[0].files[0];
    coolFile.filetype = file.type;
    coolFile.size = file.size;
    coolFile.filename = file.name;
    reader.readAsBinaryString(file);
  }
  function showAlert(responseText){
    $("#myModal").modal('show'); 
    $("#myModal .modal-body").text(responseText);
  } 
function validateName(){
    var name =$("#fullname").val();
    if(name ==""){
        $("#infoName").css('visibility', 'visible');
    } 
    if(name !=""){
        $("#infoName").css('visibility', 'hidden');;
    } 
}  
function validateEmail(){
    var name =$("#email").val();
    if(name.trim() =="" || name.trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) ==null){
        $("#infoEmail").css('visibility', 'visible');
    } 
    else{
        $("#infoEmail").css('visibility', 'hidden');;
    } 
}  
function validatePass(){
    var name =$("#password").val();
    if(name.length < 6){
     $("#infoPass").css('visibility', 'visible');
    } 
    else{
        $("#infoPass").css('visibility', 'hidden');;
    }
}  
