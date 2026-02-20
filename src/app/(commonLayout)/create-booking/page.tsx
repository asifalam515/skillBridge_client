const CreateBookingPage = ({ params }: { params: { slotId: string } }) => {
  // Optionally pre-fetch slot details to avoid client-side loading
  // const slot = await fetchSlotDetails(params.slotId);
  return (
    <div>
      <h1>Create Booking</h1>
    </div>
  );
};

export default CreateBookingPage;
