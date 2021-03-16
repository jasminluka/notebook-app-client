import { FaMapPin } from 'react-icons/fa'

const Marker = ({ lat, lng, onClick }) => {
  return (
    <div className="marker" onClick={onClick}>
      <div className="marker-icon">
        <FaMapPin />
      </div>
    </div>
  )
}

export default Marker