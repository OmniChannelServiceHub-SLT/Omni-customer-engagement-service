const request = require('supertest');
const app = require('../src/app');

describe('Ping route', () => {
  test('GET /ping returns pong', async () => {
    const res = await request(app).get('/ping').set('x-correlation-id', 'test-id');

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('isSuccess', true);
    expect(res.body).toHaveProperty('message', 'pong');
    expect(res.headers['x-correlation-id'] || res.body.correlationId).toBeDefined();
  });
});
