import { useState, FC, Dispatch, SetStateAction, memo, useEffect } from "react";
import { GoogleMap, DrawingManagerF, useJsApiLoader } from '@react-google-maps/api';
import { googleMapsApiKey } from "../../../../constants";
import FullLoader from "../../../../components/fullLoader";
import { LatLng } from "../../../../interfaces";
import { Card, message } from "antd";
import { BranchOffice } from "../../../../interfaces/user";
import HeaderMap from "./headerMap";
import { LibrariesGoogleMaps } from "../../../../types";
import { confirmDialog } from "../../../../utils/functions";

interface Props {
  branch: BranchOffice;
  setBranch: Dispatch<SetStateAction<BranchOffice>>;
}

const libraries: LibrariesGoogleMaps = ["drawing"];

//Este componente es buena idea probarlo sin el react stric mode del index principal para no tener problemas con los renders de los componentes
const Map: FC<Props> = ({ branch, setBranch }) => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey,
    libraries
  });
  const [center, setCenter] = useState<LatLng>({
    lat: 29.0965000,
    lng: -110.960000
  });
  const [circle, setCircle] = useState<google.maps.Circle>();
  const [marker, setMarker] = useState<google.maps.Marker>();
  const [options, setOptions] = useState<google.maps.drawing.DrawingManagerOptions>();
  const [isLoadedDM, setIsLoadedDM] = useState(false);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  useEffect(() => {
    if (!isLoaded || !isLoadedDM || !map) return;

    const { MARKER, CIRCLE } = window.google.maps.drawing?.OverlayType;

    setOptions({
      drawingControl: !Boolean(branch.id),
      drawingControlOptions: {
        drawingModes: [MARKER, CIRCLE],
        position: google.maps.ControlPosition.TOP_CENTER,
      }
    });

    if (!branch.id) return;

    const _circle = new google.maps.Circle({
      center: branch.center,
      radius: branch.radius
    });

    const _marker = new google.maps.Marker({
      position: branch.latLng
    });

    _circle.setMap(map);
    _marker.setMap(map);

    setCenter(branch.latLng);
    setCircle(_circle);
    setMarker(_marker);
  }, [isLoadedDM, isLoadedDM, branch.id, map]);

  if (!isLoaded) return <FullLoader />;

  if (loadError) return <div style={{ textAlign: "center" }}>
    Error al cargar el mapa, recarga la pagina!
  </div>;

  const onCircleComplete = (_circle: google.maps.Circle) => {
    circle?.setMap(null);

    if (_circle.getRadius() <= 1000) {
      _circle?.setMap(null);
      message.error("El radio de entrega es muy limitado.", 5);
      setCircle(undefined);
      return;
    }

    if (_circle.getRadius() >= 3800) {
      _circle?.setMap(null);
      message.error("Se esta exediendo el radio de entrega, contacta a soporte para más información.", 5);
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

  const showModalConfirmClear = async () => {
    if (branch.validatedImages) {
      await confirmDialog("¿Seguro que quieres cambiar de ubicación? Deberás volver a verificar las fotos de la sucursal.", async () => clearUbication());
      return;
    }

    clearUbication();
  }

  const clearUbication = () => {
    const { MARKER } = window.google.maps.drawing?.OverlayType;

    marker?.setMap(null);

    setBranch(b => ({
      ...b,
      latLng: { lat: 0, lng: 0 },
    }));
    setMarker(undefined);
    setOptions(opts => ({
      drawingControl: true,
      drawingControlOptions: {
        drawingModes: [MARKER, ...opts?.drawingControlOptions?.drawingModes?.filter(d => d !== MARKER) || []],
        position: google.maps.ControlPosition.TOP_CENTER,
      },
    }));
  }

  const clearRadius = () => {
    const { CIRCLE } = window.google.maps.drawing?.OverlayType;

    circle?.setMap(null);

    setBranch(b => ({
      ...b,
      center: { lat: 0, lng: 0 },
      radius: 0
    }));
    setCircle(undefined);
    setOptions(opts => ({
      drawingControl: true,
      drawingControlOptions: {
        drawingModes: [...opts?.drawingControlOptions?.drawingModes?.filter(d => d !== CIRCLE) || [], CIRCLE],
        position: google.maps.ControlPosition.TOP_CENTER,
      },
    }));
  }

  return (
    <Card>
      <HeaderMap clearUbication={showModalConfirmClear} clearRadius={clearRadius} />
      <GoogleMap
        zoom={11}
        mapContainerStyle={{
          width: '100%',
          height: '400px'
        }}
        center={center}
        onLoad={_map => setMap(_map)}
      >
        {
          <DrawingManagerF
            onCircleComplete={onCircleComplete}
            onMarkerComplete={onMarkerComplete}
            options={options}
            onLoad={() => setIsLoadedDM(true)}
          />
        }
      </GoogleMap>
    </Card>
  )
}

export default memo(Map);