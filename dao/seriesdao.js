'use strict';
 
const db = require('../db.js');
const series= require ('../client/javascripts/series.js');

const createSeries = function(dbserie){
    return new series(dbserie.Code, dbserie.Title, dbserie.Description ,dbserie.Category, dbserie.Image, dbserie.UsernameFK);
}
 /**
 * Restituisce tutti i podcast
 */
exports.getSeries = function() {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM Series';
        db.all(sql,[], (err, rows) => {
            if (err) 
                reject(err);
            else {  
                let x = rows.map((row)=> createSeries(row));
               resolve(x);               
            }
        });
    });
}
/**
 * Restituisce i podcast creati da un utente 
 * @param {*} username nome dell'utente di cui si vuole visualizzare i podcast 
 */
exports.getSeriesByUser = function(username){
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM Series WHERE UsernameFK = ?';
        db.all(sql,[username], (err, rows) => {
            if (err) 
                reject(err);
            else {
               let x = rows.map((row)=> createSeries(row));
               resolve(x);               
            }
        });
    });
}
/**
 * Restituisce i podcast salvati da un utente 
 * @param {*} username nome dell'utente di cui si vuole visualizzare i podcast salvati
 */
exports.getSavedSeries = function(username){
    return new Promise((resolve, reject) => {
        const sql = 'SELECT DISTINCT E.* FROM Save as S, Series, User as U, Episode as E WHERE E.SeriesTitle = Series.Title AND S.Code_Series_FK = Series.Code AND S.UsernameFK = ? and E.Title = S.EpisodeTitle';
        db.all(sql,[username], (err, rows) => {
            if (err) 
                reject(err);
            else {
               let x = rows.map((row)=> createSeries(row));
               resolve(x);               
            }
        });
    });
}
 /**
 * Restituisce i podcast con un determinato titolo
 * @param {*} title titolo del podcast da restituire
 */
exports.getSeriesByTitle = function(title){
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM Series WHERE Title = ?';
        db.all(sql,[title], (err, rows) => {
            if (err) 
                reject(err);
            else {
               let x = rows.map((row)=> createSeries(row));
               resolve(x[0]);               
            }
        });
    });
}
 /**
 * Restituisce i podcast con un determinato codice
 * @param {*} code codice del podcast da restituire
 */
exports.getSeriesById = function(code){
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM Series WHERE Code = ?';
        db.get(sql,[code], (err, rows) => {
            if (err) 
                reject(err);
            else {
               resolve(createSeries(rows));             
            }
        });
    });
}
/**
 * Restituisce i 3 migliori podcast. La classifica viene fatta in base a quanti utenti seguono il determinato podcast
 */
exports.getTopSeries = function(){
    return new Promise((resolve, reject) => {
        const sql = 'SELECT S.*,COUNT(Code_Series_FK ) FROM Follow as F, Series as S  WHERE S.Code = F.Code_Series_FK GROUP BY Code_Series_FK ORDER BY COUNT(Code_Series_FK) DESC LIMIT 3';
        db.all(sql, (err, rows) => {
            if (err) 
                reject(err);
            else {
               let x = rows.map((row)=> createSeries(row));
               resolve(x);               
            }
        });
    });
}
/**
 * Permette  un utente di creare un nuovo podcast
 * @param {*} newseries oggetto series, è il nuovo podcast 
 */
exports.addSeries = function(newseries){
    return new Promise((resolve,reject) => {
        const sql = 'INSERT INTO Series (Title, Description, Category, Image, UsernameFK) VALUES (?,?,?,?,?)';
        db.run(sql,[newseries.title, newseries.desc, newseries.cat, newseries.image,newseries.user],function (err) {
            if(err){
                reject(err);
            } else {
                resolve(this.lastID);
            }
    });
    });
}
/**
 * Permette a  un utente di modifcare i campi di un podcast
 * @param {*} code codice del podcast 
 * @param {*} title nuovo titolo del podcast
 * @param {*} desc nuova descrizione del podcast
 * @param {*} cat nuova categoria del podcast
 * @param {*} image nuova immagine del podcast
 */
