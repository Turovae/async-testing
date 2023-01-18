import GameSavingLoader from '../GameSavingLoader';

test('GameSavingLoader test', async () => {
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
