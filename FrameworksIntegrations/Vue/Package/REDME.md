# Yamato Daiwa Frontend 〔Vue〕

The adaptation of [Yamato-Daiwa FrontEnd](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend) for [Vue](https://vuejs.org/index.html) framework (3.x only).


## Installation

```bash
npm i @yamato-daiwa/frontend-vue @yamato-daiwa/frontend -E
```


## Usage

You can import everything what you need from the root of library.

```typescript
import { OverflowSafeSingleLineLabel } from "@yamato-daiwa/frontend-vue";
```


## Available functionality

### Components

Please note that `@yamato-daiwa/frontend-vue` suggests only the logic for the Vue components *without styles*. 
To enable the styles, get them from `@yamato-daiwa/frontend` and setup according core package documentation.

* [`OverflowSafeSingleLineLabel`](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Components/OverflowSafeSingleLineLabel/OverflowSafeSingleLineLabel.md)


| Component name              | Basic documentation                                                                                                                                                                                 | Vue 3.x example                                      |
|-----------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------|
| OverflowSafeSingleLineLabel | [Basic documentation](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/Documentation/Components/OverflowSafeSingleLineLabel/OverflowSafeSingleLineLabel.md) | [Vue 3.x example](Tests/OverflowSafeSingleLineLabel) |
|                             |                                                                                                                                                                                                     |                                                      |


### Helper functions

<dl>

  <dt><code>getExpectedToBeMountedDOM_ElementByVueReferenceID</code></dt>
  <dd>
    Retrieves by Vue reference expected to be mounted DOM element owned by specific Vue component.
    The default return type is <code>Element</code> however with <code>TargetElementSubtype</code> property
      of sole object type parameter has been specified any inheritor of <code>Element</code> could be retrieved
      type safely.
  </dd>

</dl>


## Dependencies

<dl>

  <dt>@babel/types</dt>
  <dd>Used by Vue package; required to be installed to generate TypeScript type declaration.</dd>

</dl>
