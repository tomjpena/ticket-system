import { FaArrowAltCircleLeft } from "react-icons/fa"
import { Link } from "react-router-dom"
import { Button } from "@mui/material"

const BackButton = ({url}) => {
  return (
    <Button component={Link} to={url} className="btn">
      <FaArrowAltCircleLeft className="mr-1"/> Back
    </Button>
  )
}
export default BackButton