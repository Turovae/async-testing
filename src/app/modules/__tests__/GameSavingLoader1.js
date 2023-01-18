import GameSavingLoader from '../GameSavingLoader';

jest.mock('../reader');

test('test fail read', async () => {
  try {
    await GameSavingLoader.load();
  } catch (e) {
    expect(e).toEqual(new Error('Data not readed!'));
  }
});
