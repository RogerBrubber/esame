'use strict';
 
const db = require('../db.js');
const bcrypt = require('bcrypt');

exports.getUser = function(user, password) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM User WHERE Username = ?';
        db.get(sql, [user], (err, row) => {
            if (err) 
                reject(err);
            else if (row === undefined)
                resolve({error: 'No user found with that username.'});
            else {
              const user = {
                            
                            user: row.Username,
                            name: row.Name,
                            surname: row.Surname,
                            type: row.Type,
                            email: row.Email,
                            bd : row.Birthday
                        };
              let check = false;
              
              if(bcrypt.compareSync(password, row.Password))
                check = true; 
              resolve({user, check});
            }
        });
    });
  }
 /**
 * Restituisce un utente in base al nome, utilizzato per deserialize
 * @param {*} user nome utente
 */
  exports.getUserByUsername = function(user) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM User WHERE Username = ?';
        db.get(sql, [user], function(err,row) {
          if (err) 
                  reject(err);
          else if(row===undefined)
          {
            resolve({error:"Username not found"});
          }    
          else {
                 const user = {username: row.Username}  
                  resolve({user});         
               }
        });
    });
  }
 /**
 * Restituisce un utente in base al nome
 * @param {*} user nome utente
 */
  exports.getUserDataByUsername = function(user) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM User WHERE Username = ?';
        db.get(sql, [user], function(err,row) {
          if (err) 
                  reject(err);
          else if(row===undefined)
          {
            resolve({error:"Username not found"});
          }    
          else {  
                  resolve(row);         
               }
        });
    });
  }
 /**
 * Crea un nuovo utente e lo memorizza nel DB
 * @param {*} user oggetto utente con tutti i campi 
 */
exports.createUser = function(user) {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO User( Username, Email, Password,Name,Surname,Type,Birthday) VALUES (?,?,?,?,?,?,?)';
      // create the hash as an async call, given that the operation may be CPU-intensive (and we don't want to block the server)
      bcrypt.hash(user.Password, 10).then((hash => {
        db.run(sql,[user.Username, user.Email, hash, user.Name, user.Surname, user.Type, user.Birthday],function (err) {
          if (err) {
            reject(err);
          } else {
            resolve(this.lastID);
          }
        });
      }));
    });
  }
