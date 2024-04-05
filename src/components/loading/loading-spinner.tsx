import { AngryFace } from "./angry-face";

export function LoadingSpinner({
  className = "",
}: React.HtmlHTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <AngryFace className="w-24 h-24" />
    </div>
  );
}
