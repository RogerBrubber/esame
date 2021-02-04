'use strict';

function decisionPage() {
  return `
  <table id="decisionTable">
          <tr>
          <td class="mytd"> 
              <a class="decisionA" href="/newpod">
                <button type="button" class="mybutton" id="btn" > 
                  <b> Nuovo podcast </b> 
                </button> 
              </a>
          </td>
            <td class="border"></td>
          <td class="mytd ">
              <a class="decisionA" href="/newep" >
                <button type="button" class="mybutton" id="btn"> 
                  <b> Nuovo episodio </b> 
                </button> 
              </a>
          </td>
        </tr>
    </table>
  `;
}

export {decisionPage};