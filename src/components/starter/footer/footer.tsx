import { component$ } from '@builder.io/qwik';
import { useServerTimeLoader } from '~/routes/layout';
import styles from './footer.module.css';

export default component$(() => {
  const serverTime = useServerTimeLoader();

  return (
    <footer>
      <div class="container">
        <a href="https://mugan86.medium.com/" target="_blank" class={styles.anchor}>
          <span>Made with ♡ Anartz Mugika Ledo</span>
          <span class={styles.spacer}>|</span>
          <span>{serverTime.value.year}</span>
        </a>
      </div>
    </footer>
  );
});
