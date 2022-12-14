import "./StarRating.css";

export default function StarRating({ rating }) {
  const starArray = new Array(5);
  starArray.fill(false);
  for (let i = 0; i < rating - 1; i++) {
    starArray[i] = true;
  }
  //crete boolean array for each star value

  const randomNumberRatings = () => {
    return Math.floor(Math.random() * 1000);
  };

  return (
    <div className="rating">
      {starArray.map((star, index) => {
        if (star) {
          return <i className="fa-solid fa-star orangeStar" key={index}></i>;
        } else {
          return <i className="fa-solid fa-star whiteStar" key={index}></i>;
        }
      })}
      <span>{rating}</span>
      <div>{randomNumberRatings()} reviews</div>
    </div>
  );
}
