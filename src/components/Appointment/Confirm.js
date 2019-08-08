import React from "react";
import Button from "../../components/Button";

export default function Confirm(props) {

  return (
    <main class="appointment__card appointment__card--confirm">
      <h1 class="text--semi-bold">{props.message}</h1>
      <section class="appointment__actions">
        <Button
          danger
          onClick={props.onConfirm}
        >
          Cancel
        </Button>
        <Button
          danger
          onClick={props.onCancel}
        >
          Confirm
        </Button>
      </section>
    </main>
  );
};