'use strict';

function profile(user,flag) {
  let pod = `<div class="col-8 mx-auto belownav">
  <h2>I tuoi podcast</h2>
    <div id="mypod" class="container-fluid all">
    
    </div>
  </div>
  `;
  if(flag){
    pod="";
  }
  return `
  <div class="row">
  <div class="col-3 mx-auto mybg">
    <h1 class="belownav">Username:<b> ${user.Username}</b></h1>
    <h2>Catgoria account:<b> ${user.Type}</b></h2>
    <h2>Nome: <b>${user.Name}</b></h2>
    <h2>Cognome: <b>${user.Surname}</b></h2>
    <h2>Email:<b> ${user.Email}</b></h2>
    <h2>Compleanno: <b>${user.Birthday}</b></h2>
    
  </div>
    ${pod}
  </div>
  `;
}

export default profile;