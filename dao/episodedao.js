'use strict';
 /**
 * restituisce i podcast di un creatore dato l'id
 * @param {*} id id del creatore
 */
const db = require('../db.js');
const episode = require('../client/javascripts/episode.js');
const moment = require('../client/javascripts/moment');

const createEpisode = function(dbepisode){
    return new episode(dbepisode.Code,dbepisode.Title, dbepisode.FileAudio, dbepisode.Code_Series_FK, dbepisode.Description,dbepisode.UploadDate, dbepisode.Sponsor, dbepisode.Price, dbepisode.UsernameFK, dbepisode.SeriesTitle );
}

//Episode
 /**
 * Inserisce un nuovo episodio nel DB
 * @param {*} ep oggetto Episode
 */
exports.addEpisode = function(ep){
    return new Promise((resolve,reject) => {
        const sql = 'INSERT INTO Episode (Title, FileAudio, Code_Series_FK, Description, UploadDate, Sponsor, Price, UsernameFK, SeriesTitle) VALUES (?,?,?,?,?,?,?,?,?)';
        db.run(sql,[ep.title,ep.audio,ep.pcode,ep.desc,ep.date,ep.sponsor,ep.price,ep.user,ep.podtitle],function (err) {
            if(err){
                reject(err);
            } else {
                resolve(this.lastID);
            }
        });
    });
}
/**
 * Restituisce tutti gli episodi
 */
exports.getEpisodes = function() {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM Episode';
        db.all(sql,[], (err, rows) => {
            if (err) 
                reject(err);
            else {
               let x = rows.map((row)=> createEpisode(row));
               resolve(x);               
            }
        });
    });
}
/**
 * Restituisce l'episodio con un determinato titolo
 * @param {*} title titolo dell'episodio da cercare
 */
exports.getEpisodeByTitle = function(title) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM Episode WHERE Title = ?';
        db.get(sql,[title], (err, rows) => {
            if (err) 
                reject(err);
            else {
               resolve(createEpisode(rows));               
            }
        });
    });
}
/**
 * Restituisce l'episodio con un determinato codice
 * @param {*} code codice dell'episodio da cercare
 */
exports.getEpisodeByCode = function(code) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM Episode WHERE Code = ?';
        db.get(sql,[code], (err, rows) => {
            if (err) 
                reject(err);
            else {
               resolve(createEpisode(rows));               
            }
        });
    });
}
/**
 * Restituisce gli episodi di un determinato Podcast
 * @param {*} code codice della serie
 */
exports.getEpisodesFromSeries = function(code) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM Episode WHERE Code_Series_FK = ?';
        db.all(sql,[code], (err, rows) => {
            if (err) 
                reject(err);
            else {
               let x = rows.map((row)=> createEpisode(row));
               resolve(x);               
            }
        });
    });
}
/**
 * Elimina l'episodio con un determinato codice
 * @param {*} code codice dell'episodio da eliminare
 */
exports.deleteEpisode = function(code) {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM Episode WHERE Code = ?';
        db.run(sql, [code], function(err) {
            if(err)
                reject(err);
            else if (this.changes === 0)
                resolve({error: 'Episode not found.'});
            else {
                resolve(this.lastID);
            }
        });
    });
}
/**
 * Modifica l'episodio con un determinato codice
 * @param {*} code codice dell'episodio da modificare
 */
exports.updateEpisode = function(title,audio,desc,date,sponsor,price,code){
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE Episode SET Title=?, FileAudio=?, Description=?, UploadDate=?, Sponsor=?, Price=? WHERE Code = ?';
        db.run(sql, [title,audio,desc,date,sponsor,price,code], function (err) {
            if(err){
                reject(err);
            } else if (this.changes === 0)
                {
                resolve({error: 'Episode not found'});
                }else {
                resolve(this.lastID);
        }
        })
    });
}
/**
 * Salva tra i preferiti l'episodio con un determinato codice
 * @param {*} epcode codice dell'episodio da salvare
 * @param {*} code codice del podcast dell'episodio da salvare
 * @param {*} user nome dell'utente che vuole salvare l'episodio
 */
exports.SaveEpisode = function(epcode,code,user){
    return new Promise((resolve,reject) => {
        const sql = 'INSERT INTO Save (EpisodeCode, Code_Series_FK, UsernameFK) VALUES (?,?,?)';
        db.run(sql,[epcode,code,user],function (err) {
            if(err){
                reject(err);
            } else {
                resolve(this.lastID);
            }
    });
    });
}
/**
 * Controlla se un utente ha salvato determinato episodio
 * @param {*} epcode codice dell'episodio da controllare
 * @param {*} code codice del podcast dell'episodio da controllare
 * @param {*} user nome dell'utente di cui si vuole controllare se l'episodio è salvato
 */
exports.isSaved = function(epcode,code,user){
    return new Promise((resolve,reject) => {
        const sql = 'SELECT * FROM SAVE WHERE EpisodeCode = ? AND Code_Series_FK = ? AND  UsernameFK = ? ';
        db.all(sql,[epcode,code,user],function (err,res) {
            if(err){
                reject(err);
            } else {
               resolve(res); 
            }
        });
    });
}

