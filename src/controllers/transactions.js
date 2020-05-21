
const transactionModel = require('../models/transactions')
const bookModel = require('../models/books')
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
  getAllTransactions: async (request, response) => {
    const { page, limit } = request.query
    const totalData = await transactionModel.getTransactionCount()
    const totalPage = Math.ceil(totalData / getPerPage(limit))
    const sliceStart = (getPage(page) * getPerPage(limit)) - getPerPage(limit)
    const sliceEnd = (getPage(page) * getPerPage(limit))
    const prevLink = getPrevLinkQueryString(getPage(page), request.query)
    const nextLink = getNextLinkQueryString(getPage(page), totalPage, request.query)
    const transactionData = await transactionModel.getAllTransaction(sliceStart, sliceEnd)
    const data = {
      success: true,
      msg: 'List all transactions',
      data: transactionData,
      pageInfo: {
        page: getPage(page),
        totalPage,
        perPage: getPerPage(limit),
        totalData,
        nextLink: nextLink && `http:/localhost:8080/transactions?${nextLink}`,
        prevLink: prevLink && `http:/localhost:8080/transactions?${prevLink}`
      }
    }
    response.status(200).send(data)
  },
  createTransaction: async (request, response) => {
    const { book_id, employee_id, user_id } = request.body
    if (book_id && employee_id && user_id && book_id !== '' && user_id !== '' && employee_id !== '') {
      const isExists = await transactionModel.getTransactionByCondition({ book_id })
      if (isExists.length < 1) {
        const transactionData = {
          book_id,
          employee_id,
          user_id,
          status: 1,
          created_at: moment().format('YYYY-MM-DD hh:mm:ss')
        }
        const result = await transactionModel.createTransaction(transactionData)
        if (result) {
          const data = {
            success: true,
            msg: 'transaction data succesfully created!',
            data: transactionData
          }
          response.status(201).send(data)
        } else {
          const data = {
            success: false,
            msg: 'Failed to create transaction',
            data: request.body
          }
          response.status(400).send(data)
        }
      } else {
        const data = {
          success: false,
          msg: 'transaction has been registered'
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
  updateTransaction: async (request, response) => {
    const { id } = request.params
    const { book_id, employee_id, user_id, status } = request.body
    const fetchTransaction = await transactionModel.getTransactionByCondition({ id: parseInt(id) })
    if (fetchTransaction.length > 0) {
      if (book_id && employee_id && user_id && status && book_id !== '' && user_id !== '' && employee_id !== '' && status !== '') {
        const transactionData = [
          { 
            book_id,
            employee_id,
            user_id,
            status,
            updated_at: moment().format('YYYY-MM-DD hh:mm:ss')
          },
          { id: parseInt(id) }
        ]
        const result = await transactionModel.updateTransaction(transactionData)
        if (result) {
          const data = {
            success: true,
            msg: 'transaction has been updated',
            data: transactionData[0]
          }
          response.status(200).send(data)
        } else {
          const data = {
            success: false,
            msg: 'failed to update'
          }
          response.status(400).send(data)
        }
      }
    } else {
      const data = {
        success: false,
        msg: `transaction with id ${request.params.id} not found!`
      }
      response.status(400).send(data)
    }
  },
  deleteTransaction: async (request, response) => {
    const { id } = request.params
    const _id = { id: parseInt(id) }
    const fetchTransaction = await transactionModel.getTransactionByCondition(_id)
    if (fetchTransaction.length > 0) {
      const result = await transactionModel.deleteTransaction(_id)
      if (result) {
        const data = {
          success: true,
          msg: `Transaction with id ${request.params.id} deleted`
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
        msg: 'Cannot delete data, transaction not found'
      }
      response.status(400).send(data)
    }
  }
}
