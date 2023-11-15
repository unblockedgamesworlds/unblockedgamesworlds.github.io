var Utils = {
    // getScaleFactor: function(expectWidth, baseWidth) {
    //     let newScale = expectWidth / baseWidth;
    //     return newScale;
    // },

    SpriteSettingsControl: function(_this, posX, posY, imageName, anchorX = null, anchorY = null, scaleX = null, scaleY = null, isInputEnabled = false, OnInputDownEvent = null, OnInputUpEvent = null, OnInputHoverEvent = null, OnInputOutEvent = null) {
        var tempImage = _this.add.image(posX, posY, imageName);
        if (anchorX != null && anchorY != null) {
            tempImage.setOrigin(anchorX, anchorY);
        } else {
            tempImage.setOrigin(0, 0);
        }
        if (scaleX != null && scaleY != null) {
            tempImage.setScale(scaleX, scaleY);
        }
        if (isInputEnabled) {
            tempImage.setInteractive({ useHandCursor: true });
        }
        if (OnInputDownEvent != null)
            tempImage.on("pointerdown", OnInputDownEvent, _this);
        if (OnInputHoverEvent != null)
            tempImage.on("pointerover", OnInputHoverEvent);
        if (OnInputOutEvent != null)
            tempImage.on("pointerout", OnInputOutEvent);
        if (OnInputUpEvent != null)
            tempImage.on("pointerup", OnInputUpEvent, _this);
        return tempImage;
    },

    ButtonScaleTween: function(_this, _refImage, _scale) {
        var ScaleTween = _this.add.tween({
            targets: [_refImage],
            scaleX: _scale * 0.9,
            scaleY: _scale * 0.9,
            ease: 'Linear',
            duration: 50,
            onComplete: this.onCompleteHandler,
            onCompleteParams: [_refImage, _scale],
        });
    },

    onCompleteHandler: function(tween, targets, _refImage, _scale) {
        var te = this.parent.scene.add.tween({
            targets: [_refImage],
            scaleX: _scale * 1,
            scaleY: _scale * 1,
            ease: 'Linear',
            duration: 50,
        });
    }
}