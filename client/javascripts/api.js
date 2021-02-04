class Api {

    static doLogin = async (username, password) => {
        let response = await fetch('/api/sessions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username,password}),
        });
        if(response.ok) {
            const username = await response.json();
            return username;
        }
        else {
            try {
                const errDetail = await response.json();
                throw errDetail.message;
            }
            catch(err) {
                throw err;
            }
        }
      }
    static doSignup = async(Username,Email,Password,Name,Surname,Birthday,Type) =>{
        let response = await fetch('/users', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({Username,Email,Password,Name,Surname,Birthday,Type}),
        });
        if(response.ok) {
            return response;
        }
        else {
            try {
                const errDetail = await response.json();
                throw errDetail.message;
            }
            catch(err) {
                throw err;
            }
        }
    }
    static doLogout = async()=>{
        await fetch('/api/sessions/current', {
            method: 'DELETE',
        });
    }
     /**
     * restituisce tutti i podcast
     */
    static getAllSeries= async()=> {
        let response = await fetch('/api/series');
        const seriesJson = await response.json();
        if (response.ok) {
            return seriesJson;
        } else {
            throw seriesJson;
        }
    }
    /**
     * aggiunge un podcast
     * @param {*} title titolo del podcast
     * @param {*} desc descrizione del podcast
     * @param {*} cat categoria del podcast
     * @param {*} image immagine del podcast
     * @param {*} user nome utente del creatore podcast
     */
    static postPod = async(title,desc,cat,image,user) =>{
        let response = await fetch('/api/newpod', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({title,desc,cat,image,user}),
        });
        if(response.ok) {
            return response;
        }
        else {
            try {
                const errDetail = await response.json();
                throw errDetail.message;
            }
            catch(err) {
                throw err;
            }
        }
    }
     /**
     * aggiunge un episodio
     * @param {*} title titolo dell'episodio
     * @param {*} audio file audio dell'episodio
     * @param {*} desc descrizione dell'episodio
     * @param {*} sponsor sponsor dell'episodio
     * @param {*} price prezzo utente dell'episodio
     * @param {*} date data pubblicazione utente dell'episodio
     * @param {*} podtitle titolo del podcast dell'episodio
     * @param {*} pcode codice del podcast dell'episodio
     * @param {*} user nome utente del creatore dell'episodio
     * 
     */
    static postEp = async(title,audio,desc,sponsor,price,date,podtitle,pcode,user) =>{
        let response = await fetch('/api/newep', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({title,audio,desc,sponsor,price,date,podtitle,pcode,user}),
        });
        if(response.ok) {
            const pod = await response;
            return pod;
        }
        else {
            try {
                const errDetail = await response.json();
                throw errDetail.message;
            }
            catch(err) {
                throw err;
            }
        }
    }
    /**
     * aggiunge un commento
     * @param {*} msg testo del commento
     * @param {*} ep codice dell'episodio a cui si riferisce
     * @param {*} user nome utente del creatore del commento
     * 
     */
    static postComm = async(msg,ep,user) =>{
        let response = await fetch('/api/newcomm', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({msg,ep,user}),
        });
        if(response.ok) {
            return response;
            
        }
        else {
                const errDetail = await response.json();
                throw errDetail.message;
        }
    }
    /**
     * compra un episodio
     * @param {*} pod codice del podcast a cui si riferisce
     * @param {*} ep codice dell'episodio da comprare
     * @param {*} user nome utente di chi vuole comprare
     * 
     */
    static BuyEpisode = async(pod,ep,user) =>{
        let response = await fetch('/api/buyep', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({pod,ep,user}),
        });
        if(response.ok) {
            return response;
        }
        else {
                const errDetail = await response.json();
                throw errDetail.message;
        }
    }
    
    /**
     * restituisce tutti i commenti
     * @param {*} ep codice dell'episodio di cui si vuole visualizzare i commenti
     */
    static getComments= async(ep)=> {
        let response = await fetch(`/api/comments/${ep}`);
        const commJson = await response.json();
        if (response.ok) {
            return commJson;
        } else {
            throw commJson;
        }
    }
    /** 
     * restituisce un commento
     * @param {*} ep codice del commento da visualizzare
     */
    static getCommentByCode= async(code)=> {
        let response = await fetch(`/api/getcomm/${code}`);
        const commJson = await response.json();
        if (response.ok) {
            return commJson;
        } else {
            throw commJson;
        }
    }
    /** 
     * elimina un commento
     * @param {*} ep codice del commento da eliminare
     */
    static DeleteComment = async (code) => {
        let response = await fetch('/api/delcomm' , {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({code}),
        })
        if(response.ok){
            return response;
        }
        else{
        try {
                const errDetail = await response;
                throw errDetail.message;
            }
            catch(err) {
                throw err;
            }
        }
      }  
    /** 
     * modifica un commento
     * @param {*} code codice del commento da modificare
     * @param {*} text nuovo testo del commento
     */
      static updatecomment = async(code,text) => {
        let response = await fetch('/api/updatecomment' , {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({code,text}),
        })
        if(response.ok){
            return response;
        }
        else{
                const errDetail = await response;
                throw errDetail.message;
        }
    }
    /** 
     * controlla se un episodio è stato salvato da un utente
     * @param {*} epcode codice dell'episodio da controllare
     * @param {*} code codice del podcast da controllare
     * @param {*} user username dell'utente da controllare
     * 
     */
    static isSaved = async(epcode,code,user) =>{
        let response = await fetch(`/api/issaved/${epcode}/${code}/${user}`);           
        const seriesJson = await response.json();
        
        if (response.ok) {
            return seriesJson;
        }
        else{
            return seriesJson;
        }
    }
    /** 
     * controlla se un episodio è stato comprato da un utente
     * @param {*} epcode codice dell'episodio da controllare
     * @param {*} code codice del podcast da controllare
     * @param {*} user username dell'utente da controllare
     * 
     */
    static isBought = async(epcode,code,user) =>{
        let response = await fetch(`/api/isbought/${epcode}/${code}/${user}`);           
        const seriesJson = await response.json();
        
        if (response.ok) {
            return seriesJson;
        }
        else{
            return seriesJson;
        }
    }
    /** 
     * elimina un episodio
     * @param {*} code codice dell'episodio da eliminare
     */
    static DeleteEpisode = async (code) => {
        let response = await fetch('/api/delep' , {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({code}),
        })
        if(response.ok){
            return response;
        }
        else{
        try {
                const errDetail = await response;
                throw errDetail.message;
            }
            catch(err) {
                throw err;
            }
        }
    }  
    /** 
    * elimina un podcast
    * @param {*} code codice del podcast da eliminare
    */
    static DeleteSerie = async (code) => {
        let response = await fetch('/api/delpod' , {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({code}),
        })
        if(response.ok){
            return response;
        }
        else{
        try {
                const errDetail = await response;
                throw errDetail.message;
            }
            catch(err) {
                throw err;
            }
        }
    }  
    /** 
     * permette a un utente di salvare un episodio di un certo podcast
     * @param {*} epcode codice dell'episodio da salvare
     * @param {*} code codice del podcast dell'episodio
     * @param {*} user username dell'utente che vuole salvare
     * 
     */
    static SaveEpisode = async (epcode,code,user) => {
        let response = await fetch('/api/save', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({epcode,code,user}),
        });
        if(response.ok){
            return response;
        }
        else{
        try {
                const errDetail = await response;
                throw errDetail.message;
            }
            catch(err) {
                throw err;
            }
        }
    }
    /** 
     * permette a un utente di rimuovere dai salvati un episodio di un certo podcast
     * @param {*} epcode codice dell'episodio da rimuovere
     * @param {*} code codice del podcast dell'episodio
     * @param {*} user username dell'utente che vuole rimuovere
     * 
     */
    static unSaveEpisode = async (epcode,code,user) => {
        let response = await fetch('/api/unsave' , {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({epcode,code,user}),
        })
        if(response.ok){
            return response;
        }
        else{
        try {
                const errDetail = await response;
                throw errDetail.message;
            }
            catch(err) {
                throw err;
            }
        }
    }  
    /**
    * restituisce un determinato episodio
    * @param {*} ep codice dell'episodio da visualizzare
    */
    static getEpisodeByCode= async(ep)=> {
        let response = await fetch(`/api/episodes/code/${ep}`);
        const commJson = await response.json();
        if (response.ok) {
            return commJson;
        } else {
            throw commJson;
        }
    }
    /** 
     * controlla se un podcast è seguito da un utente
     * @param {*} code codice del podcast da controllare
     * @param {*} user username dell'utente da controllare
     * 
     */
    static isFollowed = async(code,user) =>{
        let response = await fetch(`/api/isfollowed/${code}/${user}`);           
        const seriesJson = await response.json();
        
        if (response.ok) {
            return seriesJson;
        }
        else{
            return seriesJson;
        }
    } 
    /** 
     * permette a un utente di seguire un certo podcast
     * @param {*} code codice del podcast da seguire
     * @param {*} user username dell'utente che vuole seguire
     * 
     */
    static follow = async (code,user) => {
        let response = await fetch('/api/follow', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({code,user}),
        });
        if(response.ok){
            return response;
        }
        else{
        try {
                const errDetail = await response;
                throw errDetail.message;
            }
            catch(err) {
                throw err;
            }
        }
    }
    /** 
     * permette a un utente di smettere di seguire un certo podcast
     * @param {*} code codice del podcast da smettere di seguire
     * @param {*} user username dell'utente che vuole smettere di seguire
     * 
     */
    static unFollow = async (code,user) => {
        let response = await fetch('/api/unfollow' , {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({code,user}),
        })
        if(response.ok){
            return response;
        }
        else{
        try {
                const errDetail = await response;
                throw errDetail.message;
            }
            catch(err) {
                throw err;
            }
        }
    }
     /** 
     * aggiorna un podcast
     * @param {*} code codice del podcast da aggiornare
     * @param {*} title nuovo titolo del podcast da aggiornare
     * @param {*} desc nuova descrizione del podcast da aggiornare
     * @param {*} cat nuova categoria del podcast da aggiornare
     * @param {*} image nuova immagine del podcast da aggiornare
     * 
     */
     static updatePod = async(code,title,desc,cat,image) => {
        let response = await fetch('/api/updatepod' , {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({code,title,desc,cat,image}),
        })
        if(response.ok){
            return response;
        }
        else{
        try {
                const errDetail = await response;
                throw errDetail.message;
            }
            catch(err) {
                throw err;
            }
        }
    }
    /** 
     * aggiorna un episodio
     * @param {*} title nuovo titolo dell' episodio da aggiornare
     * @param {*} audio nuovo file audio dell' episodio da aggiornare
     * @param {*} desc nuova descrizione dell' episodio da aggiornare
     * @param {*} date nuova data di pubblicazione dell' episodio da aggiornare
     * @param {*} sponsor nuovo sponsor dell' episodio da aggiornare
     * @param {*} price nuovo prezzo dell' episodio da aggiornare
     * @param {*} code codice dell' episodio da aggiornare
     * 
     */
    static updateEpisode = async(title,audio,desc,date,sponsor,price,code) => {
        let response = await fetch('/api/updateepisode' , {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title,audio,desc,date,sponsor,price,code}),
        })
        if(response.ok){
            return response;
        }
        else{
        try {
                const errDetail = await response;
                throw errDetail.message;
            }
            catch(err) {
                throw err;
            }
        }
    }
    /**
    * restituisce un determinato podcast
    @param {*} code codice del podcast da visualizzare
    */
    static getSerieById = async(code)=> {
        let response = await fetch(`/api/series/${code}`);
        const seriesJson = await response.json();
        if (response.ok) {
            return seriesJson;
        } else {
            throw seriesJson;
        }
    }
    /**
    * restituisce le categorie
    */
    static getCategories= async()=> {
        let response = await fetch('/api/cat');
        const seriesJson = await response.json();
        if (response.ok) {
            return seriesJson;
        } else {
            throw seriesJson;
        }
    }
    /**
    * restituisce la top-3 podcast seguiti
    */
    static getTop = async()=>{
        let response = await fetch('/api/top3');
        const seriesJson = await response.json();
        if (response.ok) {
            return seriesJson;
        } else {
            throw seriesJson;
        }
    }
    /**
    * restituisce gli episodi di un podcast
    @param {*} code codice del podcast di cui si vuole visualizzare gli episodi
    */
    static getEpisodeFromSeries = async(code)=>{
        let response = await fetch(`/api/${code}/episodes`);
        const seriesJson = await response.json();
        
        if (response.ok) {
            return seriesJson;
        } else {
            throw seriesJson;
        }
    }
    /**
    * restituisce i podcast creati da un utente
    @param {*} user username dell'utente che ha creato i podcast
    */
    static getSeriesByUsername = async(user)=> {
        let response = await fetch(`/api/getseries/${user}`);
        const seriesJson = await response.json();
        if (response.ok) {
            return seriesJson;
        } else {
            throw seriesJson;
        }
    }
    /**
    * restituisce il podcast con un certo nome
    @param {*} title titolo del podcast da visualizzare
    */
    static getSeriesByTitle = async(title)=> {
        let response = await fetch(`/api/getseries/title/${title}`);
        const seriesJson = await response.json();
        if (response.ok) {
            return seriesJson;
        } else {
            throw seriesJson;
        }
    }
    /**
    * restituisce tutti gli episodi
    */
    static getAllEpisodes = async()=>{
        let response = await fetch('/api/allepisodes');
        const seriesJson = await response.json();
        if (response.ok) {
            return seriesJson;
        } else {
            throw seriesJson;
        }
    }
    /**
    * restituisce un utente in base all'username
    @param {*} user username dell'utente di cui si vuole ottenere l'oggetto utente
    */
    static getUserByUsername= async(user)=>{
        let response = await fetch(`/api/getuser/${user}`);
        const seriesJson = await response.json();
        if (response.ok) {
            return seriesJson;
        } else {
            throw seriesJson;
        }
    }
    /**
    * restituisce i podcast che contengono il testo cercato
    @param {*} form testo cercato per trovare i podcast
    */
    static searchSeries= async(form)=>{
        let response = await fetch(`/api/search/series/${form}`);
        const seriesJson = await response.json();
        if (response.ok) {
            return seriesJson;
        } else {
            throw seriesJson;
        }
    }
    /**
    * restituisce gli episodi che contengono il testo cercato
    @param {*} form testo cercato per trovare gli episodi
    */
    static searchEpisodes= async(form,cat)=>{
        let response = await fetch(`/api/search/episodes/${form}/${cat}`);
        const seriesJson = await response.json();
        if (response.ok) {
            return seriesJson;
        } else {
            throw seriesJson;
        }
    }

  }
    
  export default Api;


  