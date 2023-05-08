import { component$, useStyles$ } from "@builder.io/qwik";

export default component$(() => {
  useStyles$(`
    .loader-container {
        width: 100%;
        height: 100vh;
        position: fixed;
        background: rgba(0, 0, 0, 0.834)
            url("https://media.giphy.com/media/8agqybiK5LW8qrG3vJ/giphy.gif") center
            no-repeat;
        z-index: 1;
    }
    `);
  return <div class="loader-container"></div>;
});
