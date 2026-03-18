import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/authContext";
import { DataGrid } from "@mui/x-data-grid";
import {
  hotelColumns,
  vehicleReservationColumns,
  tourReservationColumns,
} from "../components/datatable/datatablesource";

const AllReservations = () => {
  const { user } = useContext(AuthContext);

  const [hotelReservations, setHotelReservations] = useState([]);
  const [vehicleReservations, setVehicleReservations] = useState([]);
  const [activityReservations, setActivityReservations] = useState([]);
  const [tourReservations, setTourReservations] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAllData = async () => {
      if (user && user._id) {
        setIsLoading(true);

        try {
          // 1. Fetch Hotel Bookings
          try {
            const hotelRes = await axios.get("/hotelreservation/user");
            setHotelReservations(hotelRes.data);
          } catch (e) { console.error("Hotel fetch error:", e.message); }

          // 2. Fetch Vehicle Bookings
          try {
            const vehicleRes = await axios.get(
              `/vehiclereservation/traveler/${user._id}`
            );
            setVehicleReservations(vehicleRes.data);
          } catch (e) { console.error("Vehicle fetch error:", e.message); }

          // 3. Fetch Activity Bookings
          try {
            const activityRes = await axios.get("/reservations");
            setActivityReservations(activityRes.data);
          } catch (e) { console.error("Activity fetch error:", e.message); }

          // 4. Fetch Tour Bookings
          try {
            const tourRes = await axios.get(
              `/tours/tourReservations/user/${user._id}`
            );
            setTourReservations(tourRes.data.data || []);
          } catch (e) { console.error("Tour fetch error:", e.message); }
        } catch (err) {
          console.error("Error fetching unified reservations:", err);
        }

        setIsLoading(false);
      }
    };
    fetchAllData();
  }, [user]);

  const handleDeleteHotel = async (id) => {
    if (window.confirm("Are you sure you want to cancel this hotel booking?")) {
      try {
        await axios.delete(`/hotelreservation/${id}`);
        setHotelReservations(
          hotelReservations.filter((item) => item._id !== id)
        );
      } catch (err) {
        console.error(err);
      }
    }
  };

  // Action columns for generic deletions
  const handleDeleteVehicle = async (id) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      try {
        await axios.delete(`/vehiclereservation/${id}`);
        setVehicleReservations(
          vehicleReservations.filter((item) => item._id !== id)
        );
      } catch (err) {
        console.error(err);
      }
    }
  };

  const cancelActivityReservation = async (id) => {
    if (window.confirm("Are you sure you want to cancel this activity?")) {
      try {
        await axios.delete(`/reservations/${id}`);
        setActivityReservations(
          activityReservations.filter((res) => res._id !== id)
        );
      } catch (err) {
        console.error(err);
      }
    }
  };

  const vehicleActionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="cellAction flex items-center gap-2 mt-2">
            <div
              onClick={() => handleDeleteVehicle(params.row._id)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded cursor-pointer"
            >
              Cancel
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="p-8 pb-32">
      <div className="text-3xl font-bold mb-8">My Unified Dashboard</div>

      {/* Hotels */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-blue-600">
          My Hotel Bookings
        </h2>
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-3">Hotel Name</th>
                <th className="px-6 py-3">Check-in Date</th>
                <th className="px-6 py-3">Check-out Date</th>
                <th className="px-6 py-3">Total Days</th>
                <th className="px-6 py-3">Total Price</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {hotelReservations.length > 0 ? (
                hotelReservations.map((item) => (
                  <tr
                    className="bg-white border-b hover:bg-gray-50"
                    key={item._id}
                  >
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
                    <td className="px-6 py-4 text-green-600 font-bold">
                      Rs. {item.totalPrice}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDeleteHotel(item._id)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded"
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center">
                    No hotel bookings found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Vehicles */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-blue-600">
          My Vehicle Bookings
        </h2>
        <div className="h-[400px]">
          <DataGrid
            className="datagrid"
            rows={vehicleReservations}
            columns={(vehicleReservationColumns || []).concat(
              vehicleActionColumn
            )}
            loading={isLoading}
            pageSize={5}
            rowsPerPageOptions={[5]}
            getRowId={(row) => row._id}
          />
        </div>
      </section>

      {/* Tours */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-blue-600">
          My Tour Bookings
        </h2>
        <div className="h-[400px]">
          <DataGrid
            className="datagrid"
            rows={tourReservations}
            columns={tourReservationColumns || []}
            loading={isLoading}
            pageSize={5}
            rowsPerPageOptions={[5]}
            getRowId={(row) => row._id}
          />
        </div>
      </section>

      {/* Activities */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-blue-600">
          My Activity Bookings
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activityReservations.length > 0 ? (
            activityReservations.map((reservation) => (
              <div
                key={reservation._id}
                className="bg-white rounded-lg shadow-md p-4 border"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-bold">
                    ID: {reservation._id.slice(-6).toUpperCase()}
                  </h3>
                </div>
                <p className="text-gray-600">
                  Activity: {reservation.activity?.name}
                </p>
                <p className="text-gray-600">
                  Type: {reservation.activity?.type}
                </p>
                <p className="text-gray-600">Status: {reservation.status}</p>
                <p className="text-gray-600">
                  Date:{" "}
                  {new Date(
                    reservation.dateRange.startDate
                  ).toLocaleDateString()}{" "}
                  -{" "}
                  {new Date(
                    reservation.dateRange.endDate
                  ).toLocaleDateString()}
                </p>
                <button
                  onClick={() => cancelActivityReservation(reservation._id)}
                  className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No activity bookings found.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default AllReservations;
