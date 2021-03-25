import Header from './Header';

export default function Page({ children }) {
  return (
    <div>
      <Header />
      <h1>Cool</h1>
      {children}
    </div>
  );
}
