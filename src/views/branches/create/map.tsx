import { useState, useEffect, FC } from "react";
import { BranchOffice } from "../../../interfaces/branchOffice";
import { GoogleMap, DrawingManagerF, useJsApiLoader, CircleF } from '@react-google-maps/api';
import { googleMapsApiKey } from "../../../constants";
import { LibrariesGoogleMaps } from "../../../types";
import FullLoader from "../../../components/fullLoader";
import { LatLng } from "../../../interfaces";
import { Button, Card, Col, Row } from "antd";
import { ReloadOutlined } from "@ant-design/icons";

interface Props {
  branch: BranchOffice;
}

const initCenter: LatLng = {
  lat: 29.0965000,
  lng: -110.960000
};
const initZoom = 10;
const containerStyle = {
  width: '100%',
  height: '400px'
};
const libraries: LibrariesGoogleMaps = ["drawing"];

const Map: FC<Props> = ({ branch }) => {
  const [center, setCenter] = useState<LatLng>(initCenter);
  const [zoom, setZoom] = useState<number>(initZoom);
  const [circle, setCircle] = useState<google.maps.Circle>();
  const [marker, setMarker] = useState<google.maps.Marker>();
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey,
    libraries
  });
  const [options, setOptions] = useState<google.maps.drawing.DrawingManagerOptions>();
  const [drawingModeS, setDraginModeS] = useState<google.maps.drawing.OverlayType>();

  useEffect(() => {
    if (!isLoaded) return;

    const { CIRCLE, MARKER } = window.google.maps.drawing?.OverlayType;

    setOptions({
      drawingControl: true,
      drawingControlOptions: {
        drawingModes: [MARKER, CIRCLE],
        position: google.maps.ControlPosition.TOP_CENTER
      },
    })
  }, [isLoaded])

  if (!isLoaded) return (
    <div>
      <FullLoader />
    </div>
  )

  //const { CIRCLE, MARKER } = window.google.maps.drawing?.OverlayType;

  const onCircleComplete = (_circle: google.maps.Circle) => {
    circle?.setMap(null);
    setCircle(_circle);
  }

  const onMarkerComplete = (_marker: google.maps.Marker) => {
    marker?.setMap(null)
    setMarker(_marker);
  }

  const { latLang, radius } = branch;

  return (
    <Card>
      <Row 
        style={{ marginBottom: 8 }}
      >
        <h3>Ubicación y radio de entrega</h3>
      </Row>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
      >
        <DrawingManagerF
          onCircleComplete={onCircleComplete}
          onMarkerComplete={onMarkerComplete}
          options={options}
          drawingMode={drawingModeS}
        />
        {
          <CircleF
            center={latLang}
            radius={radius}
          />
        }
      </GoogleMap>
    </Card>
  )
}

export default Map;