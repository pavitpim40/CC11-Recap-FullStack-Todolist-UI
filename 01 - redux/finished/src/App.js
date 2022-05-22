import Header from './components/layout/Header';
import Router from './route/Router';

function App() {
  return (
    <>
      <Header />
      <div className="container max-w-xs pt-5">
        <Router />
      </div>
    </>
  );
}

export default App;
