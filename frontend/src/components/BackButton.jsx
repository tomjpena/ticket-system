import { FaArrowAltCircleLeft } from "react-icons/fa"
import { Link } from "react-router-dom"

const BackButton = ({url}) => {
  return (
    <Link to={url} className="btn">
      <FaArrowAltCircleLeft className="mr-1"/> Back
    </Link>
  )
}
export default BackButton