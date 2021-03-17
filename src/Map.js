import React from "react";
import {
  GoogleMap,
  Marker,
  LoadScript,
  InfoWindow,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "700px",
};

const center = {
  lat: 21.027763,
  lng: 105.83416,
};

function Map() {
  const [marker, setMarker] = React.useState(null);
  return (
    <LoadScript googleMapsApiKey="AIzaSyB6stZ3_YbkuNXaW-fgrp_RphN4FmJlego">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        <Marker
          position={{ lat: 21.027763, lng: 105.83416 }}
          onClick={() => {
            setMarker(center);
          }}
        ></Marker>

        {marker ? (
          <InfoWindow
            position={{
              lat: 21.027763,
              lng: 105.83416,
            }}
            onCloseClick={() => {
              setMarker(null);
            }}
          >
            <div>
              <h3>Some text</h3>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </LoadScript>
  );
}

export default React.memo(Map)