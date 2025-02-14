import React, { useMemo, useState } from "react";
import "./styles.css";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";
import { useTranslation } from "react-i18next";
import { Helmet, HelmetProvider } from "react-helmet-async";

type FormData = {
  name: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
  phone: string;
  email: string;
  dateOfBirth: string;
  age: string;
  tShirtSize: string;
  interviewAvailability: string[];
  socialMediaHandles: string;
  experience: string;
  referralSource: string;
};

const Cheer = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    address: "",
    city: "",
    zipCode: "",
    country: "",
    phone: "",
    email: "",
    dateOfBirth: "",
    age: "",
    tShirtSize: "",
    interviewAvailability: [],
    socialMediaHandles: "",
    experience: "",
    referralSource: "",
  });

  const [headshot, setHeadshot] = useState<File | null>(null);
  const [auditionVideo, setAuditionVideo] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const { t } = useTranslation();

  const formFilledOut = useMemo(
    () =>
      Object.values(formData).every((value) => value !== "") &&
      formData.interviewAvailability.length > 0 &&
      headshot &&
      auditionVideo,
    [formData, headshot, auditionVideo]
  );

  const interviewDays = [
    t("cheer_form.monday"),
    t("cheer_form.tuesday"),
    t("cheer_form.wednesday"),
    t("cheer_form.thursday"),
    t("cheer_form.friday"),
  ];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (day: string) => {
    setFormData((prev) => ({
      ...prev,
      interviewAvailability: prev.interviewAvailability.includes(day)
        ? prev.interviewAvailability.filter((d) => d !== day) // Remove if already selected
        : [...prev.interviewAvailability, day], // Add if not selected
    }));
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "headshot" | "video"
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      if (type === "headshot") {
        setHeadshot(file);
      } else if (type === "video") {
        setAuditionVideo(file);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Upload files to Firebase Storage
      const uploadFile = async (file: File, path: string) => {
        const fileRef = ref(storage, path);
        await uploadBytes(fileRef, file);
        return getDownloadURL(fileRef);
      };

      const headshotUrl = headshot
        ? await uploadFile(
            headshot,
            `cheerAuditions/headshots/${headshot.name}`
          )
        : "";
      const auditionVideoUrl = auditionVideo
        ? await uploadFile(
            auditionVideo,
            `cheerAuditions/videos/${auditionVideo.name}`
          )
        : "";

      const cheerCollection = collection(db, "cheerAuditions");
      await addDoc(cheerCollection, {
        ...formData,
        age: parseInt(formData.age),
        interviewAvailability: formData.interviewAvailability,
        headshotUrl,
        auditionVideoUrl,
        timestamp: Date.now(),
      });

      setSuccess(true);
      setLoading(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      setLoading(false);
    }
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>{"Nordic Storm Cheerleading"}</title>
        <meta property="og:title" content={"Nordic Storm Cheerleading"} />
        <meta
          property="og:description"
          content={
            "We are looking for passionate and energetic dancers to join Nordic Storm Cheerleaders!"
          }
        />
        <meta
          property="og:image"
          content={
            "https://firebasestorage.googleapis.com/v0/b/nsbackend-3fd2c.appspot.com/o/cheer.png?alt=media&token=7a69146a-1270-4337-8b50-2fbd08032226"
          }
        />
        <meta property="og:url" content={`https://nordicstorm.net/cheer`} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={"Nordic Storm Cheerleading"} />
        <meta
          name="twitter:description"
          content={
            "We are looking for passionate and energetic dancers to join Nordic Storm Cheerleaders!"
          }
        />
        <meta
          name="twitter:image"
          content={
            "https://firebasestorage.googleapis.com/v0/b/nsbackend-3fd2c.appspot.com/o/cheer.png?alt=media&token=7a69146a-1270-4337-8b50-2fbd08032226"
          }
        />
      </Helmet>
      <div className="outer-container">
        <div className="audition-form-container">
          <h2>{t("cheer_form.info.title")}</h2>
          <p>{t("cheer_form.info.intro")}</p>

          <h3>{t("cheer_form.info.position_title")}</h3>
          <p>{t("cheer_form.info.position_desc")}</p>

          <div className="requirements">
            <h4>{t("cheer_form.info.requirements_title")}</h4>
            <ul>
              <li>{t("cheer_form.info.requirement_1")}</li>
              <li>{t("cheer_form.info.requirement_2")}</li>
              <li>{t("cheer_form.info.requirement_3")}</li>
            </ul>
          </div>

          <div className="requirements">
            <h4>{t("cheer_form.info.tryout_title")}</h4>
            <ul>
              <li>{t("cheer_form.info.tryout_1")}</li>
              <li>{t("cheer_form.info.tryout_2")}</li>
              <li>{t("cheer_form.info.tryout_3")}</li>
            </ul>
          </div>

          <div className="requirements">
            <h4>{t("cheer_form.info.dates_title")}</h4>
            <ul>
              <li>{t("cheer_form.info.date_1")}</li>
              <li>{t("cheer_form.info.date_2")}</li>
              <li>{t("cheer_form.info.date_3")}</li>
            </ul>
          </div>

          {success ? (
            <div className="success-message">
              {t("cheer_form.success_message")}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="audition-form">
              <input
                type="text"
                name="name"
                placeholder={t("cheer_form.name")}
                required
                onChange={handleChange}
              />
              <input
                type="text"
                name="address"
                placeholder={t("cheer_form.address")}
                required
                onChange={handleChange}
              />
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 2fr",
                  gap: "20px",
                  width: "100%",
                }}
              >
                <input
                  type="text"
                  name="zipCode"
                  placeholder={t("cheer_form.zip_code")}
                  required
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="city"
                  placeholder={t("cheer_form.city")}
                  required
                  onChange={handleChange}
                />
              </div>
              <input
                type="text"
                name="country"
                placeholder={t("cheer_form.country")}
                required
                onChange={handleChange}
              />
              <input
                type="text"
                name="phone"
                placeholder={t("cheer_form.phone")}
                required
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                placeholder={t("cheer_form.email")}
                required
                onChange={handleChange}
              />
              <label>{t("cheer_form.date_of_birth")}</label>
              <input
                type="date"
                name="dateOfBirth"
                required
                onChange={handleChange}
              />
              <input
                type="number"
                name="age"
                placeholder={t("cheer_form.age")}
                required
                onChange={handleChange}
              />

              <select name="tShirtSize" required onChange={handleChange}>
                <option value="">{t("cheer_form.select_tshirt_size")}</option>
                <option value="X-Small">{t("cheer_form.tshirt_xsmall")}</option>
                <option value="Small">{t("cheer_form.tshirt_small")}</option>
                <option value="Medium">{t("cheer_form.tshirt_medium")}</option>
                <option value="Large">{t("cheer_form.tshirt_large")}</option>
                <option value="X-Large">{t("cheer_form.tshirt_xlarge")}</option>
              </select>

              <p>{t("cheer_form.interview_availability")}</p>
              <div className="checkbox-group">
                {interviewDays.map((day) => (
                  <div
                    className={`interview-option ${
                      formData.interviewAvailability.includes(day)
                        ? "selected"
                        : ""
                    }`}
                    key={day}
                    onClick={() => handleCheckboxChange(day)}
                  >
                    {day}
                    <input
                      type="checkbox"
                      value={day}
                      checked={formData.interviewAvailability.includes(day)}
                      onChange={() => handleCheckboxChange(day)}
                      hidden
                    />
                  </div>
                ))}
              </div>

              <input
                type="text"
                name="socialMediaHandles"
                placeholder={t("cheer_form.social_media")}
                onChange={handleChange}
              />
              <textarea
                name="experience"
                placeholder={t("cheer_form.experience")}
                onChange={handleChange}
              ></textarea>
              <input
                type="text"
                name="referralSource"
                placeholder={t("cheer_form.referral_source")}
                onChange={handleChange}
              />

              <div className="file-upload-container">
                <div
                  className="file-upload-box"
                  onClick={() =>
                    document.getElementById("headshotInput")?.click()
                  }
                >
                  {headshot ? (
                    <p>{headshot.name}</p>
                  ) : (
                    <p>{t("cheer_form.upload_headshot")}</p>
                  )}
                  <input
                    id="headshotInput"
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) => handleFileChange(e, "headshot")}
                  />
                </div>

                <div
                  className="file-upload-box"
                  onClick={() => document.getElementById("videoInput")?.click()}
                >
                  {auditionVideo ? (
                    <p>{auditionVideo.name}</p>
                  ) : (
                    <p>{t("cheer_form.upload_video")}</p>
                  )}
                  <input
                    id="videoInput"
                    type="file"
                    accept="video/*"
                    hidden
                    onChange={(e) => handleFileChange(e, "video")}
                  />
                </div>
              </div>

              <div className="disclaimer">
                <input
                  type="checkbox"
                  required
                  onClick={() => setTermsAccepted(!termsAccepted)}
                />
                <p className="disclaimer-text">
                  {t("cheer_form.disclaimer_text") + " "}
                  <a
                    href="https://firebasestorage.googleapis.com/v0/b/nsbackend-3fd2c.appspot.com/o/cheerAuditions%2FNordic%20Storm_Cheerleading%20Audition%20Info%20and%20Requirements.pdf?alt=media&token=a0661983-52d9-4237-b55a-8adc3616ace9"
                    target="_blank"
                  >
                    {t("cheer_form.disclaimer_link")}
                  </a>
                </p>
              </div>

              <button
                type="submit"
                disabled={loading || !formFilledOut || !termsAccepted}
              >
                {loading ? t("cheer_form.submitting") : t("cheer_form.submit")}
              </button>
            </form>
          )}
        </div>
      </div>
    </HelmetProvider>
  );
};

export default Cheer;
