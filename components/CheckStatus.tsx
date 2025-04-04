import React from "react";
import { Button } from "./ui/button";

function CheckStatus() {
  return (
    <section
      id="check-status"
      className="w-full px-4 py-10 flex justify-center items-center bg-transparent text-white"
    >
      <div className="bg-gray-800 p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-md border border-gray-700">
        <h2 className="text-2xl font-bold mb-6 text-center">Know Service Status</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="mobile" className="block mb-2 font-semibold">
              Mobile Number
            </label>
            <input
              type="text"
              id="mobile"
              placeholder="Enter your mobile number"
              className="w-full px-3 py-2 rounded bg-gray-900 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="rfid" className="block mb-2 font-semibold">
              RF Id
            </label>
            <input
              type="text"
              id="rfid"
              placeholder="Enter your RF Id"
              className="w-full px-3 py-2 rounded bg-gray-900 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
  );
}

export default CheckStatus;
