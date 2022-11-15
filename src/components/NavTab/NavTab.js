import './NavTab.css';

function NavTab() {
  return (
    <section className='navtab'>
      <a href='#about-project' className='navtab__buttom'>О проекте</a>
      <a href='#techs' className='navtab__buttom'>Технологии</a>
      <a href='#about-me' className='navtab__buttom'>Студент</a>
    </section>
  );
}

export default NavTab;