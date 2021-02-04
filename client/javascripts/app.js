import {createLoginForm} from './templates/login-template.js';
import {createSignupForm} from './templates/signup-template.js';
import createAlert from './templates/alert-template.js';
import {createLoggedNavbar, createNavbar,addFilterCategory,addCategory,createCreatorNavbar} from './templates/nav-template.js';
import {showCarousel, createCarousel,createEpisode, createFirstSlide} from './templates/top3-template.js';
import {createSerie, showSeries,createCat,createTableSerie,createSavedEpisodeTable, createNewSerieForm,editPod} from './templates/series-template.js';
import {searchEpisodeTable,fillSearchEpisode,showEpisode,showPayForm,editEpisode,showSavedEpisode,createNewEpisode} from './templates/episode-template.js';
import {editCommentForm,commentForm,createComment,createTableComment,showEpComment} from './templates/comment-template.js';
import profile from './templates/profile-template.js';
import {decisionPage} from './templates/decision-template.js';
import page from '//unpkg.com/page/page.mjs';
import Api from './api.js';
class App {
    
  constructor(appContainer, userContainer) {
      // reference to the podcast list container
      this.appContainer = appContainer;
      // reference to the user/login area in the navbar
      this.userContainer = userContainer;
      this.nav(); 
    page('/login', () => {
        this.appContainer.innerHTML="";
        this.appContainer.innerHTML=createLoginForm();
        document.getElementById('login-form').addEventListener('submit', this.onLoginSubmitted);
    }); 
    page('/signup', () => {
        this.appContainer.innerHTML="";
        this.appContainer.innerHTML=createSignupForm();
        document.getElementById('signup-form').addEventListener('submit', this.onSignupSubmitted);    
    }); 
    //mostra i podcast in base alle categorie
    page('/series/:cat',(req,res)=>{
        this.appContainer.innerHTML="";
        const cat = req.params.cat;
        this.categoryPage(cat);   
    });
    //mostra pagina profilo
    page('/profile',(req,res)=>{
        this.appContainer.innerHTML="";
        const user = localStorage.getItem("user");
        if(user!=null){
        this.profilePage(user);
        }
        else{
            page.redirect('/login');
        }
    })
    //mostra pagina modifica commento
    page('/editcomm/:com',async (req,res)=>{
        this.appContainer.innerHTML="";
        const com = await Api.getCommentByCode(req.params.com);
        this.appContainer.innerHTML=editCommentForm(com);
        document.getElementById('comment-form').addEventListener('submit', async(event)=>{this.editComment(event,com)});
        
    })
    //mostra commenti di un episodio
    page('/comments/:ep',(req,res)=>{
        this.appContainer.innerHTML="";
        this.showComments(req.params.ep);
    })
    //mostra form pagamento per un episodio
    page('/payments/:ep',(req,res)=>{
    this.appContainer.innerHTML="";
    this.appContainer.innerHTML=this.showPay(req.params.ep);
    })
    //mostra pagina per scegliere se creare un podcast o un episodio
    page('/create',(req,res)=>{
        this.appContainer.innerHTML="";
        const user = localStorage.getItem("user");
        if(user!=null){
        app.innerHTML = decisionPage();
        }
        else{
            page.redirect('/login');
        }
    })
    //mostra pagina per modificare il podcast
    page('/editpod/:pod',async (req,res)=>{
        this.appContainer.innerHTML="";
        const user = localStorage.getItem("user");
        if(user!=null){
        const pod = await Api.getSerieById(req.params.pod);
        app.innerHTML = editPod(pod);
        let form = document.getElementById("edit-form");
        form.addEventListener('submit',(event)=>{
            this.editPod(event,pod);
        });
        }
        else{
            page.redirect('/login');
        }
    })
    //mostra pagina per modificare un episodio
    page('/editep/:ep',async(req,res)=>{
        this.appContainer.innerHTML="";
        const user = localStorage.getItem("user");
        if(user!=null){
        let ep = await Api.getEpisodeByCode(req.params.ep);
        app.innerHTML = editEpisode(ep);
        let form = document.getElementById("edit-form");
        form.addEventListener('submit',(event)=>{
            this.editEp(event,ep);
        });
        }
        else{
            page.redirect('/login');
        }
    })
    //mostra form per creare nuovo podcast
    page('/newpod',(req,res)=>{
        this.appContainer.innerHTML="";
        const user = localStorage.getItem("user");
        if(user!=null){
        app.innerHTML = createNewSerieForm();
        const createForm = document.getElementById('createpod-form')
        if(createForm){
            createForm.addEventListener('submit',this.createPodcast)
        }
        }
        else{
            page.redirect('/login');
        }
    })
    //mostra form per creare nuovo episodio
    page('/newep',(req,res)=>{
        this.appContainer.innerHTML="";
        const user = localStorage.getItem("user");
        if(user!=null){
        app.innerHTML = createNewEpisode();
        this.fill(user);
        const createForm = document.getElementById('createep-form')
        if(createForm){
            createForm.addEventListener('submit',(event)=>{
                this.createepisode(user,event)
            }
                )
        }
        }
        else{
            page.redirect('/login');
        }
    })
    //mostra episodi salvati da utente
    page('/saved',(req,res)=>{
        this.appContainer.innerHTML="";
        const user = localStorage.getItem("user");
        if(user!=null){
        this.savedPage(user);
        }
    })
    //mostra podcast seguiti da utente
    page('/follow',(req,res)=>{
        this.appContainer.innerHTML="";
        const user = localStorage.getItem("user");
        if(user!=null){
        this.followpage(user);
        }
    })
    //mostra episodi del podcast
    page('/:code/episodes',(req,res)=>{
        this.appContainer.innerHTML="";
        const code = req.params.code;
        this.seriepage(code);   
    });
    //mostra risultati ricerca
    page('/results/:search/:flag/:cat',(req,res)=>{
       this.appContainer.innerHTML="";

       let p =  req.params.search;
       let flag = req.params.flag;
       let cat = req.params.cat
       this.onSearch(p,flag,cat);
    })
    page('/home', () => {
          
          this.appContainer.innerHTML="";
          this.appContainer.innerHTML = showCarousel();
          this.appContainer.insertAdjacentHTML('beforeend', showSeries());
          this.showTop3(); //crea top3
          this.showAllSeries();//crea tutte le serie
          const app = document.getElementById('app');
          let sp = document.getElementById('seriepage');
          if(sp){
            sp.addEventListener('click',()=>{page('/:code/episodes')})
          }
          let se = document.getElementById('search');

          let btn = document.querySelectorAll('[id^="filtra"]');
          let flag=0;
            for(let b of btn)
            b.addEventListener("click",(event)=>{
                event.preventDefault();
                flag = b.value;
          })
          let cat = document.getElementById("filtercat");
          let c="default";
          cat.addEventListener("click",(event)=>{
            event.preventDefault();
            c=cat.value;
          });
         if(se){
             se.addEventListener('submit',(event)=>{
                 event.preventDefault();
                 let text ="";
                 text = document.getElementById('ricerca').value;
                 console.log(text);
                 page.redirect(`/results/${text}/${flag}/${c}`)
                })
         }
    });
    page('/logout',()=>{
        this.onLogout();
        this.nav(); 
        page.redirect('/home');
    })
    page('*',() =>{
        page.redirect('/home');  
    });
    page(); //binding, activate all pages
    }
    /**
    * riempie il il dropdown dei podcast nella creazione di un nuovo episodio
    * @param {*} user cerca i podcast dell'utente con questo username
    */
    fill = async(user)=>{
        const select = document.getElementById("inputPodcastTitle");
        const pods = await Api.getSeriesByUsername(user);
        for (let p of pods){
            select.insertAdjacentHTML('beforeend',`<option> ${p.Title}</option>`)
        }
        return pods;
    }
    /**
    * crea la navbar in base al tipo di utente
    */
    nav=()=>{
        if(localStorage.getItem("user")!=null){
            if(localStorage.getItem('cat')!='Creator'){
                this.userContainer.innerHTML= createLoggedNavbar();
            }
            else{
                this.userContainer.innerHTML= createCreatorNavbar();
            }
            } 
        else{
            this.userContainer.innerHTML=createNavbar();
            }
            this.cat();
            this.filtercat();
    }
    /**
    * riempie il dropdown delle categorie
    */
    cat= async()=>{
            const categories = await Api.getCategories();
            const listacat = document.getElementById('listacat');
            for (const cat of categories){
              listacat.insertAdjacentHTML('afterbegin',addCategory(cat));};
    };
    /**
    * riempie il dropdown delle categorie per la ricerca
    */
    filtercat= async()=>{
            const categories = await Api.getCategories();
            const listacat = document.getElementById('filtercat');
            for (const cat of categories){
              listacat.insertAdjacentHTML('afterbegin',addFilterCategory(cat));};
    }
    /**
    * crea un alert sotto alla navbar
    * @param {*} type tipo di alert es: error, warning, success
    * @param {*} msg testo da visualizzare nel alert
    */
    showAlertMessage(type,msg){
        const alertMessage = document.getElementById('alert-message');
                alertMessage.innerHTML = createAlert(type, msg);
                setTimeout(() => {
                    alertMessage.innerHTML = '';
                }, 3000);
    }
    /**
    * crea la pagina del profilo utente
    * permette update di un podcast
    * permette eliminazione di un podcast
    * @param {*} user username, serve a recuperare le informazioni dell'utente da visualizzare
    */
    profilePage = async(user)=>{
        const d =  await Api.getUserByUsername(user);
        let flag= 0;
        if(d.Type=="Listener"){
            flag = 1;
        }
        this.appContainer.innerHTML=profile(d,flag);
        const mypod = document.getElementById('mypod');
        const pod = await Api.getSeriesByUsername(user);
        for (let p of pod){
            mypod.insertAdjacentHTML('beforeend',createSerie(p,1));
            let save = document.getElementById('podform');
            if(save){
                save.addEventListener('submit',async (event)=>{
                    event.preventDefault();
                    const form = event.target;
                    if(form.checkValidity()){
                        let img = form.editImage;
                        if(img==null){
                            img = p.Image;
                        }
                        await Api.updatePod(p.Code,
                            form.editTitle,
                            form.editDescription,
                            form.editCategory,
                            img
                            )
                            this.showAlertMessage('success','Podcast aggiornato');
                    page.reload();
                    }
                })
            }
        }
        const del = document.querySelectorAll(`[id^="del"]`);
            for(let d of del){
                let cc = d.id.split("-")
                d.addEventListener('click',async(event)=>{
                    event.preventDefault();
                    try{
                    await Api.DeleteSerie(cc[1]);
                    this.profilePage(user);
                    }
                    catch(err){this.showAlertMessage('danger',err)};
                })
            }

            const edit = document.querySelectorAll(`[id^="edit"]`);
            for(let d of edit){
                let cc = d.id.split("-")
                d.addEventListener('click',async(event)=>{
                    event.preventDefault();
                    try{
                    page.redirect(`/editpod/${cc[1]}`);
                    }
                    catch(err){this.showAlertMessage('danger',err)};
                })
            }
      
    }
    /**
    * crea la pagina degli episodi salvati
    * @param {*} user username, per controllare quali episodi sono stati salvati da quell'utente
    */
    savedPage = async(user)=>{
        this.appContainer.innerHTML=createSavedEpisodeTable();
        const myep = document.getElementById('allEpisodes');
        try{
        const eps = await Api.getAllEpisodes();
        
        for (let ep of eps){
            if((await Api.isSaved(ep.Code,ep.Code_Series_FK,user) !="" )&& ((user==ep.UsernameFK)||(ep.Price==null || ep.Price == 0)||(await Api.isBought(ep.Code,ep.Code_Series_FK,user)!=""))) {
                myep.insertAdjacentHTML('beforeend',showSavedEpisode(ep));
           } 
           else if ((await Api.isSaved(ep.Code,ep.Code_Series_FK,user))!=""){
               ep.FileAudio="";
                myep.insertAdjacentHTML('beforeend',showSavedEpisode(ep));
           } 
        }
    }
        catch(err){
            console.log(err);
            this.alertMessage('danger',err);
        }
    }
    /**
    * mostra i podcast in base alla categoria
    * @param {*} cat tipo di categoria
    */
    categoryPage = async(cat)=>{
        this.appContainer.insertAdjacentHTML('beforeend', `<div id="allSeries"></div>`);
        if(cat==="all") this.showAllCategories();
        else{
        const apiPods = await Api.getAllSeries();
        for (const p of apiPods){
            if (p.Category==cat){
                this.appContainer.insertAdjacentHTML('beforeend',createSerie(p));
            }
        }
    }
    }
    /**
    * mostra il form del pagamento
    * @param {*} epcode codice dell'episodio da comprare
    */
    showPay = async(epcode)=>{
            let user = localStorage.getItem('user');
            if (user==null){
                this.showAlertMessage('warning','Accedi o registrati per acquistare');
                page.redirect('/login');
            }
            const ep = await Api.getEpisodeByCode(epcode);
            this.appContainer.innerHTML=showPayForm(ep.Price);
            document.getElementById('pay-form').addEventListener('submit', async(event)=>{
                    event.preventDefault();
                    const form = event.target;
                    if(form.checkValidity()){
                        try{
                            const card = document.getElementById('card');
                            const cvc = document.getElementById('cvc');
                            const errcrd = document.getElementById('errcard');
                            const errcvc = document.getElementById('errcvc');
                            const scad = document.getElementById("mese");
                            console.log(form.card.value.length);
                            if(!/^\d+$/.test(form.card.value) || form.card.value.length!=16){ //controlla se è solo digit
                                card.style.border="2px solid red";
                                errcrd.innerHTML="Errore formato carta";
                                errcrd.style.border="2px solid #d9544d";
                                errcrd.style.backgroundColor="#d9544d";
                              }
                              else  if(!/^\d+$/.test(form.cvc.value) || form.cvc.value.length!=3){ 
                                errcrd.innerHTML="";
                                card.style.border="2px solid green";
                                cvc.style.border="2px solid red";
                                errcvc.innerHTML="Errore formato cvc";
                                errcvc.style.border="2px solid #d9544d";
                                errcvc.style.backgroundColor="#d9544d";
                              }
                        else if(new Date(form.mese.value) > new Date()){
                            errcrd.innerHTML="";
                            errcrd.style.border="";
                            errcrd.style.backgroundColor="";
                            errcvc.innerHTML="";
                            scad.innerHTML="";
                            await Api.BuyEpisode(ep.Code_Series_FK,epcode,user);
                            page.redirect(`/${ep.Code_Series_FK}/episodes`);
                        }
                        else{
                            errcrd.innerHTML="";
                            errcrd.style.border="";
                            errcrd.style.backgroundColor="";
                            card.style.border="2px solid green";
                            scad.style.border="2px solid red";
                            const err = document.getElementById("ovrd")
                            err.innerHTML="Inserire una carta non scaduta";
                            err.style.border="2px solid #d9544d";
                            err.style.backgroundColor="#d9544d";
                        }
                        }catch(err){
                            this.showAlertMessage('danger',err);
                        }
                    }
                })
    }
    /**
    * mostra i commenti
    * crea commento
    * elimina commento
    * @param {*} epcode codice dell'episodio di cui si vuole visualizzare i commenti
    */
    showComments = async(epcode)=>{
            let user = localStorage.getItem('user');
            const comm = await Api.getComments(epcode);
            const ep = await Api.getEpisodeByCode(epcode);
            this.appContainer.innerHTML=showEpComment(ep);
            this.appContainer.insertAdjacentHTML('beforeend',createTableComment());
            const tb = document.getElementById('CommentTableBody');
            if(comm!=undefined){
            for(let c of comm){
                let flag = 1;
                if (c.UsernameFK==user){
                    flag =0;
                }
                tb.insertAdjacentHTML('beforeend',createComment(c,flag));
            }
        }
            this.appContainer.insertAdjacentHTML('beforeend',commentForm());
            
            const but = document.getElementById('comment-form');
            but.addEventListener('submit',async(event)=>{
                event.preventDefault();
                const form = event.target;
                if(form.checkValidity()){
                    try{
                        if(user!=null){
                            if(ep.Price==null||ep.Price==0 || await Api.isBought(ep.Code,ep.Code_Series_FK,user)!=""){
                            await Api.postComm(form.inputComment.value,ep.Code,user);
                            this.showComments(epcode);
                            }else{
                                this.showAlertMessage('warning',`Prima di commentare, acquista l'episodio`)
                            }
                        }
                        else{
                            this.showAlertMessage('warning','Accedi o registrati per commentare');
                        }
                    }
                    catch(err){
                        this.showAlertMessage('danger',err);
                    }
                }
            })
            const del = document.querySelectorAll(`[id^="delbut"]`);
           
            for(let d of del){
                let cc = d.id.split("-")
                d.addEventListener('click',async(event)=>{
                    event.preventDefault();
                    try{
                    await Api.DeleteComment(cc[1]);
                    this.showComments(epcode);
                    }
                    catch(err){this.showAlertMessage('danger',err)};
                })
            }
    }
    /**
    * modifica commento
    * @param {*} event evento del click sul bottone modifica
    * @param {*} com oggetto commento che si andrà a modificare
    * 
    */
    editComment= async(event,com)=>{ 
                event.preventDefault();
                const user = localStorage.getItem("user");
                if(user==null){
                    this.showAlertMessage('danger',"Accedi o registrati per continuare");
                }  
                        const form = event.target;
                        if(form.checkValidity()) {
                        try{
                            await Api.updatecomment(com.Code,form.inputComment.value);
                            
                            page.redirect(`/comments/${com.EpisodeCodeFK}`);
                        }catch(err){
                            this.showAlertMessage('danger',err);
                        } 
        }
    }
    /**
    * crea la pagina del podcast
    * mostra gli episodi
    * da la possibilità di seguire un podcast
    * da la possibilità di salvare un episodio
    * @param {*} code codice del podcast
    */
    seriepage = async(code) =>{
            this.appContainer.innerHTML="";
            const user = localStorage.getItem("user");
            const svgW = `<svg id ="ssavetosave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill-rule="evenodd" d="M6.736 4C4.657 4 2.5 5.88 2.5 8.514c0 3.107 2.324 5.96 4.861 8.12a29.66 29.66 0 004.566 3.175l.073.041.073-.04c.271-.153.661-.38 1.13-.674.94-.588 2.19-1.441 3.436-2.502 2.537-2.16 4.861-5.013 4.861-8.12C21.5 5.88 19.343 4 17.264 4c-2.106 0-3.801 1.389-4.553 3.643a.75.75 0 01-1.422 0C10.537 5.389 8.841 4 6.736 4zM12 20.703l.343.667a.75.75 0 01-.686 0l.343-.667zM1 8.513C1 5.053 3.829 2.5 6.736 2.5 9.03 2.5 10.881 3.726 12 5.605 13.12 3.726 14.97 2.5 17.264 2.5 20.17 2.5 23 5.052 23 8.514c0 3.818-2.801 7.06-5.389 9.262a31.146 31.146 0 01-5.233 3.576l-.025.013-.007.003-.002.001-.344-.666-.343.667-.003-.002-.007-.003-.025-.013A29.308 29.308 0 0110 20.408a31.147 31.147 0 01-3.611-2.632C3.8 15.573 1 12.332 1 8.514z"></path></svg>`
            const svgC = `<svg id ="ssaved"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="24" height="24" class="bi bi-heart-fill" fill="currentColor" > <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/> </svg>`
            const pod = await Api.getSerieById(code);
            let notflw = `<svg id="tofollow" xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" fill="currentColor" class="bi bi-patch-check" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M10.273 2.513l-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911l-1.318.016z"/>
            <path fill-rule="evenodd" d="M10.354 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
          </svg>`;
            let flw =  `<svg id="follow" xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" fill="currentColor" class="bi bi-patch-check-fll" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984a.5.5 0 0 0-.708-.708L7 8.793 5.854 7.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"/>
          </svg>`;
          let f = notflw;
            if(await Api.isFollowed(pod.Code,user)!=""){
                f = flw;
            }
           
            this.appContainer.insertAdjacentHTML('beforeend',createSerie(pod,2,user,f));
            this.appContainer.insertAdjacentHTML('beforeend',createTableSerie());
            
            const allEp = document.getElementById('allEpisodes');
            const apiEpisodes = await Api.getEpisodeFromSeries(code);
            let compr = "Gratis";
            let svg = svgW;
        for(const ep of apiEpisodes){
                svg = svgW; //cuore bianco
                 if((await Api.isSaved(ep.Code,ep.Code_Series_FK,user))!="") {
                      svg = svgC; //cuore colorato
             }                 
                 let flag = 0;
                 if (pod.UsernameFK == user)
                    flag=1;
                    if(await Api.isBought(ep.Code,ep.Code_Series_FK,user)!=""){
                        ep.Price=null;
                        compr = "Acquistato";
                    }
                    allEp.insertAdjacentHTML('beforeend',showEpisode(ep,pod,svg,flag,compr));
            }
        let rows = document.querySelectorAll(`[id^="asave"]`);
        for (const a of rows){
          if(a){
              a.addEventListener('click',async (event)=>{
                console.log(a);
                event.preventDefault();
                    if(user==null){//utente non loggato
                    this.showAlertMessage("danger","Accedi o Registrati per aggiungere i tuoi episodi ai preferiti");
                    }
                    else{//utente loggato
                    const cods = a.id.split("-");
                    switch(event.target.id){
                        case "ssavetosave":
                            //voglio salvare l'episodio
                            await Api.SaveEpisode(cods[1],cods[2],user);
                            a.innerHTML = svgC; 
                            break; 
                        default:
                            //nvoglio rimuovere l'episodio
                            await Api.unSaveEpisode(cods[1],cods[2],user);
                            a.innerHTML = svgW;
                            break;
                    }
                }
              });
          }
          }
        let pay = document.querySelectorAll(`[id^="shop-"]`);
        for(let p of pay){
        p.addEventListener("click",(event)=>{
            event.preventDefault();
            let user = localStorage.getItem('user');
            if (user==null){
                this.showAlertMessage('warning','Accedi o registrati per acquistare');
            }else{
                let code = p.id.split("-");
                page.redirect(`/payments/${code[1]}`);
            }
        })
    }
      //follow section
      let aflw = document.querySelectorAll(`[id^="flw"]`);
      for (const f of aflw){
            if(f){
            f.addEventListener('click',async(event)=>{
                event.preventDefault();
                if(user==null){
                    this.showAlertMessage("danger","Accedi o Registrati per seguire un Podcast");
                    }
                    else{
                let cods = f.id.split("-");
                switch(event.target.id){
                    case "tofollow":
                        f.innerHTML = flw;
                        await Api.follow(cods[1],cods[2]); 
                        break; 
                    default:
                        f.innerHTML = notflw;
                        await Api.unFollow(cods[1],cods[2]);
                        break;
              }
           }
         })       
       }
    }
      //comment section
      let com = document.querySelectorAll('[id="commbut"]');
      for (const c of com){
          c.addEventListener('click',async(event)=>{
              event.preventDefault();
              page.redirect('/comments');
          })
      }
      //delete button
      const del = document.querySelectorAll(`[id^="delbut"]`);
      for(let d of del){
                let cc = d.id.split("-")
                d.addEventListener('click',async(event)=>{
                    event.preventDefault();
                    try{
                    await Api.DeleteEpisode(cc[1]);
                    this.seriepage(code);
                    }
                    catch(err){this.showAlertMessage('danger',err)};
                })
      }
     }   
    /**
    * mostra i podcast seguiti
    * permette di rimuovere il follow al podcast
    * @param {*} user username, per controllare quali podcast segue
    */
    followpage = async(user) =>{
                const allPod = await Api.getAllSeries();
                const notFollowed = `<svg id="tofollow" xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" fill="currentColor" class="bi bi-patch-check" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M10.273 2.513l-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911l-1.318.016z"/>
                <path fill-rule="evenodd" d="M10.354 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
              </svg>`;
                const Following = `<svg id="follow" xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" fill="currentColor" class="bi bi-patch-check-fll" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984a.5.5 0 0 0-.708-.708L7 8.793 5.854 7.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"/>
              </svg>`;
              let svg;
              this.appContainer.innerHTML=showSeries();
            const allSeries = document.getElementById('allSeries');
            allSeries.insertAdjacentHTML('beforeend',`<h1 class="belownav">I podcast che segui</h1>`)
            
                for (const pod of allPod){
                    svg = notFollowed;
                    if(await Api.isFollowed(pod.Code,user)!=""){
                        svg = Following;
                        allSeries.insertAdjacentHTML('beforeend',createSerie(pod,2,user,svg));
                    }
                }
                let rows = document.querySelectorAll(`[id^="flw"]`);
                for (const f of rows){
                f.addEventListener('click',async(event)=>{
                    let cods = f.id.split("-");
                    event.preventDefault();
                    f.innerHTML = notFollowed;
                    try{
                    await Api.unFollow(cods[1],cods[2]);
                    location.reload();
                    }
                    catch(err)
                    {
                        this.showAlertMessage('danger',err);
                    }
                })
            }
    }
    /**
     * restituisce l'svg corrispondente al tipo di categoria. in caso di assenza da un svg di errore
     * @param {*} cat tipo di categoria
     */
    selectCat(cat){
            let pod;
            switch(cat){
                case "Musica":
                    pod=`<svg width="150" height="150" viewBox="0 0 16 16"  class="bi bi-music-note-beamed" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 13c0 1.105-1.12 2-2.5 2S1 14.105 1 13c0-1.104 1.12-2 2.5-2s2.5.896 2.5 2zm9-2c0 1.105-1.12 2-2.5 2s-2.5-.895-2.5-2 1.12-2 2.5-2 2.5.895 2.5 2z"/>
                    <path fill-rule="evenodd" d="M14 11V2h1v9h-1zM6 3v10H5V3h1z"/>
                    <path d="M5 2.905a1 1 0 0 1 .9-.995l8-.8a1 1 0 0 1 1.1.995V3L5 4V2.905z"/>
                  </svg>`;
                    break;
                case "Gaming":
                    pod=`<svg width="150" height="150" viewBox="0 0 16 16" class="bi bi-controller" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M11.119 2.693c.904.19 1.75.495 2.235.98.407.408.779 1.05 1.094 1.772.32.733.599 1.591.805 2.466.206.875.34 1.78.364 2.606.024.815-.059 1.602-.328 2.21a1.42 1.42 0 0 1-1.445.83c-.636-.067-1.115-.394-1.513-.773a11.307 11.307 0 0 1-.739-.809c-.126-.147-.25-.291-.368-.422-.728-.804-1.597-1.527-3.224-1.527-1.627 0-2.496.723-3.224 1.527-.119.131-.242.275-.368.422-.243.283-.494.576-.739.81-.398.378-.877.705-1.513.772a1.42 1.42 0 0 1-1.445-.83c-.27-.608-.352-1.395-.329-2.21.024-.826.16-1.73.365-2.606.206-.875.486-1.733.805-2.466.315-.722.687-1.364 1.094-1.772.486-.485 1.331-.79 2.235-.98.932-.196 2.03-.292 3.119-.292 1.089 0 2.187.096 3.119.292zm-6.032.979c-.877.185-1.469.443-1.733.708-.276.276-.587.783-.885 1.465a13.748 13.748 0 0 0-.748 2.295 12.351 12.351 0 0 0-.339 2.406c-.022.755.062 1.368.243 1.776a.42.42 0 0 0 .426.24c.327-.034.61-.199.929-.502.212-.202.4-.423.615-.674.133-.156.276-.323.44-.505C4.861 9.97 5.978 9.026 8 9.026s3.139.943 3.965 1.855c.164.182.307.35.44.505.214.25.403.472.615.674.318.303.601.468.929.503a.42.42 0 0 0 .426-.241c.18-.408.265-1.02.243-1.776a12.354 12.354 0 0 0-.339-2.406 13.753 13.753 0 0 0-.748-2.295c-.298-.682-.61-1.19-.885-1.465-.264-.265-.856-.523-1.733-.708-.85-.179-1.877-.27-2.913-.27-1.036 0-2.063.091-2.913.27z"/>
                    <path d="M11.5 6.026a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm-1 1a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm2 0a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm-1 1a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm-7-2.5h1v3h-1v-3z"/>
                    <path d="M3.5 6.526h3v1h-3v-1zM3.051 3.26a.5.5 0 0 1 .354-.613l1.932-.518a.5.5 0 0 1 .258.966l-1.932.518a.5.5 0 0 1-.612-.354zm9.976 0a.5.5 0 0 0-.353-.613l-1.932-.518a.5.5 0 1 0-.259.966l1.932.518a.5.5 0 0 0 .612-.354z"/>
                  </svg>`;
                    break;
                case "Arte":
                    pod=`<svg width="150" height="150" viewBox="0 0 16 16" class="bi bi-brush" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M15.825.12a.5.5 0 0 1 .132.584c-1.53 3.43-4.743 8.17-7.095 10.64a6.067 6.067 0 0 1-2.373 1.534c-.018.227-.06.538-.16.868-.201.659-.667 1.479-1.708 1.74a8.117 8.117 0 0 1-3.078.132 3.658 3.658 0 0 1-.563-.135 1.382 1.382 0 0 1-.465-.247.714.714 0 0 1-.204-.288.622.622 0 0 1 .004-.443c.095-.245.316-.38.461-.452.393-.197.625-.453.867-.826.094-.144.184-.297.287-.472l.117-.198c.151-.255.326-.54.546-.848.528-.739 1.2-.925 1.746-.896.126.007.243.025.348.048.062-.172.142-.38.238-.608.261-.619.658-1.419 1.187-2.069 2.175-2.67 6.18-6.206 9.117-8.104a.5.5 0 0 1 .596.04zM4.705 11.912a1.23 1.23 0 0 0-.419-.1c-.247-.013-.574.05-.88.479a11.01 11.01 0 0 0-.5.777l-.104.177c-.107.181-.213.362-.32.528-.206.317-.438.61-.76.861a7.127 7.127 0 0 0 2.657-.12c.559-.139.843-.569.993-1.06a3.121 3.121 0 0 0 .126-.75l-.793-.792zm1.44.026c.12-.04.277-.1.458-.183a5.068 5.068 0 0 0 1.535-1.1c1.9-1.996 4.412-5.57 6.052-8.631-2.591 1.927-5.566 4.66-7.302 6.792-.442.543-.796 1.243-1.042 1.826a11.507 11.507 0 0 0-.276.721l.575.575zm-4.973 3.04l.007-.005a.031.031 0 0 1-.007.004zm3.582-3.043l.002.001h-.002z"/>
                  </svg>`;
                    break;
                case "Informatica":
                    pod=`<svg width="150" height="150" viewBox="0 0 16 16" class="bi bi-cpu" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M5 0a.5.5 0 0 1 .5.5V2h1V.5a.5.5 0 0 1 1 0V2h1V.5a.5.5 0 0 1 1 0V2h1V.5a.5.5 0 0 1 1 0V2A2.5 2.5 0 0 1 14 4.5h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14a2.5 2.5 0 0 1-2.5 2.5v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14A2.5 2.5 0 0 1 2 11.5H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2A2.5 2.5 0 0 1 4.5 2V.5A.5.5 0 0 1 5 0zm-.5 3A1.5 1.5 0 0 0 3 4.5v7A1.5 1.5 0 0 0 4.5 13h7a1.5 1.5 0 0 0 1.5-1.5v-7A1.5 1.5 0 0 0 11.5 3h-7zM5 6.5A1.5 1.5 0 0 1 6.5 5h3A1.5 1.5 0 0 1 11 6.5v3A1.5 1.5 0 0 1 9.5 11h-3A1.5 1.5 0 0 1 5 9.5v-3zM6.5 6a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z"/>
                  </svg>`;
                    break;
                case "Sport":
                    pod=`<svg width="150" height="150" viewBox="0 0 16 16" class="bi bi-trophy" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M2.5.5A.5.5 0 0 1 3 0h10a.5.5 0 0 1 .5.5c0 .538-.012 1.05-.034 1.536a3 3 0 1 1-1.133 5.89c-.79 1.865-1.878 2.777-2.833 3.011v2.173l1.425.356c.194.048.377.135.537.255L13.3 15.1a.5.5 0 0 1-.3.9H3a.5.5 0 0 1-.3-.9l1.838-1.379c.16-.12.343-.207.537-.255L6.5 13.11v-2.173c-.955-.234-2.043-1.146-2.833-3.012a3 3 0 1 1-1.132-5.89A33.076 33.076 0 0 1 2.5.5zm.099 2.54a2 2 0 0 0 .72 3.935c-.333-1.05-.588-2.346-.72-3.935zm10.083 3.935a2 2 0 0 0 .72-3.935c-.133 1.59-.388 2.885-.72 3.935zM3.504 1c.007.517.026 1.006.056 1.469.13 2.028.457 3.546.87 4.667C5.294 9.48 6.484 10 7 10a.5.5 0 0 1 .5.5v2.61a1 1 0 0 1-.757.97l-1.426.356a.5.5 0 0 0-.179.085L4.5 15h7l-.638-.479a.501.501 0 0 0-.18-.085l-1.425-.356a1 1 0 0 1-.757-.97V10.5A.5.5 0 0 1 9 10c.516 0 1.706-.52 2.57-2.864.413-1.12.74-2.64.87-4.667.03-.463.049-.952.056-1.469H3.504z"/>
                  </svg>`;
                    break;
                case "Cucina":
                    pod=`<svg width="150" height="150" viewBox="0 0 16 16" class="bi bi-egg-fried" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M13.665 6.113a1 1 0 0 1-.667-.977L13 5a4 4 0 0 0-6.483-3.136 1 1 0 0 1-.8.2 4 4 0 0 0-3.693 6.61 1 1 0 0 1 .2 1 4 4 0 0 0 6.67 4.087 1 1 0 0 1 1.262-.152 2.5 2.5 0 0 0 3.715-2.905 1 1 0 0 1 .341-1.113 2.001 2.001 0 0 0-.547-3.478zM14 5c0 .057 0 .113-.003.17a3.001 3.001 0 0 1 .822 5.216 3.5 3.5 0 0 1-5.201 4.065 5 5 0 0 1-8.336-5.109A5 5 0 0 1 5.896 1.08 5 5 0 0 1 14 5z"/>
                    <circle cx="8" cy="8" r="3"/>
                  </svg>`;
                    break;
                case "Auto":
                    pod=`<svg width="150" height="150" viewBox="0 0 16 16" class="bi bi-truck" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5v-7zm1.294 7.456A1.999 1.999 0 0 1 4.732 11h5.536a2.01 2.01 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456zM12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12v4zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                  </svg>`;
                    break;
                case "Medicina":
                    pod=`<svg width="150" height="150" viewBox="0 0 16 16" class="bi bi-plus" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                  </svg>`;
                    break;
                case "Social":
                    pod=`<svg width="150" height="150" viewBox="0 0 16 16" class="bi bi-chat-dots" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"/>
                    <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                  </svg>`;
                    break;
                case "Scienze":
                        pod=`<svg width="150" height="150" viewBox="0 0 16 16" class="bi bi-calculator" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M12 1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4z"/>
                        <path d="M4 2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-2zm0 4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm3-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm3-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-4z"/>
                      </svg>`
                      break;
                case "Cinema":
                    pod=`<svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" fill="currentColor" class="bi bi-camera-reels" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M0 8a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 7.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 16H2a2 2 0 0 1-2-2V8zm11.5 5.175l3.5 1.556V7.269l-3.5 1.556v4.35zM2 7a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1H2z"/>
                    <path fill-rule="evenodd" d="M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                    <path fill-rule="evenodd" d="M9 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                  </svg>`
                  break;
                case "SerieTV":
                    pod=`<svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" fill="currentColor" class="bi bi-camera-reels" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M0 8a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 7.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 16H2a2 2 0 0 1-2-2V8zm11.5 5.175l3.5 1.556V7.269l-3.5 1.556v4.35zM2 7a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1H2z"/>
                    <path fill-rule="evenodd" d="M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                    <path fill-rule="evenodd" d="M9 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                  </svg>`
                  break;
                case "Moda":
                    pod=`<svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" fill="currentColor" class="bi bi-bag" viewBox="0 0 16 16">
                    <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
                  </svg>`;
                  break;
                default:
                    pod=`<svg width="150" height="150" viewBox="0 0 16 16" class="bi bi-exclamation-octagon" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M4.54.146A.5.5 0 0 1 4.893 0h6.214a.5.5 0 0 1 .353.146l4.394 4.394a.5.5 0 0 1 .146.353v6.214a.5.5 0 0 1-.146.353l-4.394 4.394a.5.5 0 0 1-.353.146H4.893a.5.5 0 0 1-.353-.146L.146 11.46A.5.5 0 0 1 0 11.107V4.893a.5.5 0 0 1 .146-.353L4.54.146zM5.1 1L1 5.1v5.8L5.1 15h5.8l4.1-4.1V5.1L10.9 1H5.1z"/>
                    <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
                  </svg>`;
                  
            }
            return pod;
    }
    /**
     * crea la zona top3 nella homepage. Fa 3 carousel (uno per podcast) con 3 slide (max) ciascuno con 3 episodi (max) ciascuno
     */
    showTop3 = async()=>{
            const top = await Api.getTop();
            const allCarousel = document.getElementById('allCarousel');
            const pods = document.getElementById('pxd');
            let svgCat;
            let count = 0;     
            let countslide=0;
            for(const pod of top){
                svgCat = this.selectCat(pod.Category);
                allCarousel.insertAdjacentHTML('beforeend',`<div id="car${pod.Code}"> </div>`) ;
                let countep = 1;
                const car = document.getElementById(`car${pod.Code}`);
                const eppod = await Api.getEpisodeFromSeries(pod.Code);
                pods.insertAdjacentHTML('beforeend',createSerie(pod));
                car.insertAdjacentHTML('beforeend',createCarousel(pod,count));
                const slides = document.getElementById(`slides${pod.Code}`);
                slides.insertAdjacentHTML('beforeend',createFirstSlide(countslide));
                for(const ep of eppod){
                        if((countep==4||countep==7)){
                        countslide++;
                        
                        slides.insertAdjacentHTML('beforeend',createFirstSlide(countslide));
                        const x = document.getElementById(`slide${countslide}`); 
                        x.classList.remove('active');
                    }
                    const episodes = document.getElementById(`episodes${countslide}`);
                    episodes.insertAdjacentHTML('beforeend',createEpisode(ep,countep,pod,svgCat));
                    countep++;
                }
                countslide++;
                count ++;
            } 
    }
    /**
     * mostra tutti i podcast nel db
     */
    showAllSeries = async()=>{
          const apiSeries = await Api.getAllSeries();
          const allSeries = document.getElementById('allSeries');
          allSeries.insertAdjacentHTML('beforeend',`<h1> Tutti i podcast </h1>`)
          for(const pod of apiSeries){
            allSeries.insertAdjacentHTML('beforeend',createSerie(pod));
          }
    } 
    /**
     * crea pagina con tutte le macro-categorie
     */        
    showAllCategories = async()=>{
        const apiCat = await Api.getCategories();
        const allSeries = document.getElementById('allSeries');
        let count = 0;
        for(const cat of apiCat){
          let svgCat = this.selectCat(cat.Category);
          allSeries.insertAdjacentHTML('beforeend',createCat(cat.Category,count,svgCat));
          count++;
        }
    }       
    onLogout = async() =>{
        localStorage.clear();  
        await Api.doLogout();           
    } 
    onLoginSubmitted = async (event) => {
        event.preventDefault();
        const form = event.target;
        
        if(form.checkValidity()) {
            try {
                const user = await Api.doLogin(form.inputUser.value, form.inputPassword.value);
                localStorage.setItem('user', user.user);
                localStorage.setItem('name', user.name);
                localStorage.setItem('cat', user.type);
                localStorage.setItem('bd',user.bd);
                localStorage.setItem('email',user.email);
                localStorage.setItem('surname',user.surname)
                this.showAlertMessage('success',`Benvenuto ${user.user}!`); 
                if(localStorage.getItem('cat')!='Creator')
                    this.userContainer.innerHTML= createLoggedNavbar();
                else{
                    this.userContainer.innerHTML= createCreatorNavbar();
                }    
                page.redirect('/');
            } catch(error) {
                console.log(error);
                if (error) {
                    this.showAlertMessage('danger',error); 
                }
            }
        }
    }
    /**modifica episodio
     * se non viene inserito nessun dato, rimette quelli che c'erano nel DB
     * @param {*} event  submit del form 
     * @param {*} ep episodio che si vuole modificare
     */
    editEp = async (event,ep) => {
            event.preventDefault();
            const form = event.target;
            if(form.checkValidity()) {
                let audio = form.editAudio.value;
                if(audio ==""){
                    audio = ep.FileAudio;
                }
                let titolo = form.editTitolo.value;
                if(titolo=="")
                    titolo = ep.Title;
                let desc = form.editDescrizione.value;
                if(desc==""){
                    desc = ep.Description;
                }
                let date = form.editDate.value;
                if(date==""){
                    date = ep.UploadDate;
                }
                let sponsor = form.editSponsor.value;
                if(sponsor==""){
                    sponsor = ep.Sponsor;
                }
                let price = form.editPrice.value;
                if(price=="" || !/^\d+$/.test(price)){
                    price = ep.Price;
                }
                console.log(ep.Price);
                try {
                    await Api.updateEpisode(
                        titolo,
                        audio,
                        desc,
                        date,
                        sponsor,
                        price,
                        ep.Code)
                    page.redirect(`/${ep.Code_Series_FK}/episodes`);
                } catch(error) {
                    console.log(error);
                    if (error) {
                        this.showAlertMessage('danger',error); 
                    }
                }
            }
    }
    /**
     * modifica un podcast
     * @param {*} event submit del form
     * @param {*} pod podcast che si vuole modificare
     */
    editPod = async (event,pod) => {
                event.preventDefault();
                const form = event.target;
                if(form.checkValidity()) {
                    let img = form.editImage.value.slice(12)
                    if(img ==""){
                        img = pod.Image;
                    }
                    try {
                        await Api.updatePod(
                            pod.Code,
                            form.editTitle.value,
                            form.editDescription.value,
                            form.editCategory.value,
                            img
                        )
                        page.redirect(`/profile`);
                    } catch(error) {
                        console.log(error);
                        if (error) {
                            this.showAlertMessage('danger',error); 
                        }
                    }
                }
    }
    onSignupSubmitted = async (event) => {
        event.preventDefault();
        const form = event.target;
        if(form.checkValidity()) {
            try {
                const user = await Api.doSignup(
                    form.inputUser.value,
                    form.inputEmail.value,
                    form.inputPassword.value,
                    form.inputName.value,
                    form.inputSurname.value,
                    form.inputBirthday.value,
                    form.inputType.value);
                localStorage.setItem('user', user.Username);
                this.showAlertMessage('success',`Registrazione avvenuta con successo, esegui il login!`); 
                page.redirect('/');
            } catch(error) {
                if (error) { 
                    this.showAlertMessage('danger',error); 
                }
            }
        }
    }
    /**
     * crea un podcast
     * @param {*} event submit del form 
     */
    createPodcast = async (event) => {
        event.preventDefault();
        const form = event.target;
        const user = localStorage.getItem('user');
        if(form.checkValidity()) {
            try {
                const res = await Api.postPod(
                    form.inputTitle.value,
                    form.inputDescription.value,
                    form.inputCategory.value,
                    form.inputImage.value.slice(12), //remove fakepath
                    user,
                    );
                    let pod = await Api.getSeriesByTitle(form.inputTitle.value);
                page.redirect(`/${pod.Code}/episodes`);
            } catch(error) {
                if (error) { 
                    this.showAlertMessage('danger',error); 
                }
            }
        }
    }
    /**
     * crea un episodio
     * @param {*} user utente che crea l'episodio
     * @param {*} event submit del form
     */
    createepisode = async (user,event) =>{
        event.preventDefault();
        const form = event.target;
        const pods = await Api.getSeriesByUsername(user);
        let pcode;
        for (let p of pods){
            if (p.Title== form.inputPodcastTitle.value){
                pcode = p.Code;
            }
        }
        if(form.checkValidity()) {
            try {
                const res = await Api.postEp(
                    form.inputTitle.value,
                    form.inputAudio.value.slice(12),
                    form.inputDescription.value,
                    form.inputSponsor.value,
                    form.inputPrice.value,
                    this.formatDate(new Date(form.inputUploadDate.value)),
                    form.inputPodcastTitle.value,  
                    pcode,                  
                    user
                    );
                    page.redirect(`/${pcode}/episodes`);
            } catch(error) {
                    this.showAlertMessage('danger',error); 
                    console.log(error);
                }
        }
    }
    /**
     * formatta la data in DD/MM/YYYY
     * @param {*} data data di creazione
     */
    formatDate=(data)=>{
            let g = data.getDate();
            let m = data.getMonth()+1;
            let a = data.getFullYear();
            return g + "/" + m +"/" + a;
    }
    /**
     * esegue la ricerca
     * @param {*} values valori cercati
     * @param {*} flag 1 - cerca solo tra i podcast 2- cerca solo tra gli episodi default- cerca tra episodi e podcast
     * @param {*} cat categoria tra cui cercare 
     */
    onSearch = async(values,flag,cat) =>{
        this.appContainer.innerHTML = "";
        switch (flag){
            case "1":
                this.appContainer.innerHTML = "";
                let res = await Api.searchSeries(values);
                this.appContainer.insertAdjacentHTML('beforeend',`<h1 class="belownav">Podcast:</h1>`);
                for (let el of res){
                        if(cat=="default"||cat==el.Category)
                            this.appContainer.insertAdjacentHTML('beforeend',createSerie(el));
                }
               break;
            case "2":
                this.appContainer.innerHTML = "";
                let ep = await Api.searchEpisodes(values,cat);
                this.appContainer.innerHTML=searchEpisodeTable();
                document.getElementById('title').innerHTML="Episodi:"
                for (let el of ep){
                        document.getElementById('allEpisodes').insertAdjacentHTML('beforeend',fillSearchEpisode(el));
                    }
                break;
            case"0":
                this.appContainer.innerHTML = "";
                let se = await Api.searchSeries(values);
                this.appContainer.insertAdjacentHTML('beforeend',`<h1 class="belownav">Podcast:</h1>`);
                for (let el of se){
                    if(cat=="default"||cat==el.Category)
                        this.appContainer.insertAdjacentHTML('beforeend',createSerie(el));
                }
                let x = await Api.searchEpisodes(values,cat);
                this.appContainer.insertAdjacentHTML('beforeend',searchEpisodeTable());
                document.getElementById('title').innerHTML="Episodi:";
                for (let el of x){
                        document.getElementById('allEpisodes').insertAdjacentHTML('beforeend',fillSearchEpisode(el));
                    }
                    break;
            } 
    }   
}

export default App;
 