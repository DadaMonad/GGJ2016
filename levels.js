window.levels = {
  '#1': function level1 (engine) {
    var level = {
      attempts: 0,
      maxAttempts: 2,
      organs: [],
      targetZones: [{
        min: {
          x: 500,
          y: 60
        },
        max: {
          x: 700,
          y: 150
        }
      }],
      score: 0
    }

    var lung = createOrgan('lungs', 300, 300, 0.1, level)

    var heart = createOrgan('heart', 600, 350, 0.2, level)

    attachWithRope(engine.world, {
      fromPoint: {x: 200,y: 100},
      to: lung
    })
    attachWithRope(engine.world, {
      fromPoint: {x: 400, y: 100},
      to: lung
    })

    attachWithRope(engine.world, {
      fromPoint: {x: 600, y: 170},
      to: heart
    })

    putExplodeChakra(engine, {
      x: 200,
      y: 370
    })

    putExplodeChakra(engine, {
      x: 600,
      y: 450
    })
    waitForSword(engine, level)

    return level
  },
  '#2': function level2 (engine) {
    var level = {
      attempts: 0,
      maxAttempts: 2,
      organs: [],
      targetZones: [{
        min: {
          x: 700,
          y: 20
        },
        max: {
          x: 970,
          y: 200
        }
      }],
      score: 0
    }

    createBone (670, 200, 680, 330, 30)

    var heart = createOrgan('heart', 370, 400, 0.2, level)

    attachWithRope(engine.world, {
      fromPoint: {x: 600, y: 170},
      to: heart
    })
    attachWithRope(engine.world, {
      fromPoint: {x: 120, y: 170},
      to: heart
    })

    putExplodeChakra(engine, {
      x: 600,
      y: 450
    }, 10)
    waitForSword(engine, level)

    return level
  }
}
