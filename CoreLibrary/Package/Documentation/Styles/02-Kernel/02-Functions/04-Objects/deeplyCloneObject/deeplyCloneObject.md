# `deeplyCloneObject`: Creating the autonomous clone of the object (hash)

As it in many other languages including JavaScript, `object1Clone = object1` will not create the independent copy of
`object1`.

```stylus
object1 = {
  alpha: {
    bravo: "FOO"
  }
}

object1Clone = object1
object1Clone.alpha.bravo = "BAR"

p(object1.alpha.bravo) // => "BAR"
```

The `object1.alpha.bravo` is `"BAR"` because `object1Clone` just refers to `object1`.
To create the autonomous copy of the object (hash), `@yamato-daiwa/frontend` suggests the `deeplyCloneObject`


```stylus
object1Clone = deeplyCloneObject(object1)
object1Clone.alpha.bravo = "BAR"

p(object1.alpha.bravo) // => "FOO"
p(object1Clone.alpha.bravo) // => "BAR"
```
