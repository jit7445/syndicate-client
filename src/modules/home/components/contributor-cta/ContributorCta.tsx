import Button from "../../../../components/button/Button";
import { TranscriptWaveform } from "./TranscriptWaveform";

const CONTRIBUTOR_SIGNUP_URL = "https://webapp.infollion.com/register-user";

export default function ContributorCta() {
  return (
    <div className="flex items-stretch gap-8 overflow-hidden rounded-2xl border-2 border-gray-100 bg-main-background py-10 pl-10 shadow-sm">
      <div className="flex-1">
        <h2 className="text-3xl font-bold text-text-primary sm:text-4xl">
          Know something clients are already searching for?
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-text-secondary leading-relaxed">
          Record a session or share a document on your area of expertise. Once
          reviewed, it's made available to clients, and you earn every time
          it's accessed.
        </p>
        <a
          href={CONTRIBUTOR_SIGNUP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block"
        >
          <Button
            variant="contained"
            label="Share your expertise"
            styles={{ fontWeight: 600, fontSize: "14px", height: "42px", padding: "0 28px" }}
          />
        </a>
      </div>
      <div className="relative hidden max-w-md flex-1 md:block -my-10">
        <TranscriptWaveform />
      </div>
    </div>
  );
}
