const db = require('../utils/db')

module.exports = {
  getAllTransaction: (start, end, data = {}) => {
    const sql = `SELECT transactions.id, 
    books.title, employes.name as employee, 
    users.name as user, statuses.name as status, transactions.created_at, transactions.updated_at 
    FROM transactions
    JOIN books ON transactions.book_id=books.id 
    JOIN employes ON transactions.employee_id=employes.id
    JOIN users ON transactions.user_id=users.id
    JOIN statuses ON transactions.status=statuses.id
    WHERE transactions.id LIKE '${data.search || ''}%' 
    ORDER BY transactions.id ${parseInt(data.sort) ? 'DESC' : 'ASC'}
    LIMIT ${end} OFFSET ${start}`
    return new Promise((resolve, reject) => {
      db.query(sql, (error, result) => {
        if (error) {
          reject(Error(error))
        }
        resolve(result)
      })
    })
  },
  getTransactionCount: (data = {}) => {
    const sql = `SELECT COUNT(*) as total FROM transactions
    WHERE id LIKE '${data.search || ''}%' 
    ORDER BY id ${parseInt(data.sort) ? 'DESC' : 'ASC'}`
    return new Promise((resolve, reject) => {
      db.query(sql, (error, result) => {
        if (error) {
          reject(Error(error))
        }
        resolve(result[0].total)
      })
    })
  },
  createTransaction: (data) => {
    const sql = 'INSERT INTO transactions SET ?'
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
  getTransactionByCondition: (data) => {
    const sql = 'SELECT * FROM transactions WHERE ?'
    return new Promise((resolve, reject) => {
      db.query(sql, data, (error, result) => {
        if (error) {
          reject(Error(error))
        }
        resolve(result)
      })
    })
  },
  getTransactionByUser: (data, condition, start, end) => {
    const sql = `SELECT transactions.id, 
    books.title, employes.name as employee, 
    users.name as user, transactions.status, transactions.created_at, transactions.updated_at 
    FROM transactions
    JOIN books ON transactions.book_id=books.id 
    JOIN employes ON transactions.employee_id=employes.id
    JOIN users ON transactions.user_id=users.id WHERE ? &&
    books.title LIKE '${condition.search || ''}%'
    ORDER BY transactions.id ${parseInt(condition.sort) ? 'DESC' : 'ASC'}
    LIMIT ${end} OFFSET ${start}`
    return new Promise((resolve, reject) => {
      db.query(sql, data, (error, result) => {
        if (error) {
          reject(Error(error))
        }
        resolve(result)
      })
    })
  },
  updateTransaction: (data) => {
    const sql = 'UPDATE transactions SET ? WHERE ?'
    return new Promise((resolve, reject) => {
      db.query(sql, data, (error, result) => {
        if (error) {
          reject(Error(error))
        }
        resolve(result.affectedRows)
      })
    })
  },
  deleteTransaction: (data) => {
    const sql = 'DELETE FROM transactions WHERE ?'
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
