'use strict';

function showEpisode(ep,pod,svg,flag,compr) {
  let sp = ep.Sponsor;
  if(ep.Sponsor==undefined)
    sp = "";
  let prezzo = `<td><a href="#" id="shop-${ep.Code}" role="button">${ep.Price}€ </a> </td>`;
  if(flag){
  if (ep.Price==null||ep.Price==0){
      prezzo = `<td> Gratis </td>`;  
  }else{
    prezzo =  `<td><a role="button">${ep.Price}€ </a> </td>`;
  }
    //l'utente corrente è il creatore del podcast
  return ` 
  <tr>
  <td> 
    <a href="" id="asave-${ep.Code}-${pod.Code}">
    ${svg}
    </a>
  </td>
  <td>${ep.Title}</td>
  <td> <audio controls id = "audio">
  <source src="../sounds/${ep.FileAudio}"  type ="audio/mpeg">
</audio> </td>
  <td>${ep.Description}</td>
  <td>${sp}</td>
  <td> <a href="/comments/${ep.Code}" class="btn btn-primary" role="button"> Commenti </button>
  </div>
  </button>  </td>
  <td>${ep.UploadDate}</td>
  <td>${ep.UsernameFK}</td>
  ${prezzo}
  <td> <a href="/editep/${ep.Code}" class="btn btn-primary" role="button"> Modifica </button>
  <td> <button id="delbut-${ep.Code}" class="btn btn-primary"> Elimina </button>
  </tr>
  `;
}
else{
  let audio=`Acquista per ascoltare`;
  if (ep.Price==null||ep.Price==0){
    if(compr=="Gratis"){
      prezzo = `<td> Gratis </td>`;
    }
    else{
      prezzo = `<td> Acquistato </td>`;
    }
    audio=`<audio controls id = "audio">
    <source src="../sounds/${ep.FileAudio}"  type ="audio/mpeg">
  </audio>`;
  }
  //l'utente corrente non è il creatore del podcast
  return ` 
  <tr>
  <td> 
    <a href="" id="asave-${ep.Code}-${pod.Code}">
    ${svg}
    </a>
  </td>
  <td>${ep.Title}</td>
  <td> ${audio} </td>
  <td>${ep.Description}</td>
  <td>${sp}</td>
  <td> <a href="/comments/${ep.Code}" class="btn btn-primary" role="button"> Commenti </button>
  <td>${ep.UploadDate}</td>
  <td>${ep.UsernameFK}</td>
  ${prezzo}
  </tr>
  `;
}
}
function editEpisode(ep){
  let sponsor =ep.Sponsor;
  let price=ep.Price;
  if(sponsor===undefined){
    sponsor = "";
  }
  if (price===null){
    price=0;
  }
  return ` 
  <form class="col-6 mx-auto belownav2" id="edit-form">
    <div class="form-row">
            <div class="form-group col-md-6">
                <label for="editTitolo"> <b> Titolo</b></label>
                <input type="text" class="form-control" value="${ep.Title}" id="editTitolo">
            </div>
        <div class="form-group col-md-6">
          <label for="editAudio"><b>Audio</b></label>
          <input type="file" accept="audio/*" class="form-control" id="editAudio"> <label class="text-muted">${ep.FileAudio}"</label> 
        </div>
          <div class="form-group col-md-6">
            <label for="editDescrizione"><b>Descrizione</b></label>
            <input type="text" class="form-control"  value="${ep.Description}" id="editDescrizione">
          </div>
        <div class="form-group col-md-6">
          <label for="editSponsor"><b>Sponsor</b></label>
          <input type="text" class="form-control" id="editSponsor" value="${sponsor}"> 
        </div>
          <div class="form-group col-md-6">
          <label for="editDate"><b>Data caricamento</b></label>
          <input type="date" value="${ep.UploadDate}" class="form-control" id="editDate">
          </div>
        <div class="form-group col-md-6">
          <label for="editPrice"><b>Price</b></label>
          <input type="text" class="form-control" value="${price}" id="editPrice">
        </div>
  </div>
    <button type="submit" class="btn btn-primary">Modifica!</button>
  </form>
`;
}
function showSavedEpisode(ep) {
  return ` 
  <tr>
  <td>${ep.Title}</td>
  <td>  <audio controls id = "audio">
  <source src="../sounds/${ep.FileAudio}"  type ="audio/mpeg">
</audio>
   </td>
  <td>${ep.Description}</td>
  <td>${ep.UploadDate}</td>
  <td>${ep.UsernameFK}</td>
  <td><a href=/${ep.Code_Series_FK}/episodes> ${ep.SeriesTitle}</a></td>
  </tr>
  `;
}

