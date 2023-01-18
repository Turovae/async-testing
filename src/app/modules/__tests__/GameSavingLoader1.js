import GameSavingLoader from '../GameSavingLoader';
import read from '../reader';

jest.mock('../reader');

test('test fail read', async () => {
  jest.doMock('../reader');
  read.mockReturnValueOnce();
  try {
    await GameSavingLoader.load();
  } catch (e) {
    expect(e).toEqual(new Error('Data not readed!'));
  }
});
