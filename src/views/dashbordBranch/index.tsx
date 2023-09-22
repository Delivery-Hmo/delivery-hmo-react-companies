import HeaderView from '../../components/headerView';
import { BarChart } from '../../components/grafics/barChart';
const { faker } = require('@faker-js/faker');

const containerStyle = {
  width: '85%', // Ancho deseado
  height: '70%', // Alto deseado
  marginLeft: "6%"
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Control de Ventas',
    },
    zoom: {
      zoom: {
        enabled: true, // Habilitar el zoom
        mode: 'xy', // Habilitar el zoom en ambos ejes (x e y)
      },
    },
  },
};

const labels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

const data = {
  labels,
  datasets: [
    {
      label: 'Semana Actual',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Mes Actual',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
    {
      label: 'Año Actual',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: 'rgba(73, 167, 335, 0.5)',
    },
  ],
};

const DashborachBranch = () => {
  return (
    <div style={{ margin: 20 }}>
      <HeaderView
        title="Estadisticas"
      />

      <div style={containerStyle}>
        <BarChart options={options} data={data} />
      </div>

    </div>
  )
}

export default DashborachBranch;