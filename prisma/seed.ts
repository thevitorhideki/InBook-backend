import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Criação de Autores
  const author1 = await prisma.author.create({
    data: {
      name: 'José de Alencar',
      avatar_url:
        'https://upload.wikimedia.org/wikipedia/commons/e/ec/Jose_de_Alencar.png',
      about:
        'José Martiniano de Alencar foi um jornalista, advogado, político e escritor romântico brasileiro.\nDescendia de uma família prestigiada e participativa no contexto revolucionário pernambucano, de 1817. Tornou-se notável como jurista, parlamentar imperial, escritor e polemista ativo nos periódicos do Império Brasileiro. A notabilidade rendeu-lhe homenagens, correspondências e reconhecimento de contemporâneos como Machado de Assis, que lhe tornou patrono na Academia Brasileira de Letras. Na mesma medida em que lhe rendeu críticas imediatas e posteriores.\nEnquanto político e teórico do parlamentarismo brasileiro, José de Alencar alinhou-se à perspectiva da abolição gradual, defendeu a participação feminina na política através do voto, implementou o mecanismo jurídico do habeas corpus preventivo; participou como deputado de diversos mandatos na câmara e, por notoriedade, foi alçado ao cargo de Ministro da Justiça em 1868, na ocasião do Gabinete Itaboraí, no qual permaneceu pouco mais de dois anos. Enquanto romancista, teatrólogo, cronista e poeta, publicou obras inescapáveis para a compreensão do passado brasileiro.',
      birth_year: 1829,
      nationality: 'Brazilian',
    },
  });

  const author2 = await prisma.author.create({
    data: {
      name: 'Machado de Assis',
      avatar_url:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Machado_de_Assis_1904.jpg/800px-Machado_de_Assis_1904.jpg',
      about:
        'Joaquim Maria Machado de Assis  foi um escritor brasileiro, amplamente reconhecido por críticos, estudiosos, escritores e leitores como o maior expoente da literatura brasileira. Sua produção literária abrangeu praticamente todos os gêneros, incluindo poesia, romance, crônica, dramaturgia, conto, folhetim, jornalismo e crítica literária. Machado de Assis testemunhou a Abolição da Escravatura e a transição política do Brasil, com a proclamação da República em substituição ao Império, além de diversos eventos significativos no final do século XIX e início do século XX, sendo um notável comentador e relator dos acontecimentos político-sociais de sua época.',
      birth_year: 1839,
      nationality: 'Brazilian',
    },
  });

  // Criação de Livros
  const book1 = await prisma.book.create({
    data: {
      title: 'Senhora',
      description:
        'Obra da fase urbana de José de Alencar, considerado o mestre do romantismo o brasileiro, Senhora revela as convenções da sociedade burguesa carioca do século XIX. Pelos desencontros amorosos de Aurélia Camargo, Fernanda Seixas e Adelaide Amaral, o autor traça um painel da vida da corte e critica os costumes da época, como casamento por interesse e arrivismo social.',
      genres: {
        set: ['CLASSIC', 'ROMANCE'],
      },
      language: 'PORTUGUESE',
      pages: 240,
      duration: 40740000, // Example duration in milliseconds for audio book
      publication_year: 1875,
      cover_image_url:
        'https://m.media-amazon.com/images/I/711tJRe6LML._SL1360_.jpg',
      ebook_file_url: 'https://example.com/ebook1.pdf',
      audiobook_file_url: 'https://example.com/audiobook1.mp3',
      author_id: author1.id,
    },
  });

  const book2 = await prisma.book.create({
    data: {
      title: 'Memórias Póstumas de Brás Cubas',
      description:
        'Não tive filhos, não transmiti a nenhuma criatura o legado da nossa miséria. Com essas palavras, o narrador de Memórias Póstumas de Brás Cubas resume a sua vida. O tom assumido na obra, bem como as técnicas empregadas na composição romanesca, são alguns dos fatores que justificam o lugar de Machado de Assis entre os maiores escritores do século XIX. Neste romance repleto de digressões filosóficas, o escritor se vale da posição privilegiada de Brás Cubas, que, como defunto autor, narra as suas desventuras e revela as contradições da sociedade brasileira do século XIX, por meio de uma análise aprofundada de seus personagens.',
      genres: {
        set: ['ROMANCE', 'CLASSIC'],
      },
      language: 'PORTUGUESE',
      pages: 192,
      duration: 31510200, // Example duration in minutes for audiobook
      publication_year: 1881,
      cover_image_url:
        'https://m.media-amazon.com/images/I/71OL9RU2tJL._SL1360_.jpg',
      ebook_file_url: 'https://example.com/ebook2.pdf',
      audiobook_file_url: 'https://example.com/audiobook2.mp3',
      author_id: author2.id,
    },
  });

  // Criação de Usuários
  const user1 = await prisma.user.create({
    data: {
      username: 'johndoe',
      email: 'johndoe@example.com',
      password: await hash('#StrongPassword1', 10),
      profile: {
        create: {
          first_name: 'John',
          last_name: 'Doe',
        },
      },
    },
  });

  const user2 = await prisma.user.create({
    data: {
      username: 'janedoe',
      email: 'janedoe@example.com',
      password: await hash('#StrongPassword1', 10),
      profile: {
        create: {
          first_name: 'Jane',
          last_name: 'Doe',
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
      title: 'Muito bom!',
      content:
        'Eu gostei muito desse livro, recomendo para todos os amantes da literatura clássica',
    },
  });

  await prisma.review.create({
    data: {
      user_id: user2.id,
      book_id: book1.id,
      recommended: false,
      enjoyed_content: false,
      enjoyed_narration: true,
      title: 'Não gostei muito...',
      content: 'Não gostei tanto quanto eu achava que ia gostar',
    },
  });

  await prisma.review.create({
    data: {
      user_id: user1.id,
      book_id: book2.id,
      recommended: true,
      enjoyed_content: true,
      enjoyed_narration: true,
      title: 'Leitura obrigatória!',
      content:
        'Isso é uma obra de arte, fica ainda mais emocionante com essa narração',
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
