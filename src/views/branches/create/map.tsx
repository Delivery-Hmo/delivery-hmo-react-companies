import { useState, useEffect, FC } from "react";
import { BranchOffice } from "../../../interfaces/branchOffice";
import { GoogleMap, DrawingManagerF, useJsApiLoader, CircleF } from '@react-google-maps/api';
import { googleMapsApiKey } from "../../../constants";
import { LibrariesGoogleMaps } from "../../../types";
import FullLoader from "../../../components/fullLoader";
import { LatLng } from "../../../interfaces";
import { Card } from "antd";

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
  height: '300px'
};
const libraries: LibrariesGoogleMaps = ["drawing"];

const Map: FC<Props> = ({ branch }) => {
  const [center, setCenter] = useState<LatLng>(initCenter);
  const [zoom, setZoom] = useState<number>(initZoom);
  const [polygon, setPolygon] = useState<google.maps.Circle>();
  const [showCircle, setShowCircle] = useState<boolean>(false);
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey,
    libraries
  });
  const [options, setOptions] = useState<google.maps.drawing.DrawingManagerOptions>();

  useEffect(() => {
    if (!isLoaded) return;

    const drawingMode = window.google.maps.drawing?.OverlayType.CIRCLE;

    setOptions({
      drawingControl: true,
      drawingControlOptions: {
        drawingModes: [drawingMode],
      },
    })
  }, [isLoaded])

  if (!isLoaded) return (
    <div>
      <FullLoader />
    </div>
  )

  const drawingMode = window.google.maps.drawing?.OverlayType.CIRCLE;

  const onPolygonComplete = (polygon: google.maps.Circle) => {
    setPolygon(polygon);
  }

  const clearPolygon = () => {
    if (!polygon) return;

    polygon.setMap(null);

    setPolygon(undefined);
    setOptions({
      drawingControl: true,
      drawingMode: null,
      drawingControlOptions: {
        drawingModes: [drawingMode],
      },
    });
    setShowCircle(false);
  }

  const { latLang, radius } = branch;

  return (
    <Card>
      <h3>Ubicación y radio de entrega</h3>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
      >
        <DrawingManagerF
          drawingMode={drawingMode}
          onCircleComplete={onPolygonComplete}
          options={options}
        />
        {
          showCircle ? <CircleF
            onLoad={setPolygon}
            center={latLang}
            radius={radius}
          />
            : null
        }
      </GoogleMap>
    </Card>
  )
}

export default Map;
