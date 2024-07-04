import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('E2E JWT sample', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const modRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = modRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should get a JWT', async () => {
    const loginReq = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'user1', password: 'password123' })
      .expect(201);

    const token = loginReq.body.access_token;
    expect(token).toBeDefined();
  });
});
