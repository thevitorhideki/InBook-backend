import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('E2E Books', () => {
  let app: INestApplication;
  const bookId: number = 1;

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

  it('should create a book', async () => {
    await request(app.getHttpServer())
      .post('/books')
      .send({
        title: "Harry Potter and the Philosopher's Stone",
        slug: 'harry-potter-and-the-philosophers-stone',
        authorId: 1,
      })
      .expect(201);
  });

  it('not should create a book with invalid author', async () => {
    await request(app.getHttpServer())
      .post('/books')
      .send({
        title: "Harry Potter and the Philosopher's Stone",
        slug: 'harry-potter-and-the-philosophers-stone',
        authorId: 0,
      })
      .expect(404);
  });

  it('should get a book by id', async () => {
    const booksReq = await request(app.getHttpServer())
      .get(`/books/${bookId}`)
      .expect(200);

    const book = booksReq.body;
    expect(book).toBeDefined();
  });

  it('should not get a book with invalid id', async () => {
    await request(app.getHttpServer()).get('/books/0').expect(404);
  });

  it('should update a book', async () => {
    await request(app.getHttpServer())
      .put(`/books/${bookId}`)
      .send({
        title: 'Updated Title',
        slug: 'harry-potter-and-the-philosophers-stone',
        authorId: 1,
      })
      .expect(200);
  });

  it('should not update a book with invalid id', async () => {
    await request(app.getHttpServer())
      .put('/books/0')
      .send({
        title: 'Updated Title',
        slug: 'harry-potter-and-the-philosophers-stone',
        authorId: 1,
      })
      .expect(404);
  });

  it('should delete a book', async () => {
    await request(app.getHttpServer()).delete(`/books/${bookId}`).expect(200);
  });

  it('should not delete a book with invalid id', async () => {
    await request(app.getHttpServer()).delete('/books/0').expect(404);
  });
});
