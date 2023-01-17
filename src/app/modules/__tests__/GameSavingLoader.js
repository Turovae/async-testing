import GameSavingLoader from '../GameSavingLoader';

test('GameSavingLoader test', async () => {
  expect(await GameSavingLoader.load()).toEqual({
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
