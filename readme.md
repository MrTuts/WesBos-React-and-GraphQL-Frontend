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

##  26

- Navigate programmatically using `Router from 'next/router';`. See `components/CreateProduct.tsx`

## 27

- CRUDS stands for Create, Read, Update, Delete, Subscribe
- we can make navigation like `https.../product/a53sf5m` by creating `product` folder with `[id].tsx` file. This is called Dynamic Routing
- We can also make nested queries by e.g. `pages/[number]/[id].tsx`
- We should get the `id` in `query` Prop of that file? From docs we need to use `useRouter`
- When we want to fetch single item from query, we need to look by unique field
- We can change the title tag (tab name in browser) by using `Head` component, e.g. see `components/SingleProduct.tsx`

## 28

- Another way of navigating (using queries) is in `components/Product.tsx`. Query is received in same object as using Dynamic Routes

## 30

- Interesting approach to preventing unwanted button press - counting number of presses and calling the action after x press. Not implemented here
- Here we use build-in `confirm('..')` function, see `components/DeleteProduct.tsx`. Not very user friendly

## 31

- Removing item from cache after item is deleted on BE in `update` fn in `components/DeleteProduct.tsx`

## 32

- If we need to put custom props to `Link` component, then we need to pass those props to `<a>` tag in `Link`. See `components/Pagination.tsx`

## 33

- Placing `index.tsx` file into dynamic folder will allow us to access the route without query.
- We could also instead have following folder structure `pages/products.tsx` and `pages/products/[page].tsx`

## 34

- Pagination query in `components/Products.tsx`

##  35

- Moving items in paginated cache solved in `lib/paginationField.ts`. For that to work, there is also crucial function `cache.evict(cache.identify(payload.data.deleteProduct));` in `components/DeleteProduct.tsx`.
- The solution has some bugs

## 36

- querying for type containing union of types can be done by `... on UnionType { }`, see `components/User.tsx`

## 40

- to be able to call the mutation `sendUserPasswordResetLink` in `components/RequestReset.tsx` we need to activate this feature in keystone, see backend `keystone.ts`
