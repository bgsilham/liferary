
const genreModel = require('../models/genres')
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
  getAllGenres: async (request, response) => {
    const { page, limit, search, sort } = request.query
    const condition = {
      search,
      sort
    }

    const totalData = await genreModel.getGenreCount()
    const totalPage = Math.ceil(totalData / getPerPage(limit))
    const sliceStart = (getPage(page) * getPerPage(limit)) - getPerPage(limit)
    const sliceEnd = (getPage(page) * getPerPage(limit))

    const prevLink = getPrevLinkQueryString(getPage(page), request.query)
    const nextLink = getNextLinkQueryString(getPage(page), totalPage, request.query)

    const genreData = await genreModel.getAllGenre(sliceStart, sliceEnd, condition)
    const data = {
      success: true,
      msg: 'List all genres',
      data: genreData,
      pageInfo: {
        page: getPage(page),
        totalPage,
        perPage: getPerPage(limit),
        totalData,
        nextLink: nextLink && `${process.env.APP_URL}/genres?${nextLink}`,
        prevLink: prevLink && `${process.env.APP_URL}/genres?${prevLink}`
      }
    }
    response.status(200).send(data)
  },
  createGenre: async (request, response) => {
    const { name } = request.body
    if (name &&  name !== '') {
      const isExists = await genreModel.getGenreByCondition({ name })
      if (isExists.length < 1) {
        const genreData = {
          name,
          created_at: moment().format('YYYY-MM-DD hh:mm:ss')
        }
        const result = await genreModel.createGenre(genreData)
        if (result) {
          const data = {
            success: true,
            msg: 'genre data succesfully created!',
            data: genreData
          }
          response.status(201).send(data)
        } else {
          const data = {
            success: false,
            msg: 'Failed to create genre',
            data: request.body
          }
          response.status(400).send(data)
        }
      } else {
        const data = {
          success: false,
          msg: 'genre has been registered'
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
  updateGenre: async (request, response) => {
    const { id } = request.params
    const { name } = request.body
    const fetchGenre = await genreModel.getGenreByCondition({ id: parseInt(id) })
    if (fetchGenre.length > 0) {
      if (name && name !== '') {
        const genreData = [
          { name,
            updated_at: moment().format('YYYY-MM-DD hh:mm:ss')
          },
          { id: parseInt(id) }
        ]
        const result = await genreModel.updateGenre(genreData)
        if (result) {
          const data = {
            success: true,
            msg: 'genre has been updated',
            data: genreData[0]
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
        msg: `genre with id ${request.params.id} not found!`
      }
      response.status(400).send(data)
    }
  },
  deleteGenre: async (request, response) => {
    const { id } = request.params
    const _id = { id: parseInt(id) }
    const fetchGenre = await genreModel.getGenreByCondition(_id)
    if (fetchGenre.length > 0) {
      const result = await genreModel.deleteGenre(_id)
      if (result) {
        const data = {
          success: true,
          msg: `Genre with id ${request.params.id} deleted`
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
        msg: 'Cannot delete data, genre not found'
      }
      response.status(400).send(data)
    }
  }
}
