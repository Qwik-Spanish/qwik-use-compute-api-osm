import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { QwikLogo } from '../icons/qwik';
import styles from './header.module.css';

export default component$(() => {
  useStylesScoped$(`
  img.profile {
    margin-top: -15px;
    width: 30%;
    border-radius: 50%;
  }
  ul {
    margin-top: -15px;
  }
  `)
  return (
    <header class={styles.header}>
      <div class={['container', styles.wrapper]}>
        <div class={styles.logo}>
          <a href="/" title="OSM">
            <img class="profile" src="https://img-c.udemycdn.com/user/200_H/3194958_0f69_6.jpg" alt="Anartz Mugika Profile photo" />
          </a>
          
        </div>
        <ul>
          <li>
            <a href="https://anartz-mugika.com" target="_blank" title='Mi página personal'>
              Página Personal
            </a>
          </li>
          <li>
            <a href="https://twitter.com/mugan86" target="_blank" title='Twitter Anartz Mugika Ledo'>
              Twitter
            </a>
          </li>
          <li>
            <a href="https://github.com/mugan86" target="_blank" title='Proyectos en Github'>
              Github
            </a>
          </li>
          <li>
            <a href="https://udemy.com/user/anartzmugika" target="_blank" title='Cursos Online Anartz Mugika'>
              Udemy
            </a>
          </li>
          <li>
            <a href="https://mugan86.medium.com/" target="_blank" title='Artículos técnicos sobre Angular, Qwik, Python,...'>
              Blog Tech - Medium
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
});
