import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/authContext";
import Swal from "sweetalert2";

const MyHotelReservations = () => {
  const { user } = useContext(AuthContext);
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const res = await axios.get("/hotelreservation/user");
        setReservations(res.data);
      } catch (err) {
        console.log("Error fetching hotel reservations", err);
      }
    };
    if (user) {
        fetchReservations();
    }
  }, [user]);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div className="text-3xl font-bold">My Hotel Bookings</div>
      </div>
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">Hotel Name</th>
              <th scope="col" className="px-6 py-3">Check-in Date</th>
              <th scope="col" className="px-6 py-3">Check-out Date</th>
              <th scope="col" className="px-6 py-3">Total Days</th>
              <th scope="col" className="px-6 py-3">Total Price</th>
            </tr>
          </thead>
          <tbody>
            {reservations.length > 0 ? (
              reservations.map((item) => (
                <tr className="bg-white border-b hover:bg-gray-50" key={item._id}>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {item.hotelName}
                  </td>
                  <td className="px-6 py-4">
                    {new Date(item.checkInDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    {new Date(item.checkOutDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">{item.totalDays}</td>
                  <td className="px-6 py-4 text-green-600 font-bold">Rs. {item.totalPrice}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center">
                  No hotel bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyHotelReservations;
