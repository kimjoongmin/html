# CSS 프로퍼티 값의 단위

## 키워드

각 프로퍼티에 따라 사용할 수 있는 키워드가 존재한다. 예를 들어 display 프로퍼티 값으로 사용할 수 있는 키워드는 block, inline, inline-block, none 이 있다.

## 크기 단위

cm, mm, inch, 등의 단위도 존재하나 css에서 사용하는 대표적인 크기 단위는 px, em, %이다

px는 절대값이고 em, % 는 상대값이다

대부분 브라우저의 폰트 사이즈 기본값은 16px, 1em, 100% 이다. 프로퍼티 값이 0인 경우 단위를 생략할 수 있다.

### px

px은 필셀(화소)단위이다. **1px은 화소 1개 크기**를 의미.
22인치 모니터 경우 해상도가 1680\*1050 인데 이것은 가로에 1680개 세로에 1050개의 픽셀을 가진다는 의미.
200만 화소의 디지털 카메라로 찍은 사진은 1600\*1200=1,920,000으로 통상 200만 화소라 한다.

픽셀은 디바이스 **해상도**에 따라 상대적인 크기를 갖는다. 대부분의 브라우저는 1px을 1/96인치의 절대단위로 인식.

### %

%는 백분률 단위의 상대 단위이다.
요소에 지정된 사이즈(상속된 사이즈나 디폴트 사이즈)에 상대적인 사이즈를 설정.

```
Font size: 14px * 120% → 16.8px
```

### em

em은 배수 단위로 상대 단위. 요소에 지정된 사이즈(상속된 사이즈나 디폴트 사이즈)에 상대적인 사이즈 설정.
예를들어 1em은 요소에 지정된 사이즈와 같고 2em은 요소에 지정된 사이즈의 2배이다.

폰트 사이즈 설정이나 콘텐츠를 포함하는 컨테이너의 크기 설정에 사용하면 상대적인 설정이 가능하여 편리

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      body {
        font-size: 14px;
        text-align: center;
      }
      div {
        font-size: 1.2em; /* 14px * 1.2 = 16.8px */
        font-weight: bold;
        padding: 2em; /* 16.8px * 2 = 33.6px */
        background-color: rgba(255, 0, 0, 0.2);
      }
    </style>
  </head>
  <body>
    <div>Font size: 1.2em → 14px * 1.2 = 16.8px</div>
  </body>
</html>
```

중첩된 자식 요소에 em을 지정하면 모든 자식 요소의 사이즈에 영향을 미치기 때문에 주의.

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      body {
        font-size: 14px;
        text-align: center;
      }
      div {
        font-size: 1.2em; /* 14px * 1.2 = 16.8px */
        font-weight: bold;
        padding: 2em;
      }
      .box1 {
        background-color: rgba(255, 0, 0, 0.2);
      }
      .box2 {
        background-color: rgba(255, 0, 0, 0.6);
      }
      .box3 {
        background-color: rgba(255, 0, 0, 0.8);
      }
    </style>
  </head>
  <body>
    <div class="box1">
      Font size: 1.2em ⇒ 14px * 1.2 = 16.8px
      <div class="box2">
        Font size: 1.2em ⇒ 16.8px * 1.2 = 20.16px
        <div class="box3">Font size: 1.2em ⇒ 20.16px * 1.2 = 24.192px</div>
      </div>
    </div>
  </body>
</html>
```

### rem

em의 기준은 상속의 영향으로 바뀔 수 있다. 즉, 상황에 따라 1.2em은 각기 다른 값을 가질 수 있다.
**rem은 최상위 요소(html)의 사이즈를 기준**으로 삼는다. rem의 r은 root를 의미

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      html {
        font-size: 14px;
        /* font-size 미지정 시에는 16px */
      }
      div {
        font-size: 1.2rem; /* html font-size: 14px * 1.2 = 16.8px */
        font-weight: bold;
        padding: 2em;
        text-align: center;
      }
      .box1 {
        background-color: rgba(255, 0, 0, 0.2);
      }
      .box2 {
        background-color: rgba(255, 0, 0, 0.6);
      }
      .box3 {
        background-color: rgba(255, 0, 0, 0.8);
      }
    </style>
  </head>
  <body>
    <div class="box1">
      Font size: 1.2rem ⇒ 14px * 1.2 = 16.8px
      <div class="box2">
        Font size: 1.2rem ⇒ 14px * 1.2 = 16.8px
        <div class="box3">Font size: 1.2rem ⇒ 14px * 1.2 = 16.8px</div>
      </div>
    </div>
  </body>
</html>
```

사용자가 브라우저의 기본 폰트 크기를 변경하더라도 이에 따라 웹사이트의 레이아웃을 적절히 조정할 수 있다는 장점. 폰트 사이즈 뿐만이 아니라 콘텐츠의 크기에 따라 가변적으로 대응하여야하는 wrapper 요소(container)등에 적합

### viewport 단위(vh, vw, vmin, vmax)

반응형 웹디자인은 화면의 크기에 동적으로 대응하기 위해 % 단위를 자주 사용한다. 하지만 % 단위는 em과 같이 상속에 의해 부모 요소에 상대적 영향을 받는다. Viewport 단위는 상대적인 단위로 viewport를 기준으로 한 상대적 사이즈를 의미.

viewport 너비가 1000px, 높이가 600px 이면!

- 1vw : viewport 너비 1000px의 1%인 10px
- 1vh : viewport 높이 600px의 1%인 6px
- vmin : viewport 높이 600px의 1%인 6px
- vmax : viewport 너비 1000px의 1%인 10px

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      body {
        margin: 0px;
      }
      .item {
        width: 50vw;
        height: 100vh;
        text-align: center;
        line-height: 100vh;
        font-size: 4rem;
        color: white;
      }
      .item1 {
        background-color: red;
      }
      .item2 {
        background-color: orange;
      }
    </style>
  </head>
  <body>
    <div class="item item1">item1</div>
    <div class="item item2">item2</div>
  </body>
</html>
```

IE 8 이하는 지원하지 않으며 IE9 ~ 11, Edge는 지원이 완전하지 않으므로 주의가 필요

## 색상 표현 단위

- HEX 코드 단위 (Hexadecimal Colors) #000000
- RGB (Red, Green, Blue) rgb(255, 255, 0)
- RGBA (Red, Green, Blue, Alpha/투명도) rgba(255, 255, 0, 1)
- HSL (Hue/색상, Saturation/채도, Lightness/명도) hsl(0, 100%, 25%)
- HSLA (Hue, Saturation, Lightness, Alpha) hsla(60, 100%, 50%, 1)

```html
<!DOCTYPE html>
<html>
  <body>
    <h2 style="background-color:red">Red background-color</h2>

    <h2 style="background-color:green">Green background-color</h2>

    <h2 style="background-color:blue;color:white">
      Blue background-color and white text color
    </h2>

    <h2 style="background-color:orange">Orange background-color</h2>

    <h2 style="background-color:yellow">Yellow background-color</h2>

    <h2 style="background-color:cyan">Cyan background-color</h2>

    <h2 style="background-color:black;color:white">
      Black background-color and white text color
    </h2>
  </body>
</html>
```
