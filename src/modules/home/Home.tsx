import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import SearchBar from "../../components/searchbar/SearchBar";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import FeatureCard from "./components/feature-card/FeatureCard";
import RequestTopicDialog from "../transcripts/components/request-topic-dialog";
import WarningDialog from "../../components/form-close-warning/WarningDialog";
import { useBoolean } from "../../utils/hooks/useBoolean";
import { APP_ROUTES } from "../../constants/appRoutes";
import { FEATURE_CARDS } from "./constants/homeConstants";
import styles from "./styles.home.module.css";

export default function Home() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const {
    value: isRequestTopicOpen,
    setTrue: openRequestTopic,
    setFalse: closeRequestTopic,
  } = useBoolean();
  const {
    value: isRequestTopicChanged,
    setTrue: setRequestTopicChanged,
    setFalse: resetRequestTopicChanged,
  } = useBoolean();
  const {
    value: isWarningOpen,
    setTrue: openWarning,
    setFalse: closeWarning,
  } = useBoolean();

  const handleSearch = (text: string) => {
    navigate(
      text
        ? `${APP_ROUTES.transcripts}?q=${encodeURIComponent(text)}`
        : APP_ROUTES.transcripts,
    );
  };

  const handleRequestTopicClose = () => {
    if (isRequestTopicChanged) {
      openWarning();
    } else {
      closeRequestTopic();
    }
  };

  const handleDiscardChanges = () => {
    closeWarning();
    resetRequestTopicChanged();
    closeRequestTopic();
  };

  const handleRequestTopicSubmitted = () => {
    resetRequestTopicChanged();
    closeRequestTopic();
  };

  return (
    <div
      className={`${styles.heroBackground} bg-main-background min-h-screen flex flex-col`}
    >
      <Header />

      <div className="flex-1">
        <div className="mx-auto max-w-4xl px-6 py-12 md:py-16 flex flex-col gap-6 text-center items-center justify-center relative">
          {/* Centered hero content */}
          <div className="w-full flex flex-col gap-6 text-center items-center justify-center">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight whitespace-nowrap md:whitespace-normal">
                <span className="text-text-primary">Real Expertise. </span>
                <span className="text-accent-2">Already Recorded</span>
              </h1>
              <p className="mt-6 text-lg text-text-secondary leading-relaxed max-w-3xl mx-auto">
                Every transcript comes from an author recording their view on a
                topic the market is actively asking about. Search, filter, and
                get straight to the insight you are looking for.
              </p>
            </div>

            {/* Search bar */}
            <div className="w-full max-w-3xl mx-auto">
              <SearchBar
                placeholder="Search topics, domains, or keywords..."
                searchValue={search}
                onChangeFunction={setSearch}
                getOnChange
                onSearch={handleSearch}
                maxWidth="100%"
                height="56px"
                submitButtonVariant="orange-circle"
                borderRadius="9999px"
                backgroundColor="#ffffff"
                boxShadow="0 4px 20px -2px rgba(0, 0, 0, 0.05)"
                inputFontSize="16px"
                m={{ xs: "0", sm: "0" }}
              />
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 justify-center mt-2">
              <Link to={APP_ROUTES.transcripts}>
                <Button
                  variant="contained"
                  label="Browse transcripts"
                  styles={{
                    fontWeight: 600,
                    fontSize: "14px",
                    height: "42px",
                    padding: "0 28px",
                  }}
                />
              </Link>
              <Button
                variant="outlined"
                label=" Request a Topic"
                onClick={openRequestTopic}
                styles={{
                  fontWeight: 600,
                  fontSize: "14px",
                  height: "42px",
                  padding: "0 28px",
                }}
              />
            </div>
          </div>
        </div>

        {/* Features section (three separate cards) */}
        <div className="mx-auto mt-8 max-w-[1100px] px-6 pb-12 md:pb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FEATURE_CARDS.slice(0, 3).map((card) => (
              <FeatureCard key={card.title} {...card} />
            ))}
          </div>
        </div>
      </div>

      <Footer style={{ backgroundColor: "transparent", borderTop: "none" }} />

      <RequestTopicDialog
        isOpen={isRequestTopicOpen}
        handleClose={handleRequestTopicClose}
        handleFormChange={setRequestTopicChanged}
        handleSubmitClose={handleRequestTopicSubmitted}
      />
      <WarningDialog
        open={isWarningOpen}
        handleClose={closeWarning}
        handleYesClick={handleDiscardChanges}
      />
    </div>
  );
}
