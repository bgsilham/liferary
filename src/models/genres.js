const db = require('../utils/DB')

module.exports = {
  getAllGenre: (start, end, data = {}) => {
    const sql = `SELECT * FROM genres 
    WHERE name LIKE '${data.search || ''}%' 
    ORDER BY name ${parseInt(data.sort) ? 'DESC' : 'ASC'}
    LIMIT ${end} OFFSET ${start}`
    return new Promise((resolve, reject) => {
      db.query(sql, (error, result, fields) => {
        if (error) {
          reject(Error(error))
        }
        resolve(result)
      })
    })
  },
  getGenreCount: (data = {}) => {
    const sql = `SELECT COUNT(*) as total FROM genres
    WHERE name LIKE '${data.search || ''}%' 
    ORDER BY name ${parseInt(data.sort) ? 'DESC' : 'ASC'}`
    return new Promise((resolve, reject) => {
      db.query(sql, (error, result) => {
        if (error) {
          reject(Error(error))
        }
        resolve(result[0].total)
      })
    })
  },
  createGenre: (data) => {
    const sql = 'INSERT INTO genres SET ?'
    return new Promise((resolve, reject) => {
      db.query(sql, data, (error, result) => {
        if (error) {
          reject(Error(error))
        }
        console.log(result)
        resolve(result.insertId)
      })
    })
  },
  getGenreByCondition: (data) => {
    const sql = 'SELECT * FROM genres WHERE ?'
    return new Promise((resolve, reject) => {
      db.query(sql, data, (error, result) => {
        if (error) {
          reject(Error(error))
        }
        resolve(result)
      })
    })
  },
  updateGenre: (data) => {
    const sql = 'UPDATE genres SET ? WHERE ?'
    return new Promise((resolve, reject) => {
      db.query(sql, data, (error, result) => {
        if (error) {
          reject(Error(error))
        }
        resolve(result.affectedRows)
      })
    })
  },
  deleteGenre: (data) => {
    const sql = 'DELETE FROM genres WHERE ?'
    return new Promise((resolve, reject) => {
      db.query(sql, data, (error, result) => {
        if (error) {
          reject(Error(error))
        }
        resolve(result.affectedRows)
      })
    })
  }
}