function createNewEpisode(){
  return `
  
  <form class="col-6 mx-auto belownav2" role="form" method="POST" id="createep-form">
      <div class="form-row">

      <div class="form-group col-md-6">
        <label for="inputTitle"><b>Titolo</b></label>
        <input type="text" class="form-control" id="inputTitle">
      </div>

      <div class="form-group col-md-6">
        <label for="inputAudio"><b>Audio</b></label>
        <input type="file" accept="audio/*" class="form-control" id="inputAudio">
      </div>

      <div class="form-group col-md-6">
        <label for="inputDescription"><b>Description</b></label>
        <input type="text" class="form-control" id="inputDescription">
      </div>
      
      <div class="form-group col-md-6">
        <label for="inputSponsor"><b>Sponsor</b></label>
        <input type="text" class="form-control" id="inputSponsor">
      </div>

      <div class="form-group col-md-6">
        <label for="inputPrice"><b>Price</b></label>
        <input type="number" min="0" value="0" step="0.1" class="form-control" id="inputPrice">
      </div>

      <div class="form-group col-md-6">
        <label for="inputUploadDate"><b>UploadDate</b></label>
        <input type="date" class="form-control" id="inputUploadDate">
      </div>

      
      <div class="form-group col-md-6">
        <label for="inputPodcastTitle"><b>PodcastTitle </b></label>
        <select id="inputPodcastTitle" class="form-control">
        </select>
      </div>

      </div>
      <button type="submit" class="btn btn-primary">Crea episodio!</button>
    </form>
`;
}
function showPayForm(price){
  return `
  <form class="col-6 mx-auto belownav2" role="form" method="POST" id="pay-form" novalidate>
  <h1>Acquista l'episodio per sempre!</h1>
      <div class="form-row">
  
      <div class="form-group col-md-6">
        <label for="card"> <b> Numero Carta</b></label>
        <input type="text" class="form-control" id="card" maxlength='16' required>
      <label for="card" id="errcard"></label>
      </div>

      <div class="form-group col-md-6">
        <label for="mese"><b>Scadenza</b></label>
        <input type="date" class="form-control" id="mese"  required >
        <label for="mese" id="ovrd"></label>
        </div>

      <div class="form-group col-md-6">
        <label for="cvc"> <b> CVC </b></label>
        <input type="text" class="form-control" id="cvc"  minlength='3' maxlength='3'  required>
        <label for="cvc" id="errcvc">
        </label>
        </div>
      

      </div>
      <div class="form-group col-md-6">  
        <label for="buy"> <b>Totale: ${price}€ </b></label>
        <div>
        <button type="submit" id="buy" class="btn btn-primary">Acquista</button>
        </div>
      </div>


      </div>
    </form>

  `
}
function searchEpisodeTable(){
  return `<h1 id="title" class="belownav" > Episodi: </h1> 
  <div>
   <table class="table mytable" id="Tablesaved">
   <tr>
   <thead>
     <th>Titolo</th>
     <th>Podcast</th>
     <th>Descrizione</th>
     <th>Data</th>
     <th>Username</th>
   </tr>
   </thead>
   <tbody id="allEpisodes">
   </tbody>
   </table>
   </div>`
}
 function fillSearchEpisode(ep) {
  return ` 
  <tr>
  <td><a href=/${ep.Code_Series_FK}/episodes> ${ep.Title} </a></td>
  <td> ${ep.SeriesTitle}</td>
  <td>${ep.Description}</td>
  <td>${ep.UploadDate}</td>
  <td>${ep.UsernameFK}</td>
  </tr>
  `;
}

export {searchEpisodeTable,fillSearchEpisode,showEpisode,showPayForm,editEpisode,showSavedEpisode,createNewEpisode};

