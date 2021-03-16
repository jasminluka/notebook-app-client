const Info = ({ markerInfo }) => {
  return (
    <div className="info">
      <h2 className="info-title">{markerInfo.title}</h2>
      <p className="info-body">
        {
          markerInfo.body.length > 200 ? `${markerInfo.body.substring(0, 200)} ...` : markerInfo.body
        }
      </p>
      <span className="info-date">
        {markerInfo.location.formattedAddress}
      </span>
    </div>
  )
}

export default Info