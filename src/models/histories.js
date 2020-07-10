const db = require('../utils/DB')

module.exports = {
  getAllHistory: (start, end, data = {}) => {
    const sql = `SELECT * FROM histories 
    WHERE title LIKE '${data.search || ''}%' 
    ORDER BY title ${parseInt(data.sort) ? 'DESC' : 'ASC'}
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
  getHistoryCount: (data = {}) => {
    const sql = `SELECT COUNT(*) as total FROM histories
    WHERE title LIKE '${data.search || ''}%' 
    ORDER BY title ${parseInt(data.sort) ? 'DESC' : 'ASC'}`
    return new Promise((resolve, reject) => {
      db.query(sql, (error, result) => {
        if (error) {
          reject(Error(error))
        }
        resolve(result[0].total)
      })
    })
  },
  createHistory: (data) => {
    const sql = 'INSERT INTO histories SET ?'
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
  getHistoryByCondition: (data) => {
    const sql = 'SELECT * FROM histories WHERE ? ORDER BY id DESC'
    return new Promise((resolve, reject) => {
      db.query(sql, data, (error, result) => {
        if (error) {
          reject(Error(error))
        }
        resolve(result)
      })
    })
  },
  getHistoryById: (data, condtion) => {
    const sql = `SELECT * FROM histories WHERE ? 
    && title LIKE '${condtion.search || ''}%' ORDER BY id DESC`
    return new Promise((resolve, reject) => {
      db.query(sql, data, (error, result) => {
        if (error) {
          reject(Error(error))
        }
        resolve(result)
      })
    })
  },
  updateHistory: (data) => {
    const sql = 'UPDATE histories SET ? WHERE ?'
    return new Promise((resolve, reject) => {
      db.query(sql, data, (error, result) => {
        if (error) {
          reject(Error(error))
        }
        resolve(result.affectedRows)
      })
    })
  },
  deleteHistory: () => {
    const sql = 'TRUNCATE TABLE histories'
    return new Promise((resolve, reject) => {
      db.query(sql, (error, result) => {
        if (error) {
          reject(Error(error))
        }
        resolve(result.affectedRows)
      })
    })
  }
}
