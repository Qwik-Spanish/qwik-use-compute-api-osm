import { component$, useStyles$ } from "@builder.io/qwik";
interface AlertProps {
  text: string;
  type: "warning" | "success" | "info";
}

export default component$((props: AlertProps) => {
  useStyles$(`
    .alert {
        padding: 1rem;
        border-radius: 0.5rem;
        margin-top: 0.6rem;
      }
      
      .alert-warning {
        color: #856404;
        background-color: #fff3cd;
        border-color: #ffeeba;
      }
      
      .alert-success {
        background-color: #d1e7dd;
        color: #205e42;
        border-color: #205e42;
      }
    `);
  return (
    <div class={"alert alert-".concat(props.type || "info")}>{props.text}</div>
  );
});
