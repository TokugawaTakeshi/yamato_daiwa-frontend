# `deeplyCloneAndOverrideObject`: Deep cloning and overriding the object (hash)

```
deeplyCloneAndOverrideObject(targetObject: object, overridings: object): object 
```

The [`deeplyCloneObject`](../deeplyCloneObject/deeplyCloneObject.md) allows to, obviously, deeply clone the object,
but usually no need to clone the object until modify it. `deeplyCloneAndOverrideObject` allows to immediately to modify
the cloned object.

Please note that if `targetObject` has `alpha: "FOO"` and `overridings` has `alpha: null`, the result will be `alpha: null`.


```stylus
operand1 = {
  alpha: {
    bravo: "FOO",
    charlie: "BAR"
  }
}

operand2 = {
  alpha: {
    bravo: null,
    delta: "BAZ"
  },
  echo: "HOGE"
}

result = deeplyCloneAndOverrideObject(operand1, operand2)

p(operand1)
p(operand2)
p(result)

result.alpha.bravo = "FUGA"

p(operand1.alpha.bravo)
p(result.alpha.bravo)
```
