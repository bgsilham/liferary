const bookModel = require('../models/books')
const {APP_URL} = process.env
const transactionModel = require('../models/transactions')
const qs = require('querystring')
const moment = require('moment')

const getPage = (_page) => {
  const page = parseInt(_page)
  if (page && page > 0) {
    return page
  } else {
    return 1
  }
}

const getPerPage = (_perPage) => {
  const perPage = parseInt(_perPage)
  if (perPage && perPage > 0) {
    return perPage
  } else {
    return 5
  }
}

const getNextLinkQueryString = (page, totalPage, currentQuery) => {
  page = parseInt(page)
  if (page < totalPage) {
    const generatedPage = {
      page: page + 1
    }
    return qs.stringify({ ...currentQuery, ...generatedPage })
  } else {
    return null
  }
}

const getPrevLinkQueryString = (page, currentQuery) => {
  page = parseInt(page)
  if (page > 1) {
    const generatedPage = {
      page: page - 1
    }
    return qs.stringify({ ...currentQuery, ...generatedPage })
  } else {
    return null
  }
}

module.exports = {
  getAllBooks: async (request, response) => {
    const { page, limit, search, sort } = request.query
    const condition = {
      search,
      sort
    }
    const sliceStart = (getPage(page) * getPerPage(limit)) - getPerPage(limit)
    const sliceEnd = (getPage(page) * getPerPage(limit))
    const totalData = await bookModel.getBookCount(condition)
    const totalPage = Math.ceil(totalData / getPerPage(limit))
    

    const prevLink = getPrevLinkQueryString(getPage(page), request.query)
    const nextLink = getNextLinkQueryString(getPage(page), totalPage, request.query)

    const bookData = await bookModel.getAllBooks(sliceStart, sliceEnd, condition)
    const data = {
      success: true,
      msg: 'List all Books',
      data: bookData,
      pageInfo: {
        page: getPage(page),
        totalPage,
        perPage: getPerPage(limit),
        totalData,
        nextLink: nextLink && `${process.env.APP_URL}/books?${nextLink}`,
        prevLink: prevLink && `${process.env.APP_URL}/books?${prevLink}`
      }
    }
    response.status(200).send(data)
  },
  createBook: async (request, response) => {
    const { title, description, genre, author } = request.body
    if (title && description && genre && title !== '' && description !== '' && genre !== '') {
      const isExsist = await bookModel.getBookByCondition({ title })
      if (isExsist.length < 1) {
        const bookData = {
          title,
          description,
          genre,
          author,
          picture: `${process.env.APP_URL}/img/${request.file.filename}`,
          created_at: moment().format('YYYY-MM-DD hh:mm:ss')
        }
        const result = await bookModel.createBook(bookData)
        if (result) {
          const data = {
            success: true,
            msg: 'Book data succesfully added!',
            data: bookData
          }
          response.status(201).send(data)
        } else {
          const data = {
            success: false,
            msg: 'Failed to add Book',
            data: request.body
          }
          response.status(400).send(data)
        }
      } else {
        const data = {
          success: false,
          msg: 'Book alredy added'
        }
        response.status(400).send(data)
      }
    } else {
      const data = {
        success: false,
        msg: 'all form must be filled'
      }
      response.status(400).send(data)
    }
  },
  updateBook: async (request, response) => {
    const { id } = request.params
    const { title, description, genre, author } = request.body
    const fetchBook = await bookModel.getBookByCondition({ id: parseInt(id) })
    if (fetchBook.length > 0) {
      if (title && description && genre && title !== '' && description !== '' && genre !== '') {
        const bookData = [
          { title,
            description,
            genre,
            author,
            picture: `${process.env.APP_URL}/img/${request.file.filename}`,
            updated_at: moment().format('YYYY-MM-DD hh:mm:ss')
          },
          { id: parseInt(id) }
        ]
        const result = await bookModel.updateBook(bookData)
        if (result) {
          console.log(result)
          const data = {
            success: true,
            msg: 'Book has been updated',
            data: bookData[0]
          }
          response.status(200).send(data)
        } else {
          const data = {
            success: false,
            msg: 'failed to update'
          }
          response.status(400).send(data)
        }
      } else {
        const data = {
          success: false,
          msg: 'All form must be filled!'
        }
        response.status(400).send(data)
      }
    } else {
      const data = {
        success: false,
        msg: `Book with id ${request.params.id} not found!`
      }
      response.status(400).send(data)
    }
  },
  deleteBook: async (request, response) => {
    const { id } = request.params
    const _id = { id: parseInt(id) }
    const isExsist = await bookModel.getBookByCondition(_id)
    if (isExsist.length > 0) {
      const result = await bookModel.deleteBook(_id)
      if (result) {
        const data = {
          success: true,
          msg: `Book deleted`
        }
        response.status(200).send(data)
      } else {
        const data = {
          success: false,
          msg: 'failed to delete'
        }
        response.status(200).send(data)
      }
    } else {
      const data = {
        success: false,
        msg: `Cannot delete, Book not found`
      }
      response.status(400).send(data)
    }
  }
}
