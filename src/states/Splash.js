import Phaser from 'phaser'
import { imgTable, spriteTable, tileTable } from '../imgTable'
import { loadImages, loadSprites, loadTileMapsJSON } from '../utils'

export default class extends Phaser.State {
  init () {}

  preload () {
    // Load assets
    loadImages(imgTable, this)
    loadSprites(spriteTable, this)
    loadTileMapsJSON(tileTable, this)
  }

  create () {
    this.splashBackground()
    this.startButton()
  }

  splashBackground () {
    this.game.stage.backgroundColor = '#fff'
    this.buildSky()
    this.buildForest()
    this.titleText()
  }

  titleText () {
    this.game.add.text(70, 40, 'Forest Adventure', { font: '20px Cabin Sketch', fill: '#ffffff', align: 'center' })
  }

  buildSky () {
    const skyTile = this.game.add.tileSprite(0, 0, 288, 192, 'sky')
    skyTile.fixedToCamera = true
    return skyTile
  }

  buildForest () {
    const positions = [
      [-60, this.game.world.height - 100, 176, 368],
      [50, this.game.world.height - 70, 176, 368],
      [120, this.game.world.height - 100, 176, 368],
      [190, this.game.world.height - 100, 176, 368]
    ]
    positions.forEach(pos => this.game.add.tileSprite(...pos, 'forest'))
  }

  startButton () {
    const button = this.game.add.button(this.game.world.centerX, this.game.world.centerY + 40, 'crate-button', this.startGame, this, 2, 1, 0)
    button.anchor.setTo(0.5)
    button.alpha = 0.9
    const style = { font: '15px Cabin Sketch', fill: '#47f3ff', align: 'center' }
    this.startText = this.game.add.text(this.game.world.centerX, this.game.world.centerY + 42, 'Start', style)
    this.startText.anchor.setTo(0.5)
    return button
  }

  startGame () {
    this.state.start('Instructions')
  }
}
