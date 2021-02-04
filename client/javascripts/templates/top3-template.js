'use strict';
function createCarousel(pod,count){
  return `<!--Carousel Wrapper-->
  <div id="carousel${pod.Code}" class="carousel slide carousel-multi-item mb-8" data-interval="false" data-ride="carousel">
  
  
    <!--/.Controls-->
    <a class="carousel-control-prev" href="#carousel${pod.Code}" role="button" data-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="carousel-control-next" href="#carousel${pod.Code}" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
    </a>
  
    <!--Slides-->
    <div class="carousel-inner" role="listbox" id = "slides${pod.Code}">
  
    </div>
    <!--/.Slides-->
  
  </div>
  <!--/.Carousel Wrapper-->`;
}
function showCarousel() {
  return ` 
  <div class="center"><h1 id="top3"> <b> Top3! </b> </h1></div>
  <hr class="mb-4">
  <table class="container-fluid">
  <tr>
    <td>
    <div class="container mb-4" id="pxd">
    </div>
    </td>
  <td>
  <div class="container mb-8" id= "allCarousel">
  </div>
</td>
</table> `;
}
function createSlide(count){
  return ` 
  <div class="carousel-item" id="slide${count}">
    <div class="row" id="episodes${count}">
    </div>
  </div>`
}
function createEpisode(ep,countep,pod,svg){
  return `
  <div class="col-md-3" id="Sepisode${countep}${pod.Code}">
  <div class="card mb-2" id="imagecardiv">
    <h5 class="card-title"> <b>${ep.Title}</b></h5>
      <a href="/${pod.Code}/episodes" id="eppage"> <img class="img-fluid mx-auto">${svg} </a>
      </div>
  `;
}
function createFirstSlide(count){
  return ` 
  <div class="carousel-item active myfirst" id="slide${count}">
    <div class="row" id="episodes${count}">
    </div>
  </div>`
}
function create3Carousel(pod){
  `<div id="car${pod}">
  </div>`
}
export {showCarousel,create3Carousel,createCarousel,createEpisode,createSlide,createFirstSlide};