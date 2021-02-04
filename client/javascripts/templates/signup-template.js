'use strict';
function createSignupForm() {
    return`<form class="col-6 mx-auto below-nav" id="signup-form">
    <div class="form-row">
    <div class="form-group col-md-6">
        <label for="inputUser"> <b> Username</b></label>
        <input type="text" class="form-control" id="inputUser" required>
      </div>
      <div class="form-group col-md-6">
        <label for="inputEmail"><b>Email</b></label>
        <input type="email" class="form-control" id="inputEmail" placeholder="mario.rossi@gmail.com" required>
      </div>
        <div class="form-group col-md-6">
          <label for="inputPassword"><b>Password</b></label>
          <input type="password" class="form-control" id="inputPassword" required>
        </div>
      
      <div class="form-group col-md-6">
        <label for="inputAddress"><b>Nome</b></label>
        <input type="text" class="form-control" id="inputName" placeholder="Mario" required >
      </div>
            <div class="form-group col-md-6">
              <label for="inputAddress2"><b>Cognome</b></label>
              <input type="text" class="form-control" id="inputSurname" placeholder="Rossi" required >
            </div>
          <div class="form-row col-md-6">
                  <div class="form-group col-md-6">
                    <label for="inputCity"><b>Data di nascita</b></label>
                    <input type="date" class="form-control" id="inputBirthday" required >
                  </div>
                  <div class="form-group col-md-6">
                    <label for="inputType"><b>Categoria </b></label>
                    <select id="inputType" class="form-control" required>
                      <option selected>Listener</option>
                      <div>
                      Il listener può ascoltare i podcast, commentare e salvarli.
                      </div>
                      <option>Creator</option>
                    </select>
                  </div>
          </div>
    </div>
    <button type="submit" class="btn btn-primary">Sign-in</button>
  </form>
   `;
}
export {createSignupForm};