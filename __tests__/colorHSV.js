import { UnyRandom }  from '../src/uny-random'

describe('.colorHSV vs. UnityEngine.Random.ColorHSV', () => {
  test.each([
    { init: 0,          expected: {r: 0.280165,   g: 0.4749825,  b: 0.6736069} },
    { init: 2147483647, expected: {r: 0.4188507,  g: 0.4194092,  b: 0.388662} },
    { init: 3351175,    expected: {r: 0.7824091,  g: 0.3163231,  b: 0.3163231} },
    { init: 7597963,    expected: {r: 0.9760998,  g: 0.3332019,  b: 0.3332019 } },
    { init: 96438,      expected: {r: 0.2132251,  g: 0.2335552,  b: 0.5398842} },
    { init: 4919044,    expected: {r: 0.3074178,  g: 0.2367011,  b: 0.9625161} },
    { init: 11288839,   expected: {r: 0.7647283,  g: 0.7155517,  b: 0.7255623} },
    { init: 77823943,   expected: {r: 0.1020132,  g: 0.06225326, b: 0.06371301} },
    { init: 1218593819, expected: {r: 0.02201884, g: 0.06335761, b: 0.121665} },
    { init: 1585133052, expected: {r: 0.7362407,  g: 0.1090128,  b: 0.7145579} },
    { init: 1658364365, expected: {r: 0.05228301, g: 0.05010686, b: 0.08307291} },
  ])('should be less than 0.00005% different generating a Color [r:$expected.r, g:$expected.g, b:$expected.b] - [Seed: $init]', ({ init, expected }) => {
    // Arrange
    const rand = new UnyRandom(init);

    // Act
    const result = rand.colorHSV();

    // Assert
    expect(result.x).toBeCloseTo(expected.r, 6);
    expect(result.y).toBeCloseTo(expected.g, 6);
    expect(result.z).toBeCloseTo(expected.b, 6);
  });
});
