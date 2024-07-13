import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Criação de Autores
  const author1 = await prisma.author.create({
    data: {
      name: 'J.K. Rowling',
      avatar_url: 'https://example.com/avatar1.jpg',
      about: 'Author of Harry Potter series',
      birth_year: 1965,
      nationality: 'British',
    },
  });

  const author2 = await prisma.author.create({
    data: {
      name: 'George R.R. Martin',
      avatar_url: 'https://example.com/avatar2.jpg',
      about: 'Author of A Song of Ice and Fire series',
      birth_year: 1948,
      nationality: 'American',
    },
  });

  // Criação de Livros
  const book1 = await prisma.book.create({
    data: {
      title: "Harry Potter and the Philosopher's Stone",
      description: 'First book in the Harry Potter series.',
      genres: {
        set: ['ADVENTURE', 'FANFIC'],
      },
      language: 'ENGLISH',
      pages: 223,
      duration: 120, // Example duration in minutes for audiobook
      publication_year: 1997,
      cover_image_url: 'https://example.com/cover1.jpg',
      ebook_file_url: 'https://example.com/ebook1.pdf',
      audiobook_file_url: 'https://example.com/audiobook1.mp3',
      author_id: author1.id,
    },
  });

  const book2 = await prisma.book.create({
    data: {
      title: 'A Game of Thrones',
      description: 'First book in A Song of Ice and Fire series.',
      genres: {
        set: ['ADVENTURE', 'FANFIC'],
      },
      language: 'ENGLISH',
      pages: 694,
      duration: 130, // Example duration in minutes for audiobook
      publication_year: 1996,
      cover_image_url: 'https://example.com/cover2.jpg',
      ebook_file_url: 'https://example.com/ebook2.pdf',
      audiobook_file_url: 'https://example.com/audiobook2.mp3',
      author_id: author2.id,
    },
  });

  // Criação de Usuários
  const user1 = await prisma.user.create({
    data: {
      username: 'user1',
      email: 'user1@example.com',
      password: await hash('password123', 10),
      profile: {
        create: {
          first_name: 'John',
          last_name: 'Doe',
          avatar_url: 'https://example.com/avatar3.jpg',
        },
      },
    },
  });

  const user2 = await prisma.user.create({
    data: {
      username: 'user2',
      email: 'user2@example.com',
      password: await hash('password123', 10),
      profile: {
        create: {
          first_name: 'Jane',
          last_name: 'Doe',
          avatar_url: 'https://example.com/avatar4.jpg',
        },
      },
    },
  });

  // Criação de Reviews
  await prisma.review.create({
    data: {
      user_id: user1.id,
      book_id: book1.id,
      recommended: true,
      enjoyed_content: true,
      enjoyed_narration: false,
      title: 'Great Book!',
      content: 'I really enjoyed reading this book. Highly recommended!',
    },
  });

  await prisma.review.create({
    data: {
      user_id: user2.id,
      book_id: book1.id,
      recommended: false,
      enjoyed_content: false,
      enjoyed_narration: true,
      title: 'Not my type',
      content: 'I did not enjoy the book as much as I thought I would.',
    },
  });

  await prisma.review.create({
    data: {
      user_id: user1.id,
      book_id: book2.id,
      recommended: true,
      enjoyed_content: true,
      enjoyed_narration: true,
      title: 'Excellent Read!',
      content: 'This book is a masterpiece. The narration was top-notch.',
    },
  });

  // Criação de Interações
  await prisma.interaction.create({
    data: {
      user_id: user1.id,
      book_id: book1.id,
      interaction_type: 'READ',
    },
  });

  await prisma.interaction.create({
    data: {
      user_id: user2.id,
      book_id: book2.id,
      interaction_type: 'READ',
    },
  });

  console.log('Database has been seeded. 🌱');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
