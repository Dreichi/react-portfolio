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
    >
        <div className="justify-center flex mt-4 text-white">
            <h1 className="text-2xl font-bold">Me contacter</h1>
        </div>
      <div className="mt-6 justify-center flex mb-3 pt-0">
        <input
          type="text"
          placeholder="Votre nom"
          name="name"
          className="w-96 h-11 px-3 py-3 placeholder-gray-400 text-gray-600 flex bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
          required
        />
      </div>
      
      <div className="justify-center flex mb-3 pt-0">
        <input
          type="email"
          placeholder="Email"
          name="email"
          className="w-96 px-3 py-3 placeholder-gray-400 text-gray-600 flex bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
          required
        />
      </div>
      <div className="justify-center flex mb-3 pt-0">
        <textarea
          placeholder="Votre message"
          name="message"
          className="w-96 px-3 py-3 placeholder-gray-400 text-gray-600 flex bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
          required
        />
      </div>
      <div className="justify-center flex mb-3 pt-0">
        <button
          className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="submit"
        >
         Envoyer un message
        </button>
      </div>
    </form>
  );
};

export default ContactForm;