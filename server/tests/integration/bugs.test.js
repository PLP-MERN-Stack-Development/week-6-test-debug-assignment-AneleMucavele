const request = require('supertest');
const app = require('../../src/server');
const Bug = require('../../src/models/Bug');
const { connectDB, closeDB } = require('../../src/config/db');

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await closeDB();
});

describe('Bug API', () => {
  beforeEach(async () => {
    await Bug.deleteMany();
  });

  describe('GET /api/v1/bugs', () => {
    it('should return all bugs', async () => {
      await Bug.create([
        { title: 'Bug 1', description: 'Description 1' },
        { title: 'Bug 2', description: 'Description 2' }
      ]);

      const res = await request(app).get('/api/v1/bugs');

      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toBe(true);
      expect(res.body.count).toBe(2);
      expect(res.body.data.length).toBe(2);
    });
  });

  describe('POST /api/v1/bugs', () => {
    it('should create a new bug', async () => {
      const res = await request(app)
        .post('/api/v1/bugs')
        .send({
          title: 'New Bug',
          description: 'Bug description',
          status: 'open'
        });

      expect(res.statusCode).toEqual(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('_id');
      expect(res.body.data.title).toBe('New Bug');
    });

    it('should return 400 if required fields are missing', async () => {
      const res = await request(app)
        .post('/api/v1/bugs')
        .send({
          description: 'Bug without title'
        });

      expect(res.statusCode).toEqual(400);
      expect(res.body.success).toBe(false);
    });
  });

  describe('PUT /api/v1/bugs/:id', () => {
    it('should update a bug', async () => {
      const bug = await Bug.create({
        title: 'Bug to update',
        description: 'Original description'
      });

      const res = await request(app)
        .put(`/api/v1/bugs/${bug._id}`)
        .send({
          title: 'Updated Bug',
          status: 'in-progress'
        });

      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.title).toBe('Updated Bug');
      expect(res.body.data.status).toBe('in-progress');
    });

    it('should return 404 if bug not found', async () => {
      const res = await request(app)
        .put('/api/v1/bugs/507f1f77bcf86cd799439011')
        .send({
          title: 'Non-existent bug'
        });

      expect(res.statusCode).toEqual(404);
      expect(res.body.success).toBe(false);
    });
  });

  describe('DELETE /api/v1/bugs/:id', () => {
    it('should delete a bug', async () => {
      const bug = await Bug.create({
        title: 'Bug to delete',
        description: 'Will be deleted'
      });

      const res = await request(app).delete(`/api/v1/bugs/${bug._id}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toEqual({});

      const deletedBug = await Bug.findById(bug._id);
      expect(deletedBug).toBeNull();
    });
  });
});