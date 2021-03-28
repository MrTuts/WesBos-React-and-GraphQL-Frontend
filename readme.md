# Notes

## 04

- `pages` foldes is special folder next.js understands
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
