import React, { useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import "../css/home.css";
import { CONFIG } from "../config";

function Map() {
  const [position, setPosition] = useState<any>({
    lat: 21.00108265867056,
    lng: 105.81584890670473,
  });
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: CONFIG.googleMapsApiKey
  });

  const onCLickMap = (event: any) => {
    const data = event.latLng.toJSON();
    setPosition(data);
  };
  console.log("----------", position)
 
  return (
    <div className="maps">
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={position}
          zoom={15}
          onClick={onCLickMap}
        >
          <Marker
            position={position}
            options={{
              label: {
                text: "Royal",
                className: "map-marker",
              },
            }}
          />
        </GoogleMap>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Map;
