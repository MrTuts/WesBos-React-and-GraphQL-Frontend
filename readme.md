# Notes

## 04

- `pages` folder is special folder next.js understands
- `pages/_app.tsx` file is special file for wrapping page components. Every page is wrapped by `_app.tsx`
- `pages/_document.tsx` file is special file for setting page headers

## O5

- navigation handled in `components/Nav.tsx` using `Link from 'next/link';`

## O7

- global styles are defined in `components/Page.tsx` using `styled-components`, there are few interesting things
- files to include (e.g. fonts) are placed into `public/static`

## 08

- the top bar loader when navigating between screens is provided by `nprogress` package
- we can import libs default styles by simply `import 'nprogress/nprogress.css';` or use custom css
- configured in `pages/_app.tsx`

## 09

- <https://styled-components.com/docs/advanced#server-side-rendering>
- configured in `pages/_document.tsx`

## 10 - 18

- in backend project

## 19

- We use Apollo to fetch data from FE, it caches data for us by default
- apollo-boost is library containing the most common setup. If we need some other functionality, we have to "eject" from it. Eg. image uploading is not supported
- Apollo is setup in `lib/withData.ts`
- exports Provider used in `pages/_app.tsx`

##  20

- we make query like this `const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY);` (see `components/Products.tsx`). We won't get `loading` on initial render, because it's loaded on server side (if the page is server loaded)

## 22

- Example form in `pages/sell.tsx`
- We've create custom hook for handling form inputs in `lib/useForm.ts`

##  23

- `fieldset` lets us control wrapped inputs, e.g. disabling them all. `aria-busy` is aria accessibility attribute, we use it for loading indication (look at `components/styles/Form.ts` for `aria-busy='true'`)
- we can use `required` prop on `input` field

## 24

- GraphQL mutation example in `components/CreateProduct.tsx`

##  25

- To update list of data after we add new item, we can directly modify the Apollo cache. Or
- we can tell Apollo to refresh the list after the mutation - `refetchQueries` in `components/CreateProduct.tsx`
