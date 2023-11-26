import Bootstrap from './scenes/Bootstrap'
import Game from './scenes/Game'
import Phaser from 'phaser'

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: [Bootstrap, Game],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 }
    }
  }
}

export default new Phaser.Game(config)
