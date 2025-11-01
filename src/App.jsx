import React from 'react';
import Brand from './components/Brand';
import Menu from './components/Menu';
import Section from './components/Section';

const App = () => {
  return (
    <div className="w-[90vw] h-[100vh] bg-opacity-70 mx-15 my-10 rounded-2xl shadow-2xl bg-white relative">
      <header className='h-10.5 w-full px-10 py-9'>
        <Brand/>
      </header>
      <Menu />
      <Section/>
    </div>
  );
};

export default App;
