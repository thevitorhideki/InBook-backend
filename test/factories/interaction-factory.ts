import { IInteractionProps, Interaction } from '@database/entities/interaction';
import { InteractionType } from '@database/enums/interaction';
import { randomUUID } from 'crypto';

type Override = Partial<IInteractionProps>;

export function makeInteraction(override: Override = {}) {
  return new Interaction({
    userId: randomUUID(),
    bookId: 1,
    type: InteractionType.READ,
    ...override,
  });
}
