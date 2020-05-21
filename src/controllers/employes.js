require('dotenv').config()
const {APP_PORT} = process.env
const employeeModel = require('../models/employes')
const qs = require('querystring')
const moment = require('moment')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const saltRounds = 10

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
  getAllEmployes: async (request, response) => {
    const { page, limit } = request.query
    const totalData = await employeeModel.getEmployeeCount()
    const totalPage = Math.ceil(totalData / getPerPage(limit))
    const sliceStart = (getPage(page) * getPerPage(limit)) - getPerPage(limit)
    const sliceEnd = (getPage(page) * getPerPage(limit))
    const prevLink = getPrevLinkQueryString(getPage(page), request.query)
    const nextLink = getNextLinkQueryString(getPage(page), totalPage, request.query)
    const employeeData = await employeeModel.getAllEmployee(sliceStart, sliceEnd)
    const data = {
      success: true,
      msg: 'List all employes',
      data: employeeData,
      pageInfo: {
        page: getPage(page),
        totalPage,
        perPage: getPerPage(limit),
        totalData,
        nextLink: nextLink && `http:/localhost:8080/employes?${nextLink}`,
        prevLink: prevLink && `http:/localhost:8080/employes?${prevLink}`
      }
    }
    response.status(200).send(data)
  },
  createEmployee: async (request, response) => {
    const { name, email, password } = request.body
    if (name && email && password && name !== '' && email !== '' && password !== '') {
      const isExists = await employeeModel.getEmployeeByCondition({ email })
      if (isExists.length < 1) {
        const employeeData = {
          name,
          email,
          password: bcrypt.hashSync(request.body.password, saltRounds),
          created_at: moment().format('YYYY-MM-DD hh:mm:ss')
        }
        const result = await employeeModel.createEmployee(employeeData)
        if (result) {
          const data = {
            success: true,
            msg: 'employee data succesfully created!',
            data: {
              name: employeeData.name,
              email: employeeData.email,
              created_at: employeeData.created_at,
              token: jwt.sign(
                {
                  name: employeeData.name,
                  email: employeeData.email
                },
                process.env.JWT_KEY,
                {
                  expiresIn: '1h'
                }
              )
            }
          }
          response.status(201).send(data)
        } else {
          const data = {
            success: false,
            msg: 'Failed to create employee',
            data: request.body
          }
          response.status(400).send(data)
        }
      } else {
        const data = {
          success: false,
          msg: 'email has been registered'
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
  loginEmployee: async (request, response) => {
    const { email, password } = request.body
    const data = await employeeModel.getEmployeeByCondition({ email })
    if (data.length > 0) {
      const checkPassword = data[0].password
      await bcrypt.compare(request.body.password, checkPassword, function(err, match) {
        if (err) {
          const login = {
            succes: false,
            msg: 'failed compare password'
            }
            response.status(401).send(login)
        } else if (!match) {
          const login = {
            succes: false,
            msg: 'inccorect password'
            }
            response.status(401).send(login)
        } else {
          const login = {
            succes: true,
            msg: 'login succes',
            id: data[0].id,
            name: data[0].name,
            email: data[0].email,
            token: jwt.sign(
              {
                name: data[0].name,
                email: data[0].email
              },
              process.env.JWT_KEY,
              {
                expiresIn: '1h'
              }
            )
          }
          response.status(200).send(login)
        }
      })
    } else {
      const login = {
        succes: false,
        msg: 'email not found'
      }
      response.status(401).send(login)
    }
  },
  updateEmployee: async (request, response) => {
    const { id } = request.params
    const { name, email, password } = request.body
    const fetchEmployee = await employeeModel.getEmployeeByCondition({ id: parseInt(id) })
    if (fetchEmployee.length > 0) {
      if (name && email && password && name !== '' && email !== '' && password !== '') {
        const employeeData = [
          { name,
            email,
            password,
            updated_at: moment().format('YYYY-MM-DD hh:mm:ss')
          },
          { id: parseInt(id) }
        ]
        const result = await employeeModel.updateEmployee(employeeData)
        if (result) {
          const data = {
            success: true,
            msg: 'employee has been updated',
            data: employeeData[0]
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
        msg: `Employee with id ${request.params.id} not found!`
      }
      response.status(400).send(data)
    }
  },
  deleteEmployee: async (request, response) => {
    const { id } = request.params
    const _id = { id: parseInt(id) }
    const fetchEmployee = await employeeModel.getEmployeeByCondition(_id)
    if (fetchEmployee.length > 0) {
      const result = await employeeModel.deleteEmployee(_id)
      if (result) {
        const data = {
          success: true,
          msg: `Employee with id ${request.params.id} deleted`
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
        msg: 'Cannot delete data, employee not found'
      }
      response.status(400).send(data)
    }
  }
}
