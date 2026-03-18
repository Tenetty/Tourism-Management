import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import axios from "axios";
import { vehicleReservationColumns } from "../../components/datatable/datatablesource";
import { DataGrid } from "@mui/x-data-grid";

const MyVehicleReservations = () => {
  const { user } = useContext(AuthContext);
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchReservations = async () => {
      if (user && user._id) {
        setIsLoading(true);
        try {
          const res = await axios.get(`/vehiclereservation/traveler/${user._id}`);
          setReservations(res.data);
        } catch (err) {
          console.log(err.message);
        }
        setIsLoading(false);
      }
    };
    fetchReservations();
  }, [user]);

  const handleDelete = async (id) => {
    try {
      if(window.confirm("Are you sure you want to cancel this booking?")) {
        await axios.delete(`/vehiclereservation/${id}`);
        setReservations(reservations.filter((item) => item._id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="cellAction flex items-center gap-2 mt-2">
            <div
              onClick={() => handleDelete(params.row._id)}
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
    <>
      <div className="flex flex-row col-span-2 lg:px-32 px-8 pt-7 pb-2 justify-between md:items-center ">
        <div className="text-3xl font-bold">My Vehicle Bookings</div>
      </div>
      <div className="flex flex-col col-span-2 lg:px-32 px-8 pt-3 pb-8 gap-5 h-[600px]">
        <DataGrid
          className="datagrid"
          rows={reservations}
          columns={(vehicleReservationColumns || []).concat(actionColumn)}
          loading={isLoading}
          pageSize={9}
          rowsPerPageOptions={[9]}
          getRowId={(row) => row._id}
        />
      </div>
    </>
  );
};

export default MyVehicleReservations;
