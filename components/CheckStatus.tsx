import React from "react";
import { Button } from "./ui/button";

function CheckStatus() {
  return (
    <>
      <section
        id="check-status"
        className="min-w-screen bg-transparent text-white p-10 flex items-center justify-center"
      >
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96 border border-gray-700">
          <h2 className="text-2xl font-bold mb-6 text-center text-white">
            Know Service Status
          </h2>
          <form>
            <div className="mb-4">
              <label
                className="block text-white mb-2 font-semibold"
                htmlFor="mobile"
              >
                Mobile Number
              </label>
              <input
                type="text"
                id="mobile"
                placeholder="Enter your mobile number"
                className="border border-gray-600 rounded w-full py-2 px-3 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 caret"
                required
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-white mb-2 font-semibold"
                htmlFor="rfid"
              >
                RF Id
              </label>
              <input
                type="text"
                id="rfid"
                placeholder="Enter your RF Id"
                className="border border-gray-600 rounded w-full py-2 px-3 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <Button
              type="submit"
              className="w-full py-2 text-lg font-semibold bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Know Service Status
            </Button>
          </form>
        </div>
      </section>
    </>
  );
}

export default CheckStatus;
