import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import "./styles.css";

type FormData = {
  id: string;
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
  auditionVideoUrl: string;
  headshotUrl: string;
};

const CheerSignups = () => {
  const [signups, setSignups] = useState<FormData[]>([]);
  const [expandedSignups, setExpandedSignups] = useState<string[]>([]);

  const fetchNews = async () => {
    console.log("fetching news");
    await getDocs(collection(db, "cheerAuditions"))
      .then((querySnapshot) => {
        console.log("querySnapshot", querySnapshot);

        const newData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        })) as FormData[];
        setSignups(newData);
        console.log(signups, newData);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div className="cheer-signups">
      <h1>Cheer Audition Signups</h1>
      {signups.map((signup: FormData) => (
        <div key={signup.id} className="signup">
          <div className="nameAndIcon">
            <h2>{signup.name}</h2>
            <FontAwesomeIcon
              icon={
                expandedSignups.includes(signup.id)
                  ? faChevronUp
                  : faChevronDown
              }
              onClick={() => {
                if (!expandedSignups.includes(signup.id)) {
                  setExpandedSignups([...expandedSignups, signup.id]);
                } else {
                  setExpandedSignups(
                    expandedSignups.filter((id) => id !== signup.id)
                  );
                }
              }}
            />
          </div>
          {expandedSignups.includes(signup.id) ? (
            <div>
              <img src={signup.headshotUrl} alt="Headshot" />
              <video src={signup.auditionVideoUrl} controls />
              <p>
                <b>Email:</b> {signup.email}
              </p>
              <p>
                <b>Phone:</b> {signup.phone}
              </p>
              <p>
                <b>Age:</b> {signup.age}
              </p>
              <p>
                <b>Experience:</b> {signup.experience}
              </p>
              <p>
                <b>Refferal Source:</b> {signup.referralSource}
              </p>
              <p>
                <b>Social Media:</b> {signup.socialMediaHandles}
              </p>
              <p>
                <b>T-Shirt size:</b> {signup.tShirtSize}
              </p>
              <p>
                <b>Date of Birth:</b> {signup.dateOfBirth}
              </p>
              <p>
                <b>Address:</b> {signup.address} - {signup.zipCode}{" "}
                {signup.city} - {signup.country}
              </p>
              <p>
                <b>Avaliable for interviews:</b>{" "}
                {signup.interviewAvailability.join(", ")}
              </p>
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default CheerSignups;
