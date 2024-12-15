import React from "react";

const unused = () => {
  return (
    <>
      {/* <div className="mb-3">
                <label
                  htmlFor="destination_image"
                  className="font-medium block mb-2"
                >
                  Select Image
                </label>
                <input
                  type="file"
                  id="destination_image"
                  name="destination_image"
                  className="text-lg border-2 border-teal-600 py-2 px-3 w-full rounded-lg cursor-pointer hover:border-teal-800 transition duration-200"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {error && (
                  <div className="text-red-500 text-sm mt-1">{error}</div>
                )}
                {selectedImage && (
                  <div className="mt-2">
                    <img
                      src={selectedImage}
                      alt="Selected"
                      className="w-full h-auto rounded-lg border-2 border-teal-600"
                    />
                  </div>
                )}
              </div> */}

              destination manage
                {/* useEffect(() => {
                  const fetchImageAsFile = async (url, filename) => {
                    const response = await fetch(url);
                    const blob = await response.blob();
                    return new File([blob], filename, { type: blob.type });
                  };
              
                  const loadImagesAsFiles = async () => {
                    if (previousDestination) {
                      const {
                        destination_image,
                        destination_second_image,
                        destination_third_image,
                        accommodation_image,
                      } = previousDestination;
              
                      const previews = [];
              
                      // Create an array of image URLs and their corresponding filenames
                      const imageUrls = [
                        {
                          url: `http://localhost:3000/backend/${destination_image}`,
                          filename: destination_image,
                        },
                        {
                          url: `http://localhost:3000/backend/${destination_second_image}`,
                          filename: destination_second_image,
                        },
                        {
                          url: `http://localhost:3000/backend/${destination_third_image}`,
                          filename: destination_third_image,
                        },
                      ];
              
                      // Fetch each image and convert it to a File object
                      for (const { url, filename } of imageUrls) {
                        if (url) {
                          const file = await fetchImageAsFile(url, filename);
                          const objectUrl = URL.createObjectURL(file);
                          previews.push(objectUrl);
                          setImages((prev) => [...prev, file]); // Store the File objects
                        }
                      }
              
                      // Set the accommodation image if it exists
                      if (accommodation_image) {
                        const accommodationUrl = `http://localhost:3000/backend/${accommodation_image}`;
                        const accommodationFile = await fetchImageAsFile(
                          accommodationUrl,
                          accommodation_image
                        );
                        setAccommodationImage(accommodationFile);
                        setImagePreview(URL.createObjectURL(accommodationFile)); // Create a preview URL
                      }
              
                      // Set the preview images state
                      setPreviewImages(previews);
                      setSelectedImagesCount(previews.length);
                    }
                  };
              
                  loadImagesAsFiles();
              
                  // Cleanup function to revoke object URLs
                  return () => {
                    previewImages.forEach((url) => URL.revokeObjectURL(url));
                    if (accommodation_image) {
                      URL.revokeObjectURL(accommodation_image);
                    }
                  };
                }, [previousDestination]); */}
    </>
  );
};

export default unused;
