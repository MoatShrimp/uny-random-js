import { UnyRandom }  from '../src/uny-random'

describe('.state vs. UnityEngine.Random.state', () => {
  test.each([
    { init: 0,          expected: [0,          1,          1812433254, 1900727103] },
    { init: 2147483647, expected: [2147483647, 335050396,  3871623053, 2257956770] },
    { init: 3351175,    expected: [3351175,    1465376324, 1064899797, 1153316106] },
    { init: 7597963,    expected: [7597963,    1773921496, 2793464121, 3723451518] },
    { init: 708334,     expected: [708334,     3716350439, 33906468,   1980026165] },
    { init: 3653404,    expected: [3653404,    4110967309, 1394779170, 728691563] },
    { init: 255129647,  expected: [255129647,  4127199628, 2722027581, 1244591378] },
    { init: 926378578,  expected: [926378578,  4043363419, 3111484136, 1182246281] },
    { init: 1002426036, expected: [1002426036, 3476480261, 1647670266, 4261252003] },
    { init: 1074095615, expected: [1074095615, 2209330332, 3158162829, 4188487074] },
    { init: 1343453635, expected: [1343453635, 2620220656, 3950854833, 1878198486] },
    { init: 1822539692, expected: [1822539692, 957852381,  416394802,  3696262075] },
  ])('should have the same state once created - [Seed: $init]', ({ init, expected }) => {
    // Act
    const result = new UnyRandom(init);
    // Assert
    expect(result.state).toEqual(expected);
  });
});

describe('.state', () => {
  test.each([
    { init: 0,          expected: [0,          1,          1812433254, 1900727103] },
    { init: 2147483647, expected: [2147483647, 335050396,  3871623053, 2257956770] },
    { init: 3351175,    expected: [3351175,    1465376324, 1064899797, 1153316106] },
  ])('should have the same state when reinitialized - [Seed: $init]', ({ init, expected }) => {
    // Arrange
    const result = new UnyRandom();
    // Act
    result.initState(init);
    // Assert
    expect(result.state).toEqual(expected);
  });

  test('should be settable', () => {
    // Arrange
    const rand = new UnyRandom();
    const newState = [43581, 243, 1238994, 789];
    // Act
    rand.state = newState;
    // Assert
    expect(rand.state).toEqual(newState);
  });
});
