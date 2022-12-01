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

  const { CIRCLE, MARKER } = window.google.maps.drawing?.OverlayType;

  const onCircleComplete = (_circle: google.maps.Circle) => {
    const dms = options?.drawingControlOptions?.drawingModes;

    setCircle(_circle);
    setDraginModeS(dms?.some(dm => dm === MARKER) ? MARKER : undefined);
    setOptions({
      ...options,
      drawingControlOptions: {
        ...options?.drawingControlOptions,
        drawingModes: dms?.filter(dm => dm !== CIRCLE),
      },
    });
  }

  const onMarkerComplete = (_marker: google.maps.Marker) => {
    setMarker(_marker);
  }

  const clearCircle = () => {
    if (!circle) return;

    circle.setMap(null);

    setCircle(undefined);
    setOptions({
      drawingControl: true,
      drawingControlOptions: {
        ...options?.drawingControlOptions,
        drawingModes: [MARKER, CIRCLE],
      },
    })
  }

  const { latLang, radius } = branch;

  return (
    <Card>
      <Row 
        justify="space-between" 
        style={{ marginBottom: 8 }}
      >
        <Col>
          <h3>Ubicación y radio de entrega</h3>
        </Col>
        <Col>
          <Row gutter={10}>
            <Col>
              <Button 
                type="primary" 
                icon={<ReloadOutlined />} 
                onClick={clearCircle}
                children="Ubicación"
              />
            </Col>
            <Col>
              <Button 
                type="primary" 
                icon={<ReloadOutlined />} 
                onClick={clearCircle}
                children="Radio"
              />
            </Col>
          </Row>
        </Col>
     
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