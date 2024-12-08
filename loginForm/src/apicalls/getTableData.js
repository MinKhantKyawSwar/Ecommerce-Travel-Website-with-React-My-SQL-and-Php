import axios from "axios";

  export const getRegionInfo = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/backend/getBooking.php",
        {
          headers: {
            "Region": "",
          },
        }
      );

      if (response.data.status === 0) {
        console.log(response.data);
      } else if (response.data.status === 1) {
        return response.data.data;
      }
    } catch (error) {
        return error.message;
    }
  };