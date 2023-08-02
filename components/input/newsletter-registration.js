import { useRef } from "react";
import classes from "./newsletter-registration.module.css";

function NewsletterRegistration() {
  const emaiLInputRef = useRef();

  function registrationHandler(event) {
    event.preventDefault();

    const enteredEmail = emaiLInputRef.current.value;

    // fetch user input (state or refs)
    fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify({ email: enteredEmail }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch(err => console.error(err));
    // optional: validate input
    // send valid data to API
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={emaiLInputRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
