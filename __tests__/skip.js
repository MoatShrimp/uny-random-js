import { UnyRandom }  from '../src/uny-random'

describe('.skip', () => {
  
  test.each([
    { init: 0,          steps: 87,  expected: [1132614473, 2909454521, 1372104530, 3836455820] },
    { init: 2147483647, steps: 77,  expected: [1307723799, 552490512,  3898723849, 2360864465] },
    { init: 3351175,    steps: 654, expected: [3584234488, 2691255134, 2292099010, 3469460065] },
    { init: 7597963,    steps: 37,  expected: [2231739152, 2033765001, 2260179569, 4111193051] },
    { init: 185423,     steps: 70,  expected: [1575249837, 685374958,  775893919,  2928260196] },
    { init: 31772479,   steps: 13,  expected: [2461492536, 63619573,   1030979126, 522036702]  },
    { init: 262135318,  steps: 34,  expected: [923662666,  3421772121, 1043340524, 3782016168] },
    { init: 582038541,  steps: 11,  expected: [461757441,  3692252494, 1169677888, 2669906841] },
    { init: 1027291213, steps: 97,  expected: [2713057255, 643850262,  2084996529, 1417112826] },
    { init: 1216022583, steps: 712, expected: [2545655932, 1060991078, 2704064004, 15704702]   },
    { init: 1632826035, steps: 40,  expected: [3878320095, 1128861853, 3449674407, 865087324]  },
  ])('should have expected state after skipping $steps steps - [SEED: $init]', ({ init, steps, expected }) => {

    // Arrange
    const rand = new UnyRandom(init);

    // Act
    rand.skip(steps);

    // Assert
    expect(rand.state).toEqual(expected);
  });
});
