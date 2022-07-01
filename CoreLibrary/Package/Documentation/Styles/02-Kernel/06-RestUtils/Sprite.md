# Sprite

```
Sprite({
  spritesMapURL: DataTypes.string;
  width: DataTypes.unit;
  height: DataTypes.unit;
  positiveX_Coordinate: DataType.unit;
  positiveY_Coordinate: DataType.unit;
})
```

The mixin simplifying the usage of sprites - multiple bitmap or vector images merged into one for decrease the requests to server.
Although the inline SVG is better alternative (including easy resizing meris), sprites are still actual practice.


## Example

There are no limitations on icons' sizes and coordinates.
In particular, the icons must not be of same width.
But if they have same size and there is no gap between them, besides the hard-coding of coordinates, 
you can compute the coordinates like: 

```stylus
.AdvantagesBlock

  &-Icon

    ICONS_WIDTH = 24px
    ICONS_HEIGHT = 24px
    
    display block

    
    &__Speed

      // ■ □ □　→ x
      // □ □ □
      // ↓
      // y
      Sprite({
        spritesMapURL: "ExampleSpritesMap.png",
        width: ICONS_WIDTH,
        height: ICONS_HEIGHT,
        positiveX_Coordinate: 0,
        positiveY_Coordinate: 0,
      })

  
    &__Quality

      // □ ■ □　→ x
      // □ □ □
      // ↓
      // y
      Sprite({
        spritesMapURL: "ExampleSpritesMap.png",
        width: ICONS_WIDTH,
        height: ICONS_HEIGHT,
        positiveX_Coordinate: ICONS_WIDTH,
        positiveY_Coordinate: 0,
      })
      

    &__Price

      // □ □ ■　→ x
      // □ □ □
      // ↓
      // y
      Sprite({
        spritesMapURL: "ExampleSpritesMap.png",
        width: ICONS_WIDTH,
        height: ICONS_HEIGHT,
        positiveX_Coordinate: 2*ICONS_WIDTH,
        positiveY_Coordinate: 0,
      })
      
      
    &__Politness

      // □ □ □ → x
      // ■ □ □
      // ↓
      // y
      Sprite({
        spritesMapURL: "ExampleSpritesMap.png",
        width: ICONS_WIDTH,
        height: ICONS_HEIGHT,
        positiveX_Coordinate: 0,
        positiveY_Coordinate: ICONS_HEIGHT,
      })
```
