import GameSavingLoader from '../GameSavingLoader';
import read from '../reader';

jest.mock('../reader');

test('test fail read', async () => {
  read.mockRejectedValue(new Error('Data not readed!'));
  // Вариант try ... catch работает.
  try {
    await GameSavingLoader.load();
  } catch (e) {
    expect(e).toEqual(new Error('Data not readed!'));
  }
  // Вариант toThrow так и не получился
  // В логах теста видно, что пробрасывается заданная ошибка,
  // но почему-то не перебрасывается в метод toThrow
  // expect(async () => {
  //   await GameSavingLoader.load();
  // }).toThrow(new Error('Data not readed!'));
});
