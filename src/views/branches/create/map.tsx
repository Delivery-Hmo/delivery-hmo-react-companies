import { useState, useEffect, FC, Dispatch, SetStateAction } from "react";
import { BranchOffice } from "../../../interfaces/branchOffice";
import { GoogleMap, DrawingManagerF, useJsApiLoader, CircleF } from '@react-google-maps/api';
import { googleMapsApiKey } from "../../../constants";
import { LibrariesGoogleMaps } from "../../../types";
import FullLoader from "../../../components/fullLoader";
import { LatLng } from "../../../interfaces";
import { Card, message, Row } from "antd";

interface Props {
  branch: BranchOffice;
  setBranch: Dispatch<SetStateAction<BranchOffice>>
}

const initCenter: LatLng = {
  lat: 29.0965000,
  lng: -110.960000
};
const initZoom = 11;
const containerStyle = {
  width: '100%',
  height: '400px'
};
const libraries: LibrariesGoogleMaps = ["drawing"];

const Map: FC<Props> = ({ branch, setBranch }) => {
  const [circle, setCircle] = useState<google.maps.Circle>();
  const [marker, setMarker] = useState<google.maps.Marker>();
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey,
    libraries
  });
  const [options, setOptions] = useState<google.maps.drawing.DrawingManagerOptions>();

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

  if (loadError) return (
    <div style={{ textAlign: "center" }}>
      Error al cargar el mapa, recarga la pagina!
    </div>
  )

  const onCircleComplete = (_circle: google.maps.Circle) => {
    circle?.setMap(null);

    if (_circle.getRadius() >= 4500) {
      _circle?.setMap(null);
      message.error("Se esta exediendo el radio de entrega, contacta a soporte para mas información.", 5);
      setCircle(undefined);
      return;
    }

    if (marker && !_circle?.getBounds()?.contains(marker.getPosition() as google.maps.LatLng)) {
      _circle?.setMap(null);
      message.error("El radio esta fuera de la ubicación de la sucursal.", 5);
      setCircle(undefined);
      return;
    }

    const center = _circle.getCenter() as google.maps.LatLng;

    setBranch(b => ({ ...b, radius: _circle.getRadius(), center: { lat: center.lat(), lng: center.lng() } }));
    setCircle(_circle);
  }

  const onMarkerComplete = (_marker: google.maps.Marker) => {
    marker?.setMap(null);

    const positionMarker = _marker.getPosition() as google.maps.LatLng;

    if (circle && !circle?.getBounds()?.contains(positionMarker)) {
      _marker.setMap(null);
      message.error("La ubicación de la sucursal esta fuera del radio.", 5);
      setMarker(undefined);
      return;
    }

    setBranch(b => ({ ...b, latLng: { lat: positionMarker.lat(), lng: positionMarker.lng() } }));
    setMarker(_marker);
  }

  const { latLng, radius } = branch;

  return (
    <Card>
      <Row style={{ marginBottom: 8 }}>
        <h3>Ubicación y radio de entrega</h3>
      </Row>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={initCenter}
        zoom={initZoom}
      >
        <DrawingManagerF
          onCircleComplete={onCircleComplete}
          onMarkerComplete={onMarkerComplete}
          options={options}
        />
        {
          <CircleF
            center={latLng}
            radius={radius}
          />
        }
      </GoogleMap>
    </Card>
  )
}

export default Map;