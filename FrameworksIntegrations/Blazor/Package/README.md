# Yamato Daiwa Frontend - Blazor adaptation

The adaptation of the ["Yamato Daiwa Frontend"](https://github.com/TokugawaTakeshi/Yamato-Daiwa-Frontend/blob/master/CoreLibrary/Package/README.md) 
  toolkit for the Blazor framework.

As the adaptation to another frameworks, this package does not provides the styles.
Please get the styles from the [core npm package](https://www.npmjs.com/package/@yamato-daiwa/frontend).


## (GUI) Components
### AdmonitionBlock

```razor
<AdmonitionBlock
  title="Success"
  decoration=@(AdmonitionBlock.StandardDecorativeVariations.success)
>
  <p>Logged in</p>
</AdmonitionBlock>
```


### Badge

```razor
@using YamatoDaiwa.Frontend.Components.Badge


<Badge
  value="Hello, world!"
  decoration=@Badge.StandardDecorativeVariations.calmingBright
/>
```


### Loading placeholder


```razor
<BadgeLoadingPlaceholder />
```