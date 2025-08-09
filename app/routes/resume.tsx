import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import ATS from "~/components/ATS";
import Details from "~/components/details";
import Summary from "~/components/summary";
import { usePuterStore } from "~/lib/puter";

export const meta = () => {
  [
    { title: "Analize-Resume | Review" },
    { name: "description", content: "Detailed overview of your resume" },
  ];
};

export default function Resume() {
  const { auth, isLoading, fs, kv } = usePuterStore();
  const { id } = useParams();
  const [imageUrl, setImageUrl] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated) {
      navigate(`/auth?next=/resume/${id}`);
    }
  }, [isLoading]);

  useEffect(() => {
    const loadResume = async () => {
      const resume = await kv.get(`resume:${id}`);

      if (!resume) return;

      const data = JSON.parse(resume);

      const resumeBlob = await fs.read(data.resumePath);
      if (!resumeBlob) return;

      const pdfBlob = new Blob([resumeBlob], { type: "application/pdf" });

      const resumeUrl = URL.createObjectURL(pdfBlob);
      setResumeUrl(resumeUrl);

      const imageBlob = await fs.read(data.imagePath);
      if (!imageBlob) return;
      const imageUrl = URL.createObjectURL(imageBlob);
      setImageUrl(imageUrl);

      setFeedback(data.feedback);
      console.log(resumeUrl, imageUrl, data.feedback);
    };
    loadResume();
  }, [id]);

  return (
    <main className="!pt-0">
      <nav className="resume-nav">
        <Link
          to="/"
          className="flex w-fit items-center gap-2 text-sm font-semibold text-gray-800 hover:underline"
        >
          <img src="/icons/back.svg" alt="logo" className="h-4 w-4" />
          Back to Homepage
        </Link>
      </nav>

      <div className="flex w-full flex-row max-lg:flex-col-reverse">
        <section className="feedback-section bg-[url('/images/bg-small.svg')]">
          {imageUrl && resumeUrl && (
            <div className="animate-in fade-in gradient-border w-full max-w-4xl overflow-hidden rounded-2xl shadow-lg duration-1000">
              <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                <img
                  src={imageUrl}
                  className="h-auto w-full object-contain"
                  title="resume"
                />
              </a>
            </div>
          )}
        </section>
        <section className="feedback-section">
          <h2 className="text-4xl font-bold !text-black">
            {feedback ? (
              <div className="animate-in fade-in flex flex-col gap-8 duration-1000">
                <Summary feedback={feedback} />
                <ATS
                  score={feedback.ATS.score || 0}
                  suggestions={feedback.ATS.tips || []}
                />
                <Details feedback={feedback} />
              </div>
            ) : (
              <img src="/images/resume-scan-2.gif" className="w-full" />
            )}
          </h2>
        </section>
      </div>
    </main>
  );
}
