import { Dispatch, FC, SetStateAction } from "react";
import { Button, Col, Row } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import { BranchOffice } from "../../../../../interfaces/user";
import { confirmDialog } from "../../../../../utils/functions";

interface Props {
  branch: BranchOffice;
  marker?: google.maps.Marker;
  circle?: google.maps.Circle;
  setBranch: Dispatch<SetStateAction<BranchOffice>>;
  setMarker: Dispatch<SetStateAction<google.maps.Marker | undefined>>;
  setOptions: Dispatch<SetStateAction<google.maps.drawing.DrawingManagerOptions | undefined>>;
  setCircle: Dispatch<SetStateAction<google.maps.Circle | undefined>>;
}

const HeaderMap: FC<Props> = ({ branch, marker, circle, setBranch, setMarker, setCircle, setOptions }) => {
  const clearUbication = () => {
    const { MARKER } = window.google.maps.drawing?.OverlayType;

    marker?.setMap(null);

    setBranch(b => ({
      ...b,
      latLng: { lat: 0, lng: 0 },
      validatedImages: false
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

  const showModalConfirmClear = async () => {
    if (branch.validatedImages) {
      await confirmDialog("¿Seguro que quieres cambiar de ubicación? Deberás volver a verificar las fotos de la sucursal.", async () => clearUbication());
      return;
    }

    clearUbication();
  }

  return (
    <>
      <Row justify="start" gutter={10}>
        <Col>
          <b>Ubicación y radio de entrega</b>
        </Col>
        <Col>
          <Button
            icon={<ReloadOutlined />}
            onClick={showModalConfirmClear}
            children="Cambiar ubicación"
          />
        </Col>
        <Col>
          <Button
            icon={<ReloadOutlined />}
            onClick={clearRadius}
            children="Cambiar radio"
          />
        </Col>
      </Row>
      <br />
    </>
  )
}

export default HeaderMap;