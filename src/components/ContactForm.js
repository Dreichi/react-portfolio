import React, { useState } from "react";

const FORM_ENDPOINT = "https://public.herotofu.com/v1/c9f1bca0-a2fa-11ed-a31e-753411848f80";

const ContactForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = () => {
    setTimeout(() => {
      setSubmitted(true);
    }, 100);
  };

  if (submitted) {
    return (
      <>
        <div className="text-2xl mt-6 text-white justify-center flex">Merci!</div>
        <div className="text-md text-white justify-center flex">J'espère vous répondre très bientôt.</div>
      </>
    );
  }

  return (
    <form id="contact"
      action={FORM_ENDPOINT}
      onSubmit={handleSubmit}
      method="POST"
      target="_blank"
      className="mt-10"
    >
        <div className="justify-center flex mt-4 text-white">
            <h1 className="text-2xl font-bold">Me contacter</h1>
        </div>
      <div className="terminal-block w-full max-w-2xl mx-auto mt-6 p-6 rounded-lg text-green-200">
        <p className="font-mono text-sm text-green-400">[contact@louana]$ send --message</p>
        <div className="mt-4 space-y-4">
          <input
            type="text"
            placeholder="Votre nom"
            name="name"
            className="w-full h-11 px-3 py-3 placeholder-gray-400 text-gray-100 bg-black/40 rounded text-sm border border-gray-700 outline-none focus:outline-none focus:ring focus:ring-green-400"
            required
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            className="w-full px-3 py-3 placeholder-gray-400 text-gray-100 bg-black/40 rounded text-sm border border-gray-700 outline-none focus:outline-none focus:ring focus:ring-green-400"
            required
          />
          <textarea
            placeholder="Votre message"
            name="message"
            className="w-full px-3 py-3 placeholder-gray-400 text-gray-100 bg-black/40 rounded text-sm border border-gray-700 outline-none focus:outline-none focus:ring focus:ring-green-400"
            required
            rows="5"
          />
          <button
            className="cyber-button font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
            type="submit"
          >
           Envoyer un message
          </button>
        </div>
      </div>
    </form>

  );
};

export default ContactForm;