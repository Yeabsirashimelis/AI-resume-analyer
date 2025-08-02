import { Link } from "react-router";
import ScoreCircle from "./score-circle";

export default function ResumeCard({
  resume: { id, companyName, jobTitle, feedback, imagePath },
}: {
  resume: Resume;
}) {
  return (
    <Link
      to={`/resume/${id}`}
      className="resume-card animate-in fade-in duration-100"
    >
      <div className="resume-card-header">
        <div className="flex flex-col gap-2">
          <h2 className="font-bold break-words text-black">{companyName}</h2>
          <h3 className="text-lg break-words text-gray-500">{jobTitle}</h3>
        </div>
        <div className="flex-shrink-0">
          <ScoreCircle score={feedback.overallScore} />
        </div>
      </div>
      <div className="gradient-border animate-in fade-in duration-1000">
        <div className="h-full w-full">
          <img
            src={imagePath}
            alt="resume"
            className="h-full w-full object-cover "
          />
        </div>
      </div>
    </Link>
  );
}
