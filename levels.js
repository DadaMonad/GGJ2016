
window.levels = [
  function level1 (engine) {
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

    putFireChakra(engine, {
      x: 200,
      y: 370
    }, 2)

    putFireChakra(engine, {
      x: 600,
      y: 450
    }, 2)
    waitForSword(engine, level)

    return level
  },
  function level2 (engine) {
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
          x: 1000,
          y: 100
        }
      }],
      score: 0
    }
    
    createBone (670, 200, 680, 330, 30)

    var heart = createOrgan('liver', 370, 400, 0.2, level)

    attachWithRope(engine.world, {
      fromPoint: {x: 600, y: 170},
      to: heart
    })

    attachWithRope(engine.world, {
      fromPoint: {x: 120, y: 170},
      to: heart
    })

    putFireChakra(engine, {
      x: 600,
      y: 450
    }, 10)
    
    putFireChakra(engine, {
      x: 170,
      y:460
    }, 5)

    waitForSword(engine, level)

    return level
  },
  function level3 (engine) {
    var level = {
      attempts: 0,
      maxAttempts: 2,
      organs: [],
      targetZones: [{
        min: {
          x: 30,
          y: 50
        },
        max: {
          x: 230,
          y: 116
        }
      }],
      score: 0
    }
    
    var bone = createBone (70, 400, 420, 750, 30)

    var heart = createOrgan('kidney', 370, 520, 0.3, level)

    attachWithRope(engine.world, {
      fromPoint: {x: 600, y: 170},
      to: heart
    })
    attachWithRope(engine.world, {
      fromPoint: {x: 120, y: 170},
      to: heart
    })
    putFireChakra(engine, {
      x: 110,
      y:710
    }, 5)
    putWoodChakra(engine, {
      x: 600,
      y: 450
    }, bone)

    waitForSword(engine, level)

    return level
  },
  function level4 (engine) {
    var level = {
      attempts: 0,
      maxAttempts: 2,
      organs: [],
      targetZones: [{
        min: {
          x: 50,
          y: 670
        },
        max: {
          x: 330,
          y: 750
        }
      }],
      score: 0
    }
    
    var bone = createBone (250, 400, 570, 750, 30)

    var heart = createOrgan('stomach', 370, 420, 0.2, level)

    attachWithRope(engine.world, {
      fromPoint: {x: 750, y: 170},
      to: heart
    })
    attachWithRope(engine.world, {
      fromPoint: {x: 270, y: 170},
      to: heart
    })
    putWaterChakra(engine, {
      x: 600,
      y: 450
    }, 2000)

    waitForSword(engine, level)

    return level
  },
  function level5 (engine) {
    var level = {
      attempts: 1,
      maxAttempts: 2,
      organs: [],
      targetZones: [{
        min: {
          x: 420,
          y: 670
        },
        max: {
          x: 650,
          y: 750
        }
      }],
      score: 0
    }
    
    createBone (320, 500, 770, 500, 40)
    var bone = createBone (680, 760, 1000, 370, 50)

    var heart = createOrgan('heart', 370, 40, 0.2, level)

    putMetalChakra(engine, {
      x: 600,
      y: 450
    }, 2000)
    putFireChakra(engine, {
      x: 130,
      y: 630
    })

    waitForSword(engine, level)

    return level
  },
  function bonuslevel (engine) {
    var level = {
      attempts: 0,
      maxAttempts: 200000000,
      organs: [],
      targetZones: [{
        min: {
          x: 300,
          y: 20
        },
        max: {
          x: 570,
          y: 200
        }
      }],
      score: 0
    }

    var heart = createOrgan('heart', 370, 400, 0.2, level)
    
    var bone = createBone (670, 200, 680, 330, 30)
    
    addSword(engine, {x:300, y:300}, level)

    return level
  },
  function testLevel (engine) {
    var level = {
      attempts: 0,
      maxAttempts: 200000000,
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
    

    var heart = createOrgan('heart', 370, 400, 0.2, level)
    
    var bone = createBone (670, 200, 680, 330, 30)

    putWoodChakra(engine, {
      x: 600,
      y: 450
    }, bone)

    waitForSword(engine, level)

    return level
  }
]
