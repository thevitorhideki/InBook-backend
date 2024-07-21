import { InteractionType } from '@database/enums/interaction';
import { randomUUID } from 'crypto';
import { Interaction } from './interaction';

describe('Interaction', () => {
  it('should be able to create a new Interaction', () => {
    const interaction = new Interaction({
      userId: randomUUID(),
      bookId: 1,
      type: InteractionType.READING,
    });

    expect(interaction).toBeInstanceOf(Interaction);
  });
});
