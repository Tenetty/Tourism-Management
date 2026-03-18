import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/authContext";
import Swal from "sweetalert2";

const HotelManagerBookings = () => {
  const { user } = useContext(AuthContext);
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchOwnerReservations = async () => {
      try {
        const res = await axios.get("/hotelreservation/mine");
        setReservations(res.data);
      } catch (err) {
        console.log("Error fetching hotel owner reservations", err);
      }
    };
    if (user && user.role === "Hotel Manager") {
        fetchOwnerReservations();
    }
  }, [user]);

  const handleCancel = async (id) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      try {
        await axios.delete(`/hotelreservation/${id}`);
        setReservations(reservations.filter((item) => item._id !== id));
        Swal.fire({
          icon: 'success',
          title: 'Reservation cancelled',
          showConfirmButton: false,
          timer: 1500
        });
      } catch (err) {
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'Failed to cancel',
          text: 'Something went wrong!'
        });
      }
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div className="text-3xl font-bold">Reservations for My Hotels</div>
      </div>
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">Hotel Name</th>
              <th scope="col" className="px-6 py-3">Guest Name</th>
              <th scope="col" className="px-6 py-3">Check-in Date</th>
              <th scope="col" className="px-6 py-3">Check-out Date</th>
              <th scope="col" className="px-6 py-3">Total Days</th>
              <th scope="col" className="px-6 py-3">Total Price</th>
              <th scope="col" className="px-6 py-3">Action</th>
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
                    {item.userName || "N/A"}
                  </td>
                  <td className="px-6 py-4">
                    {new Date(item.checkInDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    {new Date(item.checkOutDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">{item.totalDays}</td>
                  <td className="px-6 py-4 text-green-600 font-bold">Rs. {item.totalPrice}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleCancel(item._id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center">
                  No hotel bookings found for your hotels.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HotelManagerBookings;
