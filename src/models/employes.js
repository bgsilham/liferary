const db = require('../utils/db')

module.exports = {
  getAllEmployee: (start, end, data = {}) => {
    const sql = `SELECT id, name, email, created_at, updated_at FROM employes 
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
  getEmployeeCount: (data = {}) => {
    const sql = `SELECT COUNT(*) as total FROM employes
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
