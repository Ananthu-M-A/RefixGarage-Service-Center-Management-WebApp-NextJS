import React from "react";

function Contact() {
  return (
    <section
      id="contact"
      className="w-full px-4 py-8 min-h-screen bg-transparent text-white flex flex-col justify-center items-center"
    >
      <div className="max-w-3xl text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h2>
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
        <p className="mt-4 text-lg font-semibold">
          Address: 1st Floor, Bus Stand Building, Ramanattukara, Kozhikode,
          Kerala 673633
        </p>
      </div>
      <div className="w-full max-w-4xl flex flex-col items-center">
        <h3 className="text-2xl font-bold mb-4">Our Location</h3>
        <div className="w-full max-w-4xl aspect-w-16 aspect-h-9 relative">
          <iframe
            src={process.env.NEXT_PUBLIC_GOOGLE_MAPS_LINK as string}
            className="w-full h-full rounded-lg shadow-lg"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Refix Garage Location"
          ></iframe>
        </div>
      </div>
    </section>
  );
}

export default Contact;