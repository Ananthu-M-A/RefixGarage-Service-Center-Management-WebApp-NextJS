import React from "react";

function Contact() {
  return (
    <section
      id="contact"
      className="w-full px-4 py-12 bg-transparent text-white flex justify-center items-center"
    >
      <div className="max-w-3xl text-center">
        <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
        <p className="text-base md:text-lg text-gray-300 leading-relaxed">
          Have questions or need assistance? Reach out to us at{" "}
          <a
            href="mailto:refixgarage@gmail.com"
            className="text-blue-400 hover:underline"
          >
            refixgarage@gmail.com
          </a>{" "}
          or visit our service center.
        </p>
      </div>
    </section>
  );
}

export default Contact;
