import React, { useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import "../css/home.css";
import { CONFIG } from "../config";

function MapHost(props: any ) {
  const [position, setPosition] = useState<any>({
    lat: 21.077923,
    lng: 105.80889,
  });
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: CONFIG.googleMapsApiKey,
  });

  const onCLickMap = (event: any) => {
    const data = event.latLng.toJSON();
    setPosition(data);
    props.handeChangePosition(data);
  };
  return (
    <div className="maps">
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={position}
          zoom={12}
          onClick={onCLickMap}
        >
          <Marker position={position} />
        </GoogleMap>
      ) : (
        <></>
      )}
    </div>
  );
}

export default MapHost;
