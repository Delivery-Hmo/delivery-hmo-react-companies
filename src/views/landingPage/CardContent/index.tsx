const CardContent = ({ title, description }: { title: string, description: string }) => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  }}>
    <div style={{
      textAlign: 'center',
      fontSize: '26px',
      fontWeight: 'bold',
      padding: '5px',
      color: '#304878'
    }}>
      {title}
    </div>
    <div style={{
      textAlign: 'center',
      fontSize: '18px',
      padding: '5px'
    }}>
      {description}
    </div>
  </div>
)

export default CardContent;
