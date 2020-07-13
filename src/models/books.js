const db = require('../utils/db')

module.exports = {
  getAllBooks: (start, end, data = {}) => {
    const sql = `SELECT books.id, books.title as title, books.description, genre,
    books.author as author, books.picture, books.created_at, books.updated_at
    FROM books WHERE title LIKE '${data.search || ''}%' && genre LIKE '${data.genre || ''}%' 
    ORDER BY title ${parseInt(data.sort) ? 'DESC' : 'ASC'} LIMIT ${end} OFFSET ${start}`
    return new Promise((resolve, reject) => {
      db.query(sql, (error, result) => {
        if (error) {
          reject(Error(error))
        }
        resolve(result)
      })
    })
  },
  getAuthorBooks: (start, end, data = {}) => {
    const sql = `SELECT books.id, books.title as title, books.description, genre,
    books.author as author, books.picture, books.created_at, books.updated_at
    FROM books WHERE author LIKE '${data.search || ''}%'
    ORDER BY title ${parseInt(data.sort) ? 'DESC' : 'ASC'} LIMIT ${end} OFFSET ${start}`
    return new Promise((resolve, reject) => {
      db.query(sql, (error, result) => {
        if (error) {
          reject(Error(error))
        }
        resolve(result)
      })
    })
  },
  getLatestBooks: (start, end, data = {}) => {
    const sql = `SELECT books.id, books.title as title, books.description, genre,
    books.author, books.picture, books.created_at, books.updated_at
    FROM books WHERE title LIKE '${data.search || ''}%' && genre LIKE '${data.genre || ''}%' 
    ORDER BY books.id DESC LIMIT ${end} OFFSET ${start}`
    return new Promise((resolve, reject) => {
      db.query(sql, (error, result) => {
        if (error) {
          reject(Error(error))
        }
        resolve(result)
      })
    })
  },
  getBookCount: (data = {}) => {
    const sql = `SELECT COUNT(*) as total FROM books WHERE title LIKE '${data.search || ''}%' 
    && genre LIKE '${data.genre || ''}%'
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
  createBook: (data) => {
    const sql = 'INSERT INTO books SET ?'
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
  getBookByCondition: (data) => {
    const sql = 'SELECT * FROM books WHERE ?'
    return new Promise((resolve, reject) => {
      db.query(sql, data, (error, result) => {
        if (error) {
          reject(Error(error))
        }
        resolve(result)
      })
    })
  },
  updateBook: (data) => {
    const sql = 'UPDATE books SET ? WHERE ?'
    return new Promise((resolve, reject) => {
      db.query(sql, data, (error, result) => {
        if (error) {
          reject(Error(error))
        }
        resolve(result.affectedRows)
      })
    })
  },
  deleteBook: (data) => {
    const sql = 'DELETE FROM books WHERE ?'
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
