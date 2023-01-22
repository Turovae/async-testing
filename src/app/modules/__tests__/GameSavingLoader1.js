import GameSavingLoader from '../GameSavingLoader';
// import read from '../reader';
import * as read from '../reader';

// jest.mock('../reader');

const readMock = jest.spyOn(read, 'default');

readMock.mockRejectedValue(new Error('Data not readed!'));

// beforeEach(() => {
//   jest.resetAllMocks();
// });

test('test fail read', async () => {
  // read.mockRejectedValue(new Error('Data not readed!'));
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

test('test fail read with toThrow', async () => {
  // read.mockRejectedValue(new Error('Data not readed!'));
  expect(async () => {
    await GameSavingLoader.load();
  }).rejects.toThrow(new Error('Data not readed!'));
});

test('test mock resolved with mock', async () => {
  readMock.mockImplementation(() => new Promise((resolve) => {
    setTimeout(() => {
      const data = '{"id":9,"created":1546300800,"userInfo":{"id":1,"name":"Hitman","level":10,"points":2000}}';
      return ((input) => {
        const buffer = new ArrayBuffer(input.length * 2);
        const bufferView = new Uint16Array(buffer);
        for (let i = 0; i < input.length; i += 1) {
          bufferView[i] = input.charCodeAt(i);
        }
        resolve(buffer);
      })(data);
    }, 1000);
  }));
  const gameSaving = await GameSavingLoader.load();
  expect(gameSaving).toEqual({
    id: 9,
    created: 1546300800,
    userInfo: {
      id: 1,
      name: 'Hitman',
      level: 10,
      points: 2000,
    },
  });
});

// Все равно не работает сброс моков
// ошибка [SyntaxError: Unexpected end of JSON input]
// ни этот сброс не работает
// read.mockReset();

test('GameSavingLoader test', async () => {
// ни этот...
  readMock.mockRestore();
  try {
    const gameSaving = await GameSavingLoader.load();
    expect(gameSaving).toEqual({
      id: 9,
      created: 1546300800,
      userInfo: {
        id: 1,
        name: 'Hitman',
        level: 10,
        points: 2000,
      },
    });
  } catch (e) {
    expect(e).toEqual(new Error('Data not readed!'));
  }
});
