import { Link } from "react-router-dom";
const CourseCard = ({
  courseId,
  createdAt,
  description,
  imgUrl,
  price,
  title,
}) => {
  const dateString = createdAt;
  const dateObject = new Date(dateString).toDateString();
  return (
    <>
      <Link to={`/course/${courseId}`}>
        <div className="flex gap-4 md:items-start md:flex-col max-w-[350px]">
          <img
            src={imgUrl}
            alt=""
            className="max-w-[160px] md:max-w-full w-full"
          />
          <div className="flex-1">
            <p className="font-semibold md:text-lg">{title}</p>
            <p className="hidden md:block w-80 truncate text-">{description}</p>
            <p className="text-blue-500 font-bold text-md md:text-lg">&#8377; {price}</p>
            <p>{dateObject}</p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default CourseCard;
