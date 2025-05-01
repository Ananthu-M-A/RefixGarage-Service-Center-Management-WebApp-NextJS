import React from "react";
// import { LatLngExpression } from "leaflet";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import "leaflet-defaulticon-compatibility";

function Contact() {
  // const position: LatLngExpression = [11.178128998741794, 75.8653670141468];

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
      <div className="w-full max-w-3xl h-96 rounded-lg overflow-hidden shadow-lg">
        {/* <MapContainer
          center={position}
          zoom={15}
          className="h-full w-full"
          scrollWheelZoom={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={position}>
            <Popup>
              <strong>Refix Garage</strong>
              <br />
              1st Floor, Bus Stand Building
              <br />
              Ramanattukara, Kozhikode, Kerala 673633
            </Popup>
          </Marker>
        </MapContainer> */}
      </div>
    </section>
  );
}

export default Contact;