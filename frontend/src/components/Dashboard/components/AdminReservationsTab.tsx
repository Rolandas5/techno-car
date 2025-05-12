export const AdminReservationsTab = () => {
  return (
    <div className="admin-tab">
      <h2>All Reservations</h2>

      <table className="reservation-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Car</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Total Price</th>
            <th>Booking Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>tomas@gmail.com</td>
            <td>BMW X5</td>
            <td>2023-10-01</td>
            <td>2023-10-05</td>
            <td>500€</td>
            <td>2023-09-15</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
