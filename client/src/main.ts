import { TestScene } from './scenes/TestScene'
import Phaser from 'phaser'

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: TestScene,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 }
    }
  }
}

export default new Phaser.Game(config)
