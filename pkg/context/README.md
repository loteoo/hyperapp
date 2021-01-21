# @hyperapp/jsx

> Pass values down to a part of a view without needing to pass props every time

## Usage

#### Install:

```
npm install @hyperapp/context
```

#### Provide a value:

```js
import { provide } from "@hyperapp/context";

const view = (props) => h("div", {}, [
  provide(value, h("div", {}, [subview(), othersubview()]));
])

```

#### Use a provided value:

```js
const subview = (props) =>
  h("div", {}, [
    (value) =>
      h("div", {}, [
        // Do something with value
      ]),
  ]);
```

## More complex usage

```js
import { h, text } from "hyperapp";
import { provide } from "@hyperapp/context";

import en from "./translations.en.json";
import fr from "./translations.fr.json";

const locales = {
  en,
  fr,
};

// Provide "global" values to a view
const view = ({
  currentLanguage,
  isDarkTheme,
  location,
  auth,
  ...restOfState
}) => {
  const translations = locales[currentLanguage];
  return provide(
    {
      currentLanguage,
      translations,
      isDarkTheme,
      location,
      auth,
    },
    // All this part of the view will have access to the 4 values above,
    // without needing to pass it down as props every time
    h("div", {}, [header(), sidebar(), routes(), footer()])
  );
};

// Conditional rendering deep in the view
const subview1 = () => ({ auth }) =>
  h("div", {}, [
    auth ? h("button", {}, text("Logout")) : h("button", {}, text("Login")),
    ({ isDarkTheme }) =>
      isDarkTheme
        ? h("img", { src: "/logo-white.png" })
        : h("img", { src: "/logo-dark.png" }),
    subview2({ id: "some-id" }),
  ]);

// Update the provided value
const subview2 = ({ id }) => (context) =>
  provide(
    {
      ...context,
      someComputedValue: someObject[id],
    },
    subview3()
  );

const subview3 = () =>
  h("div", {}, [
    ({ someComputedValue }) => text(someComputedValue),
    h("h2", {}, text("Tada!")),
  ]);
```
