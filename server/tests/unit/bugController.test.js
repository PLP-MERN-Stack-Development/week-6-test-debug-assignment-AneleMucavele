const Bug = require('../../src/models/Bug');
const { 
  getBugs, 
  getBug, 
  createBug, 
  updateBug, 
  deleteBug 
} = require('../../src/controllers/bugs');

jest.mock('../../src/models/Bug');

describe('Bug Controller', () => {
  let req, res, next;

  beforeEach(() => {
    req = { params: {}, body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();
  });

  describe('getBugs', () => {
    it('should return all bugs', async () => {
      const mockBugs = [{ title: 'Bug 1' }, { title: 'Bug 2' }];
      Bug.find.mockResolvedValue(mockBugs);

      await getBugs(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        count: mockBugs.length,
        data: mockBugs
      });
    });

    it('should call next with error if something goes wrong', async () => {
      const error = new Error('Database error');
      Bug.find.mockRejectedValue(error);

      await getBugs(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('getBug', () => {
    it('should return a single bug', async () => {
      const mockBug = { _id: '1', title: 'Bug 1' };
      req.params.id = '1';
      Bug.findById.mockResolvedValue(mockBug);

      await getBug(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: mockBug
      });
    });

    it('should return 404 if bug not found', async () => {
      req.params.id = '1';
      Bug.findById.mockResolvedValue(null);

      await getBug(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.objectContaining({
        statusCode: 404,
        message: `Bug not found with id of 1`
      }));
    });
  });

  describe('createBug', () => {
    it('should create a new bug', async () => {
      const newBug = { title: 'New Bug', description: 'Description' };
      req.body = newBug;
      Bug.create.mockResolvedValue(newBug);

      await createBug(req, res, next);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: newBug
      });
    });
  });

  describe('updateBug', () => {
    it('should update a bug', async () => {
      const updatedBug = { _id: '1', title: 'Updated Bug' };
      req.params.id = '1';
      req.body = { title: 'Updated Bug' };
      Bug.findByIdAndUpdate.mockResolvedValue(updatedBug);

      await updateBug(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: updatedBug
      });
    });
  });

  describe('deleteBug', () => {
    it('should delete a bug', async () => {
      const deletedBug = { _id: '1', title: 'Bug to delete' };
      req.params.id = '1';
      Bug.findByIdAndDelete.mockResolvedValue(deletedBug);

      await deleteBug(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: {}
      });
    });
  });
});