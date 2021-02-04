'use strict';
  function createTableComment(){
    return  `   <div>
    <table class="table mytable" id="TableComment">
    <tr>
    <thead>
      <th class="col-2" >Commento</th>
      <th class="col-2" >Utente</th>
      <th class="col-2 center" ><svg  xmlns="http://www.w3.org/2000/svg" width="1.8em" height="1.8em" class="bi bi-pencil" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
      </svg> </th>
      <th class="col-2 center" ><svg xmlns="http://www.w3.org/2000/svg" width="1.8em" height="1.8em" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
      <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
    </svg></th>
    </tr>
    </thead>
    <tbody id="CommentTableBody">
    </tbody>
    </table>
    </div>
  `;
  
  }

  function showEpComment(ep){
    return `
    <div class="belownav">
    <h3> ${ep.Title} </h3>
    <h4> ${ep.Description} </h4>
    </div>
    `
 }

  function createComment(c,flag){
    if(flag)
    {return  `
    <tr>
    <td>${c.Text}</td>
      <td>${c.UsernameFK}</td>
     
    </tr>`;
  }else{
    return  `
    <tr>
      <td>${c.Text}</td>
      <td>${c.UsernameFK}</td>
      <td> <center> <a href="/editcomm/${c.Code}" type="button" id="modbut-${c.Code}" class="btn smallerbutton btn-primary form-control">Modifica</a></center> </td>
      <td> <center> <button type="submit" id="delbut-${c.Code}" class="btn smallerbutton btn-primary form-control">Elimina</button></center> </td>
    </tr>`;
  }
  }
  function commentForm(){
    return `
    <div >
        <form id="comment-form" role="form" method="POST">
          <div class="row">
            <div class="col">
              <div class="form-group ">
                <input type="text" placeholder="Inserisci il tuo commento" class="form-control" id="inputComment">
              </div>
            </div>
            <div class="col-md-2">
                <div class="form-group">
                  <button type="submit" class="btn btn-primary form-control">Commenta</button>
                </div>
            </div>
          </div>
        </form>
    </div>
    `
  }
  function editCommentForm(comm){
    return `
    <div class="belownav">
    <h5> Modifica il tuo commento </h5>
        <form id="comment-form" role="form" method="PUT">
          <div class="row">
            <div class="col">
              <div class="form-group ">
                <input type="text" value="${comm.Text}" class="form-control" id="inputComment">
              </div>
            </div>
            <div class="col-md-2">
                <div class="form-group">
                  <button type="submit" class="btn btn-primary form-control">Commenta</button>
                </div>
            </div>
          </div>
        </form>
    </div>
    `
  }
  export {editCommentForm,commentForm,createComment,showEpComment,createTableComment};
