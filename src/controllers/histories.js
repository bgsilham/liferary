
const historyModel = require('../models/histories')
const qs = require('querystring')
const moment = require('moment')
const {APP_URL} = process.env

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
  getAllHistories: async (request, response) => {
    const { page, limit, search, sort } = request.query
    const condition = {
      search,
      sort
    }

    const totalData = await historyModel.getHistoryCount()
    const totalPage = Math.ceil(totalData / getPerPage(limit))
    const sliceStart = (getPage(page) * getPerPage(limit)) - getPerPage(limit)
    const sliceEnd = (getPage(page) * getPerPage(limit))

    const prevLink = getPrevLinkQueryString(getPage(page), request.query)
    const nextLink = getNextLinkQueryString(getPage(page), totalPage, request.query)

    const historyData = await historyModel.getAllHistory(sliceStart, sliceEnd, condition)
    const data = {
      success: true,
      msg: 'List all histories',
      data: historyData,
      pageInfo: {
        page: getPage(page),
        totalPage,
        perPage: getPerPage(limit),
        totalData,
        nextLink: nextLink && `${process.env.APP_URL}/histories?${nextLink}`,
        prevLink: prevLink && `${process.env.APP_URL}/histories?${prevLink}`
      }
    }
    response.status(200).send(data)
  },
  createHistory: async (request, response) => {
    const { transaction_id, title, user, employee, date } = request.body
    if (transaction_id &&  transaction_id !== '' && title &&  title !== '' && user &&  user !== '' && employee &&  employee !== '' && date &&  date !== '' ) {
        const historyData = {
          transaction_id,
          title,
          user,
          employee,
          date
        }
        const result = await historyModel.createHistory(historyData)
        if (result) {
          const data = {
            success: true,
            msg: 'history data succesfully created!',
            data: historyData
          }
          response.status(201).send(data)
        } else {
          const data = {
            success: false,
            msg: 'Failed to create history',
            data: request.body
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
  updateHistory: async (request, response) => {
    const { id } = request.params
    const { transaction_id, title, user, employee, date } = request.body
    const fetchHistory = await historyModel.getHistoryByCondition({ id: parseInt(id) })
    if (fetchHistory.length > 0) {
      if (transaction_id &&  transaction_id !== '' && title &&  title !== '' && user &&  user !== '' && employee &&  employee !== '' && date &&  date !== '' ) {
        const historyData = [
          { 
            transaction_id,
            title,
            user,
            employee,
            date
          },
          { id: parseInt(id) }
        ]
        const result = await historyModel.updateHistory(historyData)
        if (result) {
          const data = {
            success: true,
            msg: 'history has been updated',
            data: historyData[0]
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
        msg: `history with id ${request.params.id} not found!`
      }
      response.status(400).send(data)
    }
  },
  getHistoriesById: async (request, response) => {
    const { user } = request.body
    const { page, limit, search, sort } = request.query
    const condition = {
      search,
      sort
    }

    const totalData = await historyModel.getHistoryCount()
    const totalPage = Math.ceil(totalData / getPerPage(limit))
    const sliceStart = (getPage(page) * getPerPage(limit)) - getPerPage(limit)
    const sliceEnd = (getPage(page) * getPerPage(limit))

    const prevLink = getPrevLinkQueryString(getPage(page), request.query)
    const nextLink = getNextLinkQueryString(getPage(page), totalPage, request.query)
    const data = await historyModel.getHistoryByCondition({ user }, sliceStart, sliceEnd, condition)
    if (data.length > 0) {
      const history = {
        success: true,
        msg: 'history has been updated',
        data: data,
        pageInfo: {
          page: getPage(page),
          totalPage,
          perPage: getPerPage(limit),
          totalData,
          nextLink: nextLink && `${process.env.APP_URL}/histories/user?${nextLink}`,
          prevLink: prevLink && `${process.env.APP_URL}/histories/user?${prevLink}`
        }
      }
      response.status(200).send(history)
    } else {
      const history = {
        succes: false,
        msg: 'history not found'
      }
      response.status(401).send(history)
    }
  },
  deleteHistory: async (request, response) => {
      const result = await historyModel.deleteHistory()
      console.log(result)
      if (result) {
        const data = {
          success: true,
          msg: `History cleared`
        }
        response.status(200).send(data)
      } else {
        const data = {
          success: true,
          msg: 'History cleared'
        }
        response.status(200).send(data)
      }
    }
  }
