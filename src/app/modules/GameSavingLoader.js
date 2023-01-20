import GameSaving from './GameSaving';
import json from './parser';
import read from './reader';

export default class GameSavingLoader {
  static async load() {
    const data = await read();
    const jsonString = await json(data);
    return new GameSaving(jsonString);
  }
}
