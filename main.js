// Matter.js module aliases
var Engine = Matter.Engine,
  World = Matter.World,
  Bodies = Matter.Bodies,
  Common = Matter.Common,
  Vertices = Matter.Vertices,
  Vector = Matter.Vector,
  Svg = Matter.Svg,
  Bounds = Matter.Bounds,
  MouseConstraint = Matter.MouseConstraint,
  Constraint = Matter.Constraint,
  Events = Matter.Events,
  Body = Matter.Body

var canvasHeight = 800
var canvasWidth = 1000
var margin = 20
var marginTop = 40

// create a Matter.js engine
var engine = Engine.create(document.body, {
  render: RenderPixi2.create({
    element: document.body,
    options: {
      debug: false,
      width: canvasWidth,
      height: canvasHeight
    }
  })
})

var queue = new createjs.LoadQueue(true)

var loadingText = new PIXI.Text('Loading...', {font: '24px Arial', fill: 0xff1010, align: 'center'})
engine.render.textContainer.addChild(loadingText)

function loadFiles () {
  for (var organ in organs) {
    queue.loadFile(organs[organ].collision, false)
    queue.loadFile(organs[organ].image, false)
  }

  queue.loadFile('img/bone_end_collision.svg', false)
  queue.loadFile('img/bone_end.png', false)
  queue.loadFile('img/bone.png', false)
  queue.loadFile('img/foreground.png', false)
  queue.loadFile('img/background.png', false)
  queue.loadFile('img/yinyang.png', false)

  queue.on('complete', function () {
    engine.render.textContainer.removeChild(loadingText)
    var foreground = new PIXI.Sprite.fromImage('img/foreground.png')
    engine.render.textContainer.addChild(foreground)
    var background = new PIXI.Sprite.fromImage('img/background.png')
    engine.render.backgroundContainer.addChild(background)
    buildPaths()
    createLevel()
  })

  queue.load()
}

var boneEndPath, boneEndBounds

function buildPath (file) {
  var data = queue.getResult(file)
  var path = $(data).find('path')[0]
  return Svg.pathToVertices(path, 10)
}

function buildPaths () {
  boneEndPath = buildPath('img/bone_end_collision.svg')
  boneEndBounds = Bounds.create(boneEndPath)

  for (var organ in organs) {
    organ = organs[organ]
    var p = organ._path = buildPath(organ.collision, false)
    organ._bounds = Bounds.create(p)
    var img = queue.getResult(organ.image)
    organ._width = img.width
    organ._height = img.height
  }
}

function createBox () {
  var boxTop = Bodies.rectangle(canvasWidth / 2, margin / 2, canvasWidth, margin, {
    render: { visible: false },
    isStatic: true
  })
  var boxLeft = Bodies.rectangle(margin / 2, canvasHeight / 2, margin, canvasHeight, {
    render: { visible: false },
    isStatic: true
  })
  var boxRight = Bodies.rectangle(canvasWidth - margin / 2, canvasHeight / 2, margin, canvasHeight, {
    render: { visible: false },
    isStatic: true
  })
  var boxBottom = Bodies.rectangle(canvasWidth / 2, canvasHeight - margin / 2, canvasWidth * 2, margin, {
    render: { visible: false },
    isStatic: true
  })

  World.add(engine.world, [boxTop, boxLeft, boxRight, boxBottom])
}

function createLevel () {
  createBox()
  var level = window.levels[location.hash](engine)

  Events.on(engine, 'tick', function (event) {
    for (var i = 0; i < level.targetZones.length; i++) {
      var zone = level.targetZones[i]
      var result = Matter.Query.region(level.organs, zone)
      for (var j = 0; j < result.length; j++) {
        var center = Vertices.centre(result[j].vertices)
        if (Bounds.contains(zone, center)) {
          World.remove(engine.world, result[j])
          level.organs.splice(level.organs.indexOf(result[j]), 1)
          level.score++
          refreshScore(level)
          break
        }
      }
    }
  })
  for (var i = 0; i < level.targetZones.length; i++) {
    var zone = level.targetZones[i]
    var graphics = new PIXI.Graphics()

    graphics.beginFill(0x0088FF, 0.2)
    graphics.drawRect(zone.min.x, zone.min.y, zone.max.x - zone.min.x, zone.max.y - zone.min.y)

    engine.render.backgroundContainer.addChild(graphics)
  }

  startParticles(engine)
  refreshScore(level)
}

var scoreText
function refreshScore (level) {
  if (!scoreText) {
    scoreText = new PIXI.Text('Score: 0', {font: '24px Arial', fill: 0xff1010, align: 'center'})
    engine.render.textContainer.addChild(scoreText)
  }

  scoreText.setText('Score: ' + level.score)
}

loadFiles()

var renderOptions = engine.render.options
renderOptions.showAngleIndicator = false
renderOptions.wireframes = false
renderOptions.showConvexHull = true
engine.enableSleeping = true

// run the engine
Engine.run(engine)

waitForSword(engine)

function clearGame () {
  while (engine.render.backgroundContainer.children[1]) { 
    engine.render.backgroundContainer.removeChild(engine.render.backgroundContainer.children[1]); 
  }
  Matter.World.clear(engine.world, false, true)
}