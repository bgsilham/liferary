
const reviewModel = require('../models/reviews')
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
  getAllReviews: async (request, response) => {
    const { page, limit, search, sort } = request.query
    const condition = {
      search,
      sort
    }

    const totalData = await reviewModel.getReviewCount()
    const totalPage = Math.ceil(totalData / getPerPage(limit))
    const sliceStart = (getPage(page) * getPerPage(limit)) - getPerPage(limit)
    const sliceEnd = (getPage(page) * getPerPage(limit))

    const prevLink = getPrevLinkQueryString(getPage(page), request.query)
    const nextLink = getNextLinkQueryString(getPage(page), totalPage, request.query)

    const reviewData = await reviewModel.getAllReview(sliceStart, sliceEnd, condition)
    const data = {
      success: true,
      msg: 'List all reviews',
      data: reviewData,
      pageInfo: {
        page: getPage(page),
        totalPage,
        perPage: getPerPage(limit),
        totalData,
        nextLink: nextLink && `${process.env.APP_URL}/reviews?${nextLink}`,
        prevLink: prevLink && `${process.env.APP_URL}/reviews?${prevLink}`
      }
    }
    response.status(200).send(data)
  },
  createReview: async (request, response) => {
    const { book_id, user_id, comment } = request.body
    if (comment && book_id && user_id && comment !== '' && book_id !== '' && user_id !== '') {
        const reviewData = {
          book_id,
          user_id,
          comment,
          created_at: moment().format('LLLL')
        }
        const result = await reviewModel.createReview(reviewData)
        if (result) {
          const data = {
            success: true,
            msg: 'review data succesfully created!',
            data: reviewData
          }
          response.status(201).send(data)
        } else {
          const data = {
            success: false,
            msg: 'Failed to create review',
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
  updateReview: async (request, response) => {
    const { id } = request.params
    const { comment } = request.body
    const fetchReview = await reviewModel.getReviewByCondition({ id: parseInt(id) })
    if (fetchReview.length > 0) {
      if (comment && comment !== '') {
        const reviewData = [
          { 
            comment
          },
          { id: parseInt(id) }
        ]
        const result = await reviewModel.updateReview(reviewData)
        if (result) {
          const data = {
            success: true,
            msg: 'review has been updated',
            data: reviewData[0]
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
        msg: `review with id ${request.params.id} not found!`
      }
      response.status(400).send(data)
    }
  },
  getReviewUser: async (request, response) => {
    const { user_id } = request.params
    const { search } = request.query
    const data = {
      search
    }
    const fetchReview = await reviewModel.getReviewUser({ user_id: parseInt(user_id) }, data)
    const dataRes = fetchReview
    const res = {
      success: true,
      msg: 'Success',
      data: dataRes
    }
    response.status(200).send(res)
  },
  deleteReview: async (request, response) => {
    const { id } = request.params
    const _id = { id: parseInt(id) }
    const fetchReview = await reviewModel.getReviewByCondition(_id)
    if (fetchReview.length > 0) {
      const result = await reviewModel.deleteReview(_id)
      if (result) {
        const data = {
          success: true,
          msg: `Review with id ${request.params.id} deleted`
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
        msg: 'Cannot delete data, review not found'
      }
      response.status(400).send(data)
    }
  }
}
