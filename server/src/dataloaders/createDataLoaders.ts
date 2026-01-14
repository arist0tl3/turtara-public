import DataLoader from 'dataloader';

import { Models } from '../models';

function createLoaders(models: Models, currentUserId?: string) {
  return {
    personLoader: new DataLoader(async (keys: readonly string[]) => {
      if (!currentUserId) return [];

      const people = await models.Person.find({
        _id: {
          $in: keys,
        },
        createdById: currentUserId,
      });

      return keys.map((personId) => people.find((person) => person?._id?.toString() === personId));
    }),
    roleLoader: new DataLoader(async (keys: readonly string[]) => {
      if (!currentUserId) return [];

      const roles = await models.Role.find({
        _id: {
          $in: keys,
        },
        createdById: currentUserId,
      });

      return keys.map((roleId) => roles.find((role) => role?._id?.toString() === roleId));
    }),
    teamLoader: new DataLoader(async (keys: readonly string[]) => {
      if (!currentUserId) return [];

      const teams = await models.Team.find({
        _id: {
          $in: keys,
        },
        createdById: currentUserId,
      });

      return keys.map((teamId) => teams.find((team) => team?._id?.toString() === teamId));
    }),
  };
}

export default createLoaders;
