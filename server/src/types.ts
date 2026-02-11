import DataLoader from 'dataloader';
import type NodeCache from 'node-cache';
import { Request, Response } from 'express';

import type { Models } from './models';

import User, { IUser } from './models/User/model';
import { ITeam } from './models/Team/model';
import { IPerson } from './models/Person/model';
import { IRole } from './models/Role/model';

export interface IDataloaders {
  personLoader: DataLoader<string, IPerson | undefined, string>;
  roleLoader: DataLoader<string, IRole | undefined, string>;
  teamLoader: DataLoader<string, ITeam | undefined, string>;
}

export interface IContext {
  req: Request;
  res: Response;
  models: Models;
  currentUser?: IUser | null;
  cache: NodeCache;
  dataLoaders: IDataloaders;
}
