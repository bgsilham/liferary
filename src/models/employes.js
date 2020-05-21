const db = require('../utils/DB')

module.exports = {
  getAllEmployee: (start, end) => {
    const sql = `SELECT id, name, email, created_at, updated_at FROM employes LIMIT ${end} OFFSET ${start}`
    return new Promise((resolve, reject) => {
      db.query(sql, (error, result, fields) => {
        if (error) {
          reject(Error(error))
        }
        resolve(result)
      })
    })
  },
  getEmployeeCount: () => {
    const sql = 'SELECT COUNT(*) as total FROM employes'
    return new Promise((resolve, reject) => {
      db.query(sql, (error, result) => {
        if (error) {
          reject(Error(error))
        }
        resolve(result[0].total)
      })
    })
  },
  createEmployee: (data) => {
    const sql = 'INSERT INTO employes SET ?'
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
  getEmployeeByCondition: (data) => {
    const sql = 'SELECT * FROM employes WHERE ?'
    return new Promise((resolve, reject) => {
      db.query(sql, data, (error, result) => {
        if (error) {
          reject(Error(error))
        }
        resolve(result)
      })
    })
  },
  updateEmployee: (data) => {
    const sql = 'UPDATE employes SET ? WHERE ?'
    return new Promise((resolve, reject) => {
      db.query(sql, data, (error, result) => {
        if (error) {
          reject(Error(error))
        }
        resolve(result.affectedRows)
      })
    })
  },
  deleteEmployee: (data) => {
    const sql = 'DELETE FROM employes WHERE ?'
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
