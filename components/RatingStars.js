import { Entypo } from "@expo/vector-icons";

const RatingStars = ({ rating }) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < rating) {
      stars.push(<Entypo key={i} name="star" size={24} color="#FFB100" />);
    } else {
      stars.push(<Entypo key={i} name="star" size={24} color="#BCBCBC" />);
    }
  }
  return stars;
};

export default RatingStars;
