'use strict';
//navbar non logg
function createNavbar() {
  return `<a class="navbar-brand" href="/home"> <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-music-note-beamed" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path d="M6 13c0 1.105-1.12 2-2.5 2S1 14.105 1 13c0-1.104 1.12-2 2.5-2s2.5.896 2.5 2zm9-2c0 1.105-1.12 2-2.5 2s-2.5-.895-2.5-2 1.12-2 2.5-2 2.5.895 2.5 2z"/>
  <path fill-rule="evenodd" d="M14 11V2h1v9h-1zM6 3v10H5V3h1z"/>
  <path d="M5 2.905a1 1 0 0 1 .9-.995l8-.8a1 1 0 0 1 1.1.995V3L5 4V2.905z"/>
  </svg><b>CastPod</b></a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
  <ul class="navbar-nav">
    <li class="nav-item dropdown">
      <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Categorie
      </a>
      <div class="dropdown-menu" aria-labelledby="navbarDropdown" id="listacat">
        
        <div class="dropdown-divider"></div>
        <a class="dropdown-item" href="/series/all">Tutti</a>
      </div>
    </li>
  </ul>



  <div id="searchdiv" class="mx-auto">
  <div class="bs-example">
    <div class="btn-group btn-group-toggle" id ="btngroup" data-toggle="buttons">
        <label class="btn btn-outline-primary">
            <input type="radio" id="filtra-series" name="options" value="1" autocomplete="off"> Serie
        </label>
        <label class="btn btn-outline-primary active">
            <input type="radio" id="filtra-all" name="options" value="0" autocomplete="off" > Tutto
        </label>
        <label class="btn btn-outline-primary">
            <input type="radio" id="filtra-episodes" name="options" value="2" autocomplete="off"> Episodi
        </label>
    </div>
</div>
    <form class="form-inline search" id="search" >
      <input placeholder="Cerca" type="text" id="ricerca" >
      <button type="submit" >
        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-search" fill="currentColor" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"/> <path fill-rule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/>
        </svg>
      </button>
    </form>
    <div>
    <select id="filtercat">
    <option id="myfilter" value="default">Default</option>
    </select>
</div>

  </div>
    <form class="form-inline my-2 my-lg-0" >
      <a href="/login"> <button class="btn btn-outline-primary" type="button" > Accedi</button></a>
      <a href="/signup"> <button class="btn btn-outline-primary" type="button">Registrati</button></a>
      </form>
    </div>`;
}
//navbar listener
function createLoggedNavbar() {
  return`<a class="navbar-brand" href="/home"> <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-music-note-beamed" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path d="M6 13c0 1.105-1.12 2-2.5 2S1 14.105 1 13c0-1.104 1.12-2 2.5-2s2.5.896 2.5 2zm9-2c0 1.105-1.12 2-2.5 2s-2.5-.895-2.5-2 1.12-2 2.5-2 2.5.895 2.5 2z"/>
  <path fill-rule="evenodd" d="M14 11V2h1v9h-1zM6 3v10H5V3h1z"/>
  <path d="M5 2.905a1 1 0 0 1 .9-.995l8-.8a1 1 0 0 1 1.1.995V3L5 4V2.905z"/>
  </svg>CastPod</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav">
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Categorie
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown" id="listacat">
          
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="/series/all">Tutti</a>
        </div>
      </li>
    </ul>
    
  

  <div id="searchdiv" class="mx-auto">
  <div class="bs-example">
  <div class="btn-group btn-group-toggle" id ="btngroup" data-toggle="buttons">
      <label class="btn btn-outline-primary">
          <input type="radio" id="filtra-series" name="options" value="1" autocomplete="off"> Serie
      </label>
      <label class="btn btn-outline-primary active">
          <input type="radio" id="filtra-all" name="options" value="0" autocomplete="off"> Tutto
      </label>
      <label class="btn btn-outline-primary">
          <input type="radio" id="filtra-episodes" name="options" value="2" autocomplete="off"> Episodi
      </label>
  </div>
</div>
    <form class="form-inline search" id="search" >
      <input placeholder="Cerca" type="text" id="ricerca" >
      <button type="submit" >
        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-search" fill="currentColor" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"/> <path fill-rule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/>
        </svg>
      </button>
    </form>
    <div>
    <select id="filtercat">
    <option id="myfilter" value="default">Default</option>
    </select>
  </div>
  </div>

 

    <form class="form-inline">
    <a class="nav-link" href="/profile" title="Profilo" id="profile">  <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" fill="currentColor" class="bi bi-person-badge" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M2 2.5A2.5 2.5 0 0 1 4.5 0h7A2.5 2.5 0 0 1 14 2.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2.5zM4.5 1A1.5 1.5 0 0 0 3 2.5v10.795a4.2 4.2 0 0 1 .776-.492C4.608 12.387 5.937 12 8 12s3.392.387 4.224.803a4.2 4.2 0 0 1 .776.492V2.5A1.5 1.5 0 0 0 11.5 1h-7z"/>
    <path fill-rule="evenodd" d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6 2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5z"/>
    </svg></a> 
    </form>
    <form class="form-inline">
    <a class="nav-link" href="/follow" title="Seguiti" id="followed"><svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" fill="currentColor" class="bi bi-patch-check" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M10.273 2.513l-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911l-1.318.016z"/>
      <path fill-rule="evenodd" d="M10.354 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
    </svg> </a>
    </form>
    <form class="form-inline">
    <a class="nav-link" href="/saved" title="Salvati" id="saved"> <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" fill="currentColor" class="bi bi-bookmark-heart" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>
    <path fill-rule="evenodd" d="M8 4.41c1.387-1.425 4.854 1.07 0 4.277C3.146 5.48 6.613 2.986 8 4.412z"/>
    </svg></a>
    </form> 
       <form class="form-inline">
       <a class="nav-link" href="/logout" title="Logout" id="logout" ><svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" fill="currentColor" class="bi bi-door-open" viewBox="0 0 16 16">
       <path fill-rule="evenodd" d="M1 15.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5zM11.5 2H11V1h.5A1.5 1.5 0 0 1 13 2.5V15h-1V2.5a.5.5 0 0 0-.5-.5z"/>
       <path fill-rule="evenodd" d="M10.828.122A.5.5 0 0 1 11 .5V15h-1V1.077l-6 .857V15H3V1.5a.5.5 0 0 1 .43-.495l7-1a.5.5 0 0 1 .398.117z"/>
       <path d="M8 9c0 .552.224 1 .5 1s.5-.448.5-1-.224-1-.5-1-.5.448-.5 1z"/>
     </svg></a> 
</form>
    </div>`;
    
}
function addCategory(cat) {
  return `
  <a class="dropdown-item" href="/series/${cat.Category}">${cat.Category}</a>
  `
}
function addFilterCategory(cat) {
  return `
  <option id="myfilter-${cat.Category}" value="${cat.Category}">${cat.Category}</option>
  `
}
//navbar creator
function createCreatorNavbar(){
  return`<a class="navbar-brand" href="/home"> <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-music-note-beamed" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path d="M6 13c0 1.105-1.12 2-2.5 2S1 14.105 1 13c0-1.104 1.12-2 2.5-2s2.5.896 2.5 2zm9-2c0 1.105-1.12 2-2.5 2s-2.5-.895-2.5-2 1.12-2 2.5-2 2.5.895 2.5 2z"/>
  <path fill-rule="evenodd" d="M14 11V2h1v9h-1zM6 3v10H5V3h1z"/>
  <path d="M5 2.905a1 1 0 0 1 .9-.995l8-.8a1 1 0 0 1 1.1.995V3L5 4V2.905z"/>
  </svg>CastPod</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav">
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Categorie
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown" id="listacat">
          
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="/series/all">Tutti</a>
        </div>
      </li>
    </ul>
   

  <div id="searchdiv" class="mx-auto">
  <div class="bs-example">
  <div class="btn-group btn-group-toggle" id ="btngroup" data-toggle="buttons">
      <label class="btn btn-outline-primary">
          <input type="radio" id="filtra-series" name="options" value="1" autocomplete="off"> Serie
      </label>
      <label class="btn btn-outline-primary active">
          <input type="radio" id="filtra-all" name="options" value="0" autocomplete="off"> Tutto
      </label>
      <label class="btn btn-outline-primary">
          <input type="radio" id="filtra-episodes" name="options" value="2" autocomplete="off"> Episodi
      </label>
  </div>
</div>
    <form class="form-inline search" id="search" >
      <input placeholder="Cerca" type="text" id="ricerca" >
      <button type="submit" >
        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-search" fill="currentColor" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"/> <path fill-rule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/>
        </svg>
      </button>
    </form>
    <div>
    <select id="filtercat">
    <option id="myfilter" value="default">Default</option>
    </select>
  </div>
  </div>

  

  </div>
    <form class="form-inline">
    <a class="nav-link" href="/profile" title="Profilo" id="profile">  <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" fill="currentColor" class="bi bi-person-badge" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M2 2.5A2.5 2.5 0 0 1 4.5 0h7A2.5 2.5 0 0 1 14 2.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2.5zM4.5 1A1.5 1.5 0 0 0 3 2.5v10.795a4.2 4.2 0 0 1 .776-.492C4.608 12.387 5.937 12 8 12s3.392.387 4.224.803a4.2 4.2 0 0 1 .776.492V2.5A1.5 1.5 0 0 0 11.5 1h-7z"/>
    <path fill-rule="evenodd" d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6 2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5z"/>
    </svg></a> 
    </form>
    <form class="form-inline">
    <a class="nav-link" href="/follow" title="Seguiti" id="followed"><svg xmlns="http://www.w3.org/2000/svg"  width="2em" height="2em"  fill="currentColor" class="bi bi-patch-check" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M10.273 2.513l-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911l-1.318.016z"/>
      <path fill-rule="evenodd" d="M10.354 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
    </svg> </a>
    </form>
    <form class="form-inline">
    <a class="nav-link" href="/saved" title="Salvati" id="saved"> <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" fill="currentColor" class="bi bi-bookmark-heart" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>
    <path fill-rule="evenodd" d="M8 4.41c1.387-1.425 4.854 1.07 0 4.277C3.146 5.48 6.613 2.986 8 4.412z"/>
    </svg></a>
    </form> 
    <form class="form-inline">
    <a class="nav-link" href="/create" title="Crea" id="create"> <svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-plus-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
    <path fill-rule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
    </svg> </a> 
    </form>
       <form class="form-inline">
       <a class="nav-link" href="/logout" title="Logout" id="logout" ><svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" fill="currentColor" class="bi bi-door-open" viewBox="0 0 16 16">
       <path fill-rule="evenodd" d="M1 15.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5zM11.5 2H11V1h.5A1.5 1.5 0 0 1 13 2.5V15h-1V2.5a.5.5 0 0 0-.5-.5z"/>
       <path fill-rule="evenodd" d="M10.828.122A.5.5 0 0 1 11 .5V15h-1V1.077l-6 .857V15H3V1.5a.5.5 0 0 1 .43-.495l7-1a.5.5 0 0 1 .398.117z"/>
       <path d="M8 9c0 .552.224 1 .5 1s.5-.448.5-1-.224-1-.5-1-.5.448-.5 1z"/>
     </svg></a> 

</form>
    </div>`;
    


}
export {createNavbar,addFilterCategory,createLoggedNavbar,addCategory,createCreatorNavbar};

