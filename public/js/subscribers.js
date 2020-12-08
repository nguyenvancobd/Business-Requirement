$(document).ready(function () { 
  
    // the table and display it 
    data = getdata();
})
let domain = "http://127.0.0.1:3000";
// get data from api
function getdata(){
        var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
        var data ;
        xmlhttp.onreadystatechange  = function() {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    data = JSON.parse(this.responseText);
                    showtable(data);
                } else{
                    data =  '';
                }
            }
                
        };        
        xmlhttp.open("GET", domain+"/user/read");
        xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xmlhttp.send();
        return xmlhttp.responseText;
}
function showtable(data){
    var table = document.getElementById('showtable');
    var index = 0;
    data.forEach(function(object) {
        index ++ ; 
        var tr = document.createElement('tr');
        tr.innerHTML = '<td>' + index + '</td>' +
        '<td> <img style = "height: 40px; width: 40px;" src=' + domain+object.image + '> </td>' +
        '<td>' + object.fullname + '</td>' +
        '<td>' + object.email + '</td>' +
        '<td> ' + object.password + '</td>';
        table.appendChild(tr);
    });

}