/**
 * Rimuove un epiosdio dai salvati di un utente
 * @param {*} epcode codice dell'episodio da rimuovere
 * @param {*} code codice del podcast dell'episodio da rimuovere
 * @param {*} user nome dell'utente di cui si vuole rimuovere l'episodio dai salvati
 */
exports.UnsaveEpisode = function(epcode,code,user) {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM Save WHERE EpisodeCode = ? AND Code_Series_FK = ? AND UsernameFK = ?';
        db.run(sql, [epcode,code,user], function(err) {
            if(err){
                reject(err);
        }
            else if (this.changes === 0)
            {
                resolve({error: 'Saved episode not found.'});}
            else {
                resolve(this.lastID);
            }
        });
    });
}
/**
 * Acquista l'episodio scelto dall'utente 
 * @param {*} code codice del podcast dell'episodio da comprare
 * @param {*} epcode codice dell'episodio da comprare
 * @param {*} user nome dell'utente che vuole comprare l'episodio
 */
exports.PurchaseEpisode = function(code,epcode,user){
    return new Promise((resolve,reject) => {
        const sql = 'INSERT INTO Purchase (Code_Series_FK,EpisodeCode,UsernameFK) VALUES (?,?,?)';
        db.run(sql,[code,epcode,user],function (err) {
            if(err){
                reject(err);
            } else {
                resolve(this.lastID);
            }
    });
    });
}
/**
 * Controlla se un utente ha comprato un determinato episodio
 * @param {*} epcode codice dell'episodio da controllare
 * @param {*} code codice del podcast dell'episodio da controllare
 * @param {*} user nome dell'utente di cui si vuole controllare se l'episodio è stato acquistato
 */
exports.isBought = function(epcode,code,user){
    return new Promise((resolve,reject) => {
        const sql = 'SELECT * FROM Purchase WHERE EpisodeCode = ? AND Code_Series_FK = ? AND  UsernameFK = ? ';
        db.all(sql,[epcode,code,user],function (err,res) {
            if(err){
                reject(err);
            } else {
               resolve(res); 
            }
        });
    });
}


/**
 * Restituisce gli episodi in base al testo richiesto 
 * @param {*} cat categoria dei podcast per filtrare
 * @param {*} form testo inserito dall'utente per cercare
 */
exports.searchEpisode = function(cat,form){
    let par = [cat,form,form];
    let sql = `SELECT DISTINCT E.* FROM Episode as E, Series as S WHERE S.Code = E.Code_Series_FK AND S.Category LIKE '%' || ? || '%' AND (E.Title LIKE '%' || ? || '%' OR E.Description LIKE '%' || ? || '%')`;
    if(cat==="default"){
        sql = `SELECT DISTINCT * FROM Episode  WHERE (Title LIKE '%' || ? || '%' OR Description LIKE '%' || ? || '%')`;
    par = [form,form];
    }
        return new Promise((resolve, reject) => {
        db.all(sql,par, (err, rows) => {
            if (err) 
                reject(err);
            else {
               resolve(rows);               
            }
        });
    });
}
//comments
 /**
 * Inserisce un nuovo commento nel DB
 * @param {*} msg testo del commento
 * @param {*} ep codice episodio a cui si riferisce il commento
 * @param {*} user autore del commento
 */
exports.addComment = function(msg,ep,user){
    return new Promise((resolve,reject) => {
        const sql = 'INSERT INTO Comment (Text,EpisodeCodeFK,UsernameFK) VALUES (?,?,?)';
        db.run(sql,[msg,ep,user],function (err) {
            if(err){
                reject(err);
            } else {
                resolve(this.lastID);
            }
    });
    });
}
/**
 * Restituisce tutti i commenti di un episodio
 * @param {*} ep episodio di cui si vuole visualizzare i commenti
 */
exports.getComment = function(ep){
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM Comment WHERE  EpisodeCodeFK = ? `;

        db.all(sql,[ep], (err, rows) => {
            if (err) 
                reject(err);
            else {
               resolve(rows);             
            }
        });
    });
}
/**
 * Restituisce un determinato commento 
 * @param {*} code codice del commento che si vuole visualizzare
 */
exports.getCommentByCode = function(code) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM Comment WHERE Code = ?';
        db.get(sql,[code], (err, rows) => {
            if (err) 
                reject(err);
            else {
               resolve(rows);               
            }
        });
    });
}
 /**
 * Modifica un commento già esistente
 * @param {*} text testo del nuovo commento
 * @param {*} code codice del commento da modificare
 */
exports.updateComment = function(code,text){
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE Comment SET Text = ? WHERE Code = ?';
        db.run(sql, [text,code], function (err) {
            if(err){
                reject(err);
            } else if (this.changes === 0)
                resolve({error: 'Comment not found. Check the code field'});
            else {
                resolve();
        }
        })
    });
}
    

 /**
 * Elimina un commento dal DB
 * @param {*} code codice del commento da eliminare
 */
exports.deleteComment = function(code) {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM Comment WHERE Code = ?';
        db.run(sql, [code], function(err) {
            if(err)
                reject(err);
            else if (this.changes === 0)
                resolve({error: 'Comment not found.'});
            else {
                resolve();
            }
        });
    });
}
