import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import request from 'supertest'
import { createApp } from '../index.ts'
import ActionModel  from '../models/mongodb/action.ts'
import { Express } from 'express'

describe('Actions API with MongoDB', () => {
  let mongodb: MongoMemoryServer
  let app: Express

  beforeAll(async () => {
    mongodb = await MongoMemoryServer.create()
    const uri = mongodb.getUri()
    await mongoose.connect(uri)
    app = await createApp(ActionModel)
  })

  afterAll(async () => {
    await mongoose.disconnect()
    await mongodb.stop()
  })

  afterEach(async () => {
    const collections = mongoose.connection.collections
    for (const key in collections) {
      const collection = collections[key]
      await collection.deleteMany({})
    }
  })

  describe('GET /actions', () => {
    it('should return an empty array when no actions exist', async () => {
      const res = await request(app).get('/actions')
      expect(res.statusCode).toEqual(200)
      expect(res.body).toEqual([])
    })

    it('should return a list of actions', async () => {
      const actionOne = await ActionModel.create(
        { title: 'Action 1', carbon: 1, category: 'energía' }
      )

      if(actionOne) {
        await ActionModel.create(
          { title: 'Action 2', carbon: 2, category: 'transporte' }
        )
      }

      const res = await request(app).get('/actions')
      expect(res.statusCode).toEqual(200)
      expect(res.body.length).toBe(2)
      expect(res.body[0].title).toBe('Action 1')

    })
  })

  describe('POST /actions', () => {
    it('should create a new action successfully', async () => {
      const newAction = {
        title: 'Usar lamparas LED bajo consumo',
        carbon: 2,
        category: 'energía',
      }

      const res = await request(app)
        .post('/actions')
        .send(newAction)

      expect(res.statusCode).toEqual(201)
      expect(res.body.title).toBe(newAction.title)
      expect(res.body.carbon).toBe(newAction.carbon)
      expect(res.body.category).toBe(newAction.category)
      expect(res.body).toHaveProperty('_id')

    })

    it('should return 400 for invalid data (missing title)', async () => {
      const invalidAction = {
        carbon: 2,
        category: 'energía',
      }

      const res = await request(app)
        .post('/actions')
        .send(invalidAction)

      expect(res.statusCode).toEqual(400)
      // expect(res.body.error).toContain('`title` is required')
    })
  })

  describe('GET /actions/:id', () => {
    it('should return a single action by id', async () => {
      const action = await ActionModel.create({ title: 'Test Action', carbon: 1, category: 'otros' })
      const actionId = (action as { _id: mongoose.Types.ObjectId })._id.toString()

      const res = await request(app).get(`/actions/${actionId}`)

      expect(res.statusCode).toEqual(200)
      expect(res.body._id).toBe(actionId)
      expect(res.body.title).toBe('Test Action')
    })

    it('should return 404 for a non-existent id', async () => {
      const nonExistentId = new mongoose.Types.ObjectId().toString()
      const res = await request(app).get(`/actions/${nonExistentId}`)
      expect(res.statusCode).toEqual(404)
      expect(res.body.error).toBe('Action not found')
    })

    it('should return 400 for an invalid id format', async () => {
      const invalidId = '123-invalid-id'
      const res = await request(app).get(`/actions/${invalidId}`)
      expect(res.statusCode).toEqual(400)
      expect(res.body.error).toBe('Invalid ID format')
    })
  })

  describe('PUT /actions/:id', () => {
    it('should update an action successfully', async () => {
      const action = await ActionModel.create({ title: 'Old Title', carbon: 1, category: 'otros' })
      const actionId = (action as { _id: mongoose.Types.ObjectId })._id.toString()
      const updateData = { description: 'A new description' }

      const res = await request(app)
        .put(`/actions/${actionId}`)
        .send(updateData)

      expect(res.statusCode).toEqual(200)
      expect(res.body.description).toBe('A new description')
    })
  })

  describe('DELETE /actions/:id', () => {
    it('should delete an action successfully', async () => {
        const action = await ActionModel.create({ title: 'To Be Deleted', carbon: 1, category: 'otros' })
        const actionId = (action as { _id: mongoose.Types.ObjectId })._id.toString()

        const res = await request(app).delete(`/actions/${actionId}`)

        expect(res.statusCode).toEqual(200)
        expect(res.body.message).toContain('deleted successfully')

        const deletedAction = await ActionModel.getById(actionId)
        expect(deletedAction).toBeNull()
    })
  })
})
