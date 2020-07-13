const db = require('../utils/db')

module.exports = {
  getAllReview: (start, end, data = {}) => {
    const sql = `SELECT reviews.id, reviews.book_id, users.name as user, reviews.comment,
    reviews.created_at FROM reviews 
    JOIN users ON reviews.user_id=users.id
    WHERE reviews.book_id LIKE '${data.search || ''}%' 
    ORDER BY reviews.id ${parseInt(data.sort) ? 'ASC' : 'DESC'}
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
  getReviewUser: (user_id, data) => {
    const sql = `SELECT reviews.id, reviews.user_id, books.title, reviews.comment,
    reviews.created_at FROM reviews 
    JOIN books ON reviews.book_id=books.id
    WHERE ? && books.title LIKE '${data.search || ''}%' 
    ORDER BY reviews.id DESC`
    return new Promise((resolve, reject) => {
      db.query(sql, user_id, (error, result, fields) => {
        if (error) {
          reject(Error(error))
        }
        resolve(result)
      })
    })
  },
  getReviewCount: (data = {}) => {
    const sql = `SELECT COUNT(*) as total FROM reviews
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
  createReview: (data) => {
    const sql = 'INSERT INTO reviews SET ?'
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
  getReviewByCondition: (data) => {
    const sql = 'SELECT * FROM reviews WHERE ?'
    return new Promise((resolve, reject) => {
      db.query(sql, data, (error, result) => {
        if (error) {
          reject(Error(error))
        }
        resolve(result)
      })
    })
  },
  updateReview: (data) => {
    const sql = 'UPDATE reviews SET ? WHERE ?'
    return new Promise((resolve, reject) => {
      db.query(sql, data, (error, result) => {
        if (error) {
          reject(Error(error))
        }
        resolve(result.affectedRows)
      })
    })
  },
  deleteReview: (data) => {
    const sql = 'DELETE FROM reviews WHERE ?'
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
