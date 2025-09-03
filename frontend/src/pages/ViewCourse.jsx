import { useParams, useNavigate } from "react-router-dom";
import { useCourses } from "../context/CourseContext";

const ViewCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { courses, enrollCourse, unenrollCourse } = useCourses();

  const course = courses.find((c) => c.id === parseInt(id));

  if (!course) {
    return <p className="text-red-500 text-center mt-10">Course not found!</p>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
      <p><strong>Code:</strong> {course.code}</p>
      <p><strong>Instructor:</strong> {course.instructor}</p>

      <p><strong>Description:</strong> {course.description}</p>

      <h2 className="text-xl font-semibold mt-4 mb-2">Syllabus</h2>
<ul className="list-disc pl-6">
  {course.syllabus.map((topic, index) => (
    <li key={index}>{topic}</li>
  ))}
</ul>
<h2 className="text-xl font-semibold mt-4 mb-2">Resources</h2>
<ul className="list-disc pl-6">
  {course.resources.map((res, index) => (
    <li key={index}>
      <a
        href={res.link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-indigo-600 hover:underline"
      >
        {res.name}
      </a>
    </li>
  ))}
</ul>
      <p><strong>Duration:</strong> {course.duration}</p>
      <p>
        <strong>Status:</strong>{" "}
        {course.status === "Completed" ? (
          <span className="text-green-600">✔ Completed</span>
        ) : (
          <span className="text-blue-600">Ongoing</span>
        )}
      </p>

      {course.status === "Ongoing" && (
        <div className="w-full bg-gray-200 h-2 rounded mt-2">
          <div className="bg-blue-500 h-2 rounded w-1/2"></div>
        </div>
      )}

      <div className="flex gap-3 mt-6">
        {!course.enrolled ? (
          <button
            onClick={() => enrollCourse(course.id)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg"
          >
            Enroll
          </button>
        ) : (
          <button
            onClick={() => unenrollCourse(course.id)}
            className="px-4 py-2 bg-red-600 text-white rounded-lg"
          >
            Unenroll
          </button>
        )}

        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default ViewCourse;
