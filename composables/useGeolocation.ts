interface GeoCoordinates {
    latitude: number;
    longitude: number;
  }
  
  export default function useGeolocation() {
    const getLocation = (): Promise<GeoCoordinates> => {
      return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => resolve(position.coords as GeoCoordinates),
            (error) => reject(error)
          );
        } else {
          reject(new Error("Geolocation is not supported by this browser."));
        }
      });
    };
  
    return { getLocation };
  }