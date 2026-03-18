import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const PendingHotels = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      const res = await axios.get("/hotels/all");
      setHotels(res.data);
    } catch (err) {
      console.error("Error fetching hotels:", err);
    }
    setLoading(false);
  };

  const handleApprove = async (id) => {
    try {
      await axios.put(`/hotels/approve/${id}`);
      setHotels(hotels.map(h => h._id === id ? { ...h, isApproved: true } : h));
      Swal.fire({ icon: "success", title: "Hotel Approved", showConfirmButton: false, timer: 1500 });
    } catch (err) {
      Swal.fire({ icon: "error", title: "Failed to approve", text: err.message });
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.put(`/hotels/reject/${id}`);
      setHotels(hotels.map(h => h._id === id ? { ...h, isApproved: false } : h));
      Swal.fire({ icon: "success", title: "Hotel Rejected", showConfirmButton: false, timer: 1500 });
    } catch (err) {
      Swal.fire({ icon: "error", title: "Failed to reject", text: err.message });
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete this hotel?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it",
    });
    if (result.isConfirmed) {
      try {
        await axios.delete(`/hotels/${id}`);
        setHotels(hotels.filter(h => h._id !== id));
        Swal.fire({ icon: "success", title: "Deleted", showConfirmButton: false, timer: 1500 });
      } catch (err) {
        Swal.fire({ icon: "error", title: "Failed to delete", text: err.message });
      }
    }
  };

  if (loading) return <div className="p-8 text-center text-lg">Loading hotels...</div>;

  const pending = hotels.filter(h => !h.isApproved);
  const approved = hotels.filter(h => h.isApproved);

  return (
    <div className="p-8 pb-32">
      <div className="text-3xl font-bold mb-8">Hotel Approval Management</div>

      {/* Pending Hotels */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-orange-500">
          Pending Approval ({pending.length})
        </h2>
        {pending.length === 0 ? (
          <p className="text-gray-500">No hotels pending approval.</p>
        ) : (
          <div className="overflow-x-auto shadow-md rounded-lg">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-orange-50">
                <tr>
                  <th className="px-6 py-3">Hotel Name</th>
                  <th className="px-6 py-3">Type</th>
                  <th className="px-6 py-3">City</th>
                  <th className="px-6 py-3">Contact</th>
                  <th className="px-6 py-3">Price From</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pending.map((hotel) => (
                  <tr className="bg-white border-b hover:bg-gray-50" key={hotel._id}>
                    <td className="px-6 py-4 font-medium text-gray-900">{hotel.name}</td>
                    <td className="px-6 py-4">{hotel.type}</td>
                    <td className="px-6 py-4">{hotel.city}</td>
                    <td className="px-6 py-4">{hotel.contactName} ({hotel.contactNo})</td>
                    <td className="px-6 py-4">Rs. {hotel.cheapestPrice}</td>
                    <td className="px-6 py-4 flex gap-2">
                      <button
                        onClick={() => handleApprove(hotel._id)}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-4 rounded"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleDelete(hotel._id)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Approved Hotels */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-green-600">
          Approved Hotels ({approved.length})
        </h2>
        {approved.length === 0 ? (
          <p className="text-gray-500">No approved hotels.</p>
        ) : (
          <div className="overflow-x-auto shadow-md rounded-lg">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-green-50">
                <tr>
                  <th className="px-6 py-3">Hotel Name</th>
                  <th className="px-6 py-3">Type</th>
                  <th className="px-6 py-3">City</th>
                  <th className="px-6 py-3">Contact</th>
                  <th className="px-6 py-3">Price From</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {approved.map((hotel) => (
                  <tr className="bg-white border-b hover:bg-gray-50" key={hotel._id}>
                    <td className="px-6 py-4 font-medium text-gray-900">{hotel.name}</td>
                    <td className="px-6 py-4">{hotel.type}</td>
                    <td className="px-6 py-4">{hotel.city}</td>
                    <td className="px-6 py-4">{hotel.contactName} ({hotel.contactNo})</td>
                    <td className="px-6 py-4">Rs. {hotel.cheapestPrice}</td>
                    <td className="px-6 py-4 flex gap-2">
                      <button
                        onClick={() => handleReject(hotel._id)}
                        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-4 rounded"
                      >
                        Revoke
                      </button>
                      <button
                        onClick={() => handleDelete(hotel._id)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

export default PendingHotels;
