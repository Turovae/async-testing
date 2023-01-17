import GameSavingLoader from './modules/GameSavingLoader';

const gameSaving = (async () => {
  try {
    return GameSavingLoader.load();
  } catch (err) {
    throw new Error(err);
  }
})();

export default gameSaving;
