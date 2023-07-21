import { BloodDrop } from "./blood-drop";

type LoadingSpinnerProps = {};

export function LoadingSpinner({}: LoadingSpinnerProps) {
  return (
    <div className="flex justify-center items-center gap-3">
      <BloodDrop />
      <BloodDrop style={{ animationDelay: "333ms" }} />
      <BloodDrop style={{ animationDelay: "666ms" }} />
    </div>
  );
}
