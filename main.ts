namespace SpriteKind {
    export const PowerUp = SpriteKind.create()
    export const Mode = SpriteKind.create()
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . 9 9 . . 
        . . . . . . . . . 9 9 9 5 9 . . 
        . . . . . . . . 9 9 9 5 9 9 . . 
        . . 9 9 9 9 9 9 9 5 5 9 9 . . . 
        . . . . . . . . . 9 9 9 . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, mySprite, 200, 0)
    if (double_fire_mode && double_fire_mode.lifespan > 0) {
        projectile.y += -5
        projectile = sprites.createProjectileFromSprite(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . 9 9 . . . 
            . . . . . . . . 9 9 9 5 9 . . . 
            . . . . . . . 9 9 9 5 9 9 . . . 
            . 9 9 9 9 9 9 9 5 5 9 9 . . . . 
            . . . . . . . . 9 9 9 . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, mySprite, 200, 0)
        projectile.y += 5
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.PowerUp, function (sprite, otherSprite) {
    double_fire_mode = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . 9 9 . . 
        . . . . . . . . . 9 9 9 5 9 . . 
        . . . . . . . . 9 9 9 5 9 9 . . 
        . . 9 9 9 9 9 9 9 5 5 9 9 . . . 
        . . . . . . . . . 9 9 9 . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . 9 9 . . 
        . . . . . . . . . 9 9 9 5 9 . . 
        . . . . . . . . 9 9 9 5 9 9 . . 
        . . 9 9 9 9 9 9 9 5 5 9 9 . . . 
        . . . . . . . . . 9 9 9 . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Mode)
    double_fire_mode.setPosition(50, 9)
    double_fire_mode.lifespan = 10000
    powerUp.destroy()
})
statusbars.onZero(StatusBarKind.EnemyHealth, function (status) {
    enemyDeath(status.spriteAttachedTo())
})
function enemyDeath (enemy: Sprite) {
    enemy.destroy(effects.disintegrate, 500)
    if (Math.percentChance(5)) {
        powerUp = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . 8 8 8 8 8 8 8 . . . . . . 
            . . . 8 5 5 5 5 5 8 8 . . . . . 
            . . . 8 5 5 8 8 5 5 8 . . . . . 
            . . . 8 5 8 8 8 8 5 8 . . . . . 
            . . . 8 5 5 8 8 5 5 8 . . . . . 
            . . . 8 5 5 5 5 5 8 8 . . . . . 
            . . . 8 5 8 8 8 8 8 . . . . . . 
            . . . 8 5 8 . . . . . . . . . . 
            . . . 8 5 8 . . . . . . . . . . 
            . . . 8 5 8 . . . . . . . . . . 
            . . . 8 8 8 . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.PowerUp)
        powerUp.x = enemy.x
        powerUp.y = enemy.y
    }
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeScoreBy(1)
    sprite.destroy()
    statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, otherSprite).value += -15
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    scene.cameraShake(4, 500)
    enemyDeath(otherSprite)
})
let statusbar: StatusBarSprite = null
let enemyShip: Sprite = null
let powerUp: Sprite = null
let double_fire_mode: Sprite = null
let projectile: Sprite = null
let mySprite: Sprite = null
effects.starField.startScreenEffect()
mySprite = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . 6 4 4 4 
    . . . . . . . . . . 6 6 6 6 6 . 
    . . . . . . . . 6 6 6 6 6 . . . 
    . . . . . . . 6 6 6 6 6 6 . . . 
    . . . . 6 6 6 6 6 6 6 6 . . . . 
    . . 8 8 8 8 8 8 8 8 8 a . . . . 
    6 6 6 6 6 6 6 6 6 6 a a a . . . 
    . 6 6 6 6 6 6 6 6 6 a a a . . . 
    . . 8 8 8 8 8 8 8 8 8 a . . . . 
    . . . 6 6 6 6 6 6 6 6 6 . . . . 
    . . . . . . 6 6 6 6 6 6 6 6 . . 
    . . . . . . . . . . 6 6 6 6 . . 
    . . . . . . . . . . . . . 4 4 4 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
controller.moveSprite(mySprite)
mySprite.setFlag(SpriteFlag.StayInScreen, true)
info.setLife(5)
let enemy_speed = 20
let enemy_spawn_time = 5000
game.onUpdateInterval(5000, function () {
    enemy_speed += 5
    enemy_speed = Math.min(enemy_speed, 55)
    enemy_spawn_time += -200
    enemy_spawn_time = Math.max(enemy_spawn_time, 500)
})
forever(function () {
    enemyShip = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . 2 2 . . . . . . . 
        . . . . . . . 3 2 . . . . . . . 
        . . . . . . . 3 2 4 . . . . . . 
        . . . . . . 3 3 2 4 4 . . . . . 
        . . . . . . 3 2 2 4 4 . . . . . 
        . . . . . 3 3 2 2 . . . . . . . 
        . . . . 3 3 2 2 2 . . . . . . . 
        . . 2 3 3 2 2 2 2 . . . . . . . 
        . 2 2 2 2 2 2 2 2 . . . . . . . 
        . . . . 3 2 2 2 2 4 . . . . . . 
        . . . . 3 3 2 2 2 4 4 . . . . . 
        . . . . . . 3 3 2 4 4 . . . . . 
        . . . . . . . 3 2 . . . . . . . 
        . . . . . . . . 2 . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Enemy)
    enemyShip.x = scene.screenWidth()
    enemyShip.vx = 0 - enemy_speed
    enemyShip.y = randint(10, scene.screenHeight() - 10)
    statusbar = statusbars.create(15, 2, StatusBarKind.EnemyHealth)
    statusbar.attachToSprite(enemyShip)
    statusbar.max = 100
    pause(enemy_spawn_time)
})
forever(function () {
    music.playMelody("F E C D C E D E ", 200)
})