exports.updateSeries = function(code,title,desc,cat,image){
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE series SET Title = ?, Description = ?, Category = ?, Image = ? WHERE code = ?';
        db.run(sql, [title,desc,cat,image,code], function (err) {
            if(err){
                reject(err);
            } else if (this.changes === 0)
                resolve({error: 'Series not found. Check the code field'});
            else {
                resolve(this.lastID);
        }
        })
    });
}
/**
 * Elimina un podcast dal DB
 * @param {*} code codice del podcast da eliminare
 */
exports.deleteSeries = function(code) {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM Series WHERE Code = ?';
        db.run(sql, [code], function(err) {
            if(err)
                reject(err);
            else if (this.changes === 0)
                resolve({error: 'Series not found.'});
            else {
                resolve(this.lastID);
            }
        });
    });
}
/**
 * Restituisce tutti i podcast in base al testo richiesto 
 * @param {*} form testo inserito dall'utente per cercare
 */
exports.searchSeries = function(form){
    return new Promise((resolve, reject) => {
        const sql = `SELECT DISTINCT * FROM Series as S WHERE (Category LIKE '%' || ? || '%' OR Title LIKE  '%' || ? || '%'  OR Description LIKE '%' || ? || '%')`;
        db.all(sql,[form,form,form], (err, rows) => {
            if (err) 
                reject(err);
            else {
               resolve(rows);               
            }
        });
    });
}
//FOLLOW
/**
 * Controlla se un utente segue un determinato podcast
 * @param {*} code codice del podcast da controllare
 * @param {*} user nome dell'utente di cui si vuole controllare se segue il podcast
 */
exports.isFollowed = function(code,user){
    return new Promise((resolve,reject) => {
        const sql = 'SELECT * FROM FOLLOW WHERE Code_Series_FK = ? AND UsernameFK = ? ';
        db.all(sql,[code,user],function (err,res) {
            if(err){
                reject(err);
            } else {
               resolve(res); 
            }
        });
    });
}
 /**
 * Permette  un utente di smettere di seguire un determinato podcast
 * @param {*} code codice del podcast 
 * @param {*} user nome dell'utente che vuole smettere di seguire il podcast
 */
exports.deleteFollow = function(code,user) {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM Follow WHERE Code_Series_FK = ? AND UsernameFK = ?';
        db.run(sql, [code,user], function(err) {
            if(err)
                reject(err);
            else if (this.changes === 0)
                resolve({error: 'Followed series not found.'});
            else {
                resolve(this.lastID);
            }
        });
    });
}
 /**
 * Permette  un utente  di seguire un determinato podcast
 * @param {*} code codice del podcast 
 * @param {*} user nome dell'utente che vuole seguire il podcast
 */
exports.addFollow = function(code,user){
    return new Promise((resolve,reject) => {
        const sql = 'INSERT INTO Follow (Code_Series_FK,UsernameFK) VALUES (?,?)';
        db.run(sql,[code,user],function (err) {
            if(err){
                reject(err);
            } else {
                resolve(this.lastID);
            }
    });
    });
}
 /**
 * Restituisce le serie seguite dall'utente
 * @param {*} user nome dell'utente di cui trovare il le serie seguite
 */
exports.getFollowedSeries = function(user) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT S.Title FROM Series AS S , User as U, Follow as F WHERE S.Code = F.Code_Series_FK AND U.Username = ? AND U.Username = F.UsernameFK';
        db.all(sql,[user], (err, rows) => {
            if (err) 
                reject(err);
            else {
               let x = rows.map((row)=> createSeries(row));
               resolve(x);               
            }
        });
    });
}
 /**
 * Restituisce tutte le categorie esistenti
 */
exports.getCategories = function(){
    return new Promise((resolve, reject) => {
        const sql = 'SELECT DISTINCT Category FROM Series';
        db.all(sql,[], (err, rows) => {
            if (err) 
                reject(err);
            else {
               resolve(rows);               
            }
        });
    });
}
