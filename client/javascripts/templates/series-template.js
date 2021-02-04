'use strict';

function createSerie(pod,flag,user,svg) {

  if(flag==1){
    return ` 
  <div class="card mb-3 mypod" id="pod${pod.Code}">
    <div class="row no-gutters">
      <div class="col-md-4">
      <a href="/${pod.Code}/episodes" id="seriepage"> <img src="/images/${pod.Image}" class="card-img"></a>
      </div>
      <div class="col-md-8">
      <div class="mlbtn btn-group">
      <button id ="edit-${pod.Code}" class="btn btn-primary" >
        <svg  xmlns="http://www.w3.org/2000/svg" width="1.8em" height="1.8em" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
        </svg>
      </button>
      <button id ="del-${pod.Code}" class="btn btn-primary">
        <svg xmlns="http://www.w3.org/2000/svg" width="1.8em" height="1.8em" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
          <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
        </svg>
      </button>
      </div>
        <div class="card-body pad0">
          <h5 class="card-title"><b>${pod.Title}</b></h5>
          <p class="card-text"><small class="text-muted"> ${pod.UsernameFK}</small></p>
          <p class="card-text"><small class="text-muted"> ${pod.Category}</small></p>
        </div>
      </div>
      
    </div>
  </div>
 
  `;
  }else if(flag==2){
    return ` 
    <div class="row">
    <div class="col-8">
    <div class="card mb-3 mypod" id="pod${pod.Code}">
      <div class="row no-gutters">
        <div class="col-md-4">
        <a href="/${pod.Code}/episodes" id="seriepage"> <img src="/images/${pod.Image}" class="card-img"></a>
        </div>
        <div class="col-md-8">
        <a id="flw-${pod.Code}-${user}" href=#>${svg}</a>
          <div class="card-body pad0">
            <h5 class="card-title"><b>${pod.Title}</b></h5>
            <p class="card-text"><small class="text-muted"> ${pod.UsernameFK}</small></p>
            <p class="card-text"><small class="text-muted"> ${pod.Category}</small></p>
            <p class="card-text"><small class="text-muted"> ${pod.Description}</small></p>
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
    `;
  }else{
  return ` 
  <div class="card mb-3 mypod" id="pod${pod.Code}">
    <div class="row no-gutters">
      <div class="col-md-4">
      <a href="/${pod.Code}/episodes" id="seriepage"> <img src="/images/${pod.Image}" class="card-img"></a>
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title"><b>${pod.Title}</b></h5>
          <p class="card-text"><small class="text-muted"> ${pod.UsernameFK}</small></p>
          <p class="card-text"><small class="text-muted"> ${pod.Category}</small></p>
          <p class="card-text"><small class="text-muted"> ${pod.Description}</small></p>
        </div>
      </div>
    </div>
  </div>
  `;
}
}
function createCat(cat,count,svg) {
  return `
  <div class="card mypod mycat" >
  <a href="/series/${cat}" id="cat${count}"> <img class="card-img-top"> ${svg} </a>
  <div class="card-body">
    <h5 class="card-title">${cat}</h5>
  </div>
</div>

  `;
}
function createPageSerie(pod){
return ` 
<div class="card mb-3 mypod" id="pod${pod.Code}">
  <div class="row no-gutters">
     <div class="col-md-4">
   <img src="/images/${pod.Image}" class="card-img">
     </div>
   <div class="col-md-8">
    <div class="card-body pad0">
      <h5 class="card-title"><b>${pod.Title}</b></h5>
      <p class="card-text"><small class="text-muted"> ${pod.UsernameFK}</small></p>
      <p class="card-text"><small class="text-muted"> ${pod.Category}</small></p>
      <p class="card-text"><small class="text-muted"> ${pod.Description}</small></p>
    </div>
  </div>
</div>
</div>
`
}
function createTableSerie(){
  return `   <div>
   <table class="table mytable" id="Tableepisode">
   <thead>
     <th>Salva</th>
     <th>Titolo</th>
     <th>Play</th>
     <th>Descrizione</th>
     <th>Sponsor</th>
     <th> </th>
     <th>Data</th>
     <th>Username</th>
     <th>Prezzo</th>
   </thead>
   <tbody id="allEpisodes">
   </tbody>
   </table>
   </div>`
}
function createSavedEpisodeTable(){
  return `<h1 id="title" class="belownav" > I tuoi episodi preferiti </h1> 
  <div>
   <table class="table mytable" id="Tablesaved">
   <tr>
   <thead>
     <th>Titolo</th>
     <th>Play</th>
     <th>Descrizione</th>
     <th>Data</th>
     <th>Username</th>
     <th>Podcast</th>
   </tr>
   </thead>
   <tbody id="allEpisodes">
   </tbody>
   </table>
   </div>`
}
function showSeries(){
    return `
    <div id="allSeries">
    
    </div>
    `;
}
function createNewSerieForm(){
    return `
    <form class="col-6 mx-auto belownav2" role="form" method="POST" id="createpod-form">
      <div class="form-row">

          <div class="form-group col-md-6">
            <label for="inputTitle"> <b> Title</b></label>
            <input type="text" class="form-control" id="inputTitle">
          </div>

          <div class="form-group col-md-6">
            <label for="inputDescription"><b>Description</b></label>
            <input type="text" class="form-control" id="inputDescription">
          </div>

          <div class="form-group col-md-6">
            <label for="inputPassword"><b>Category</b></label>
            <input type="text" class="form-control" id="inputCategory">
          </div>
          
          <div class="form-group col-md-6">
            <label for="inputImage"><b>Image</b></label>
            <input type="file" accept="image/*" class="form-control" id="inputImage">
          </div>

      </div>
      <button type="submit" class="btn btn-primary">Crea podcast!</button>
    </form>`;
}
function editPod(pod) {
    return ` 
    <div class="card mb-3 mypod" id="pod${pod.Code}">
      <div class="row no-gutters">
        <div class="col-md-4">
        <a id="seriepage"> <img src="/images/${pod.Image}" class="card-img"></a>
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title"><b>${pod.Title}</b></h5>
            <p class="card-text"><small class="text-muted"> ${pod.UsernameFK}</small></p>
            <p class="card-text"><small class="text-muted"> ${pod.Category}</small></p>
            <p class="card-text"><small class="text-muted"> ${pod.Description}</small></p>
          </div>
        </div>
        
      </div>
    </div>
    
    <form class="col-6 mx-auto" id="edit-form"  method="POST">
    <div class="form-row">
  
    <div class="form-group col-md-6">
      <label for="editTitle"> <b> Title</b></label>
      <input type="text" class="form-control" value="${pod.Title}" id="editTitle">
    </div>
  
    <div class="form-group col-md-6">
      <label for="editDescription"><b>Description</b></label>
      <input type="text" class="form-control" value="${pod.Description}" id="editDescription">
    </div>
  
    <div class="form-group col-md-6">
      <label for="editPassword"><b>Category</b></label>
      <input type="text" class="form-control" value="${pod.Category}" id="editCategory">
    </div>
    
    <div class="form-group col-md-6">
      <label for="editImage"><b>Image</b></label>
      <input type="file" accept="image/*" class="form-control" value="${pod.Image}" id="editImage">
    </div>
      <button type="submit" class="btn btn-primary">Salva</button>
    </form>
    `;
}

export {createSerie,createCat,showSeries,createPageSerie,createTableSerie,createSavedEpisodeTable,createNewSerieForm,editPod};