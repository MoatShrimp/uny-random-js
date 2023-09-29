import { UnyRandom }  from '../src/uny-random'

describe('.value vs. UnityEngine.Random.value', () => {
  test.each([
    { init: 0,          expected: [0.5841396, 0.5840824,  0.6736069,  0.766507,   0.3050319] },
    { init: 2147483647, expected: [0.169694,  0.07331086, 0.4194092,  0.9295188,  0.1002243] },
    { init: 3351175,    expected: [0,         0.5957063,  0.7824091,  0.5570976,  0.2050821] },
    { init: 7597963,    expected: [1,         0.6586395,  0.9760998,  0.6824545,  0.8340771] },
    { init: 96438,      expected: [0.6562939, 0.605054,   0.5398842,  0.8613842,  0.6603977] },
    { init: 4919044,    expected: [0.6829051, 0.7540809,  0.9625161,  0.1100732,  0.4889563] },
    { init: 11288839,   expected: [0.9660726, 0.06430603, 0.7647283,  0.2359069,  0.9815067] },
    { init: 77823943,   expected: [0.993881,  0.3897532,  0.1020132,  0.4291891,  0.6358299] },
    { init: 1218593819, expected: [0.5975241, 0.8190207,  0.121665,   0.138771,   0.6793048] },
    { init: 1585133052, expected: [0.8390949, 0.8519332,  0.7362407,  0.1827316,  0.9954406] },
    { init: 1658364365, expected: [0.6776686, 0.3968328,  0.08307291, 0.05327214, 0.2266419] },
  ])('should match the first $expected.length [0, 1] floats - [Seed: $init]', ({ init, expected }) => {
    // Arrange
    const rand = new UnyRandom(init);
    // Act
    expected.forEach((curr) => {
      // Act
      const result = rand.value;
      // Assert
      expect(result).toEqual(curr);
    });
  });
});
