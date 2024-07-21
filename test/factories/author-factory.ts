import { Author, IAuthorProps } from '@database/entities/author';

type Override = Partial<IAuthorProps>;

export function makeAuthor(override: Override = {}, authorId?: string) {
  return new Author(
    {
      name: 'José de Alencar',
      avatarUrl:
        'https://upload.wikimedia.org/wikipedia/commons/e/ec/Jose_de_Alencar.png',
      about:
        'José Martiniano de Alencar foi um jornalista, advogado, político e escritor romântico brasileiro.\nDescendia de uma família prestigiada e participativa no contexto revolucionário pernambucano, de 1817. Tornou-se notável como jurista, parlamentar imperial, escritor e polemista ativo nos periódicos do Império Brasileiro. A notabilidade rendeu-lhe homenagens, correspondências e reconhecimento de contemporâneos como Machado de Assis, que lhe tornou patrono na Academia Brasileira de Letras. Na mesma medida em que lhe rendeu críticas imediatas e posteriores.\nEnquanto político e teórico do parlamentarismo brasileiro, José de Alencar alinhou-se à perspectiva da abolição gradual, defendeu a participação feminina na política através do voto, implementou o mecanismo jurídico do habeas corpus preventivo; participou como deputado de diversos mandatos na câmara e, por notoriedade, foi alçado ao cargo de Ministro da Justiça em 1868, na ocasião do Gabinete Itaboraí, no qual permaneceu pouco mais de dois anos. Enquanto romancista, teatrólogo, cronista e poeta, publicou obras inescapáveis para a compreensão do passado brasileiro.',
      birthYear: 1829,
      nationality: 'Brazilian',
      ...override,
    },
    authorId,
  );
}
