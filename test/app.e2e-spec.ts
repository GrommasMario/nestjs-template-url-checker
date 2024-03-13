import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { ApiClientUrlModule } from '../src/api/client/url/url.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ApiClientUrlModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/urls (GET)', () => {
    return request(app.getHttpServer()).get('/urls').expect(200);
  });

  it('/urls (POST)', () => {
    return request(app.getHttpServer())
      .post('/urls')
      .send({ url: 'http://example.com' })
      .expect(201);
  });

  it('/urls (POST) 400', () => {
    return request(app.getHttpServer())
      .post('/urls')
      .send({ url: 'example' })
      .expect(400);
  });

  it('/urls/:id (DELETE)', async () => {
    const response = await request(app.getHttpServer())
      .get('/urls')
      .expect(200);
    return request(app.getHttpServer())
      .del(`/urls/${response.body[0].id}`)
      .expect(200);
  });
});
