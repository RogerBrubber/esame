'use strict';

function createLoginForm() {
    return`<div>
    <form method="POST" action="" id="login-form" class="col-6 mx-auto below-nav">
    <div id="error-messages"></div>
    <div class="form-group">
      <label for="username"> <b> Username </b></label>
      <input type="text" name="username" id = "inputUser" class="form-control" required />
    </div>

    <div class="form-group">
      <label for="password"> <b> Password </b></label>
      <input type="password" name="password"  id = "inputPassword" class="form-control" required autocomplete/>
    </div>
    <button type="submit" class="btn btn-primary">Login</button>
  </form>
  </div> 
  `;
}

export {createLoginForm};