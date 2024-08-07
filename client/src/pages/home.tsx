import React, { useContext, useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  CardFooter,
} from "@material-tailwind/react";
import { RatingWithComment } from "../components/RatingCard";
import Hero from "../components/hero";
import Reveal from "../utils/Reveal";
import bb from "../assets/images/bb.jpg";
import tuteurImage from "../assets/images/tuteur.png";
import { FaArrowRight } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "src/Context/AuthContext";
import axios from "axios";
import Person from "../assets/images/person1.jpg";
const data = [
  {
    imageSrc:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80",
    title: "Aziz Bayoudh",
    description: "Enseignant Professionnel",
    budget: "USD 5$",
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80",
    title: "Ala Ben Rjab",
    description: "Enseignant Débutant",
    budget: "USD 5$",
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80",
    title: "Aziza Chouchene",
    description: "Enseignant Academique",
    budget: "USD 5$",
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80",
    title: "Mahdi Khmili",
    description: "Enseignant Professionnel",
    budget: "USD 5$",
  },
];
interface Tutor {
  _id: string;
  username: string;
  verified: string;
  language: string;
  aboutMe: string;
  country: string;
  email: string;
  experience: number;
  certificate: string;
  createdAt: Date;
}
const Home: React.FC = () => {
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/tuteur/");
        console.log(response);
        setTutors(response.data.tuteurs);
      } catch (err) {
        console.error("Error fetching tutors:", err);
      }
    };
    fetchTutors();
  }, []);

  const handleSelectTutor = (tutorId: string) => {
    navigate(`/apprenant/tuteur/${tutorId}`);
  };

  return (
    <DashboardLayout>
      <Hero />
      <div className="min-h-screen mb-6 mt-10 flex flex-col items-center justify-center">
        <Typography
          variant="h2"
          color="blue-gray"
          className="mb-2 text-center text-5xl font-korto font-sans tracking-tight font-bold text-blue-500"
        >
          Choisissez votre propre tuteur
        </Typography>
        <Typography
          variant="h2"
          color="gray"
          className="p-2 text-center text-base font-korto "
        >
          Avec plus de 30 000 tuteurs et plus d'un million d'apprenants, nous
          connaissons l'apprentissage des langues.
        </Typography>
        <div className="flex gap-9 m-10 p-1 md:flex-row sm:flex-col lg:flex-row">
          {tutors.map((tutor) => (
            <Card
              key={tutor._id}
              className="max-w-[20rem] overflow-hidden hover:bg-sky-100"
              onClick={() => handleSelectTutor(tutor._id)}
            >
              <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="m-0 rounded-none"
              >
                <img src={Person} alt="ui/ux review check" />
              </CardHeader>
              <CardBody>
                <Typography variant="h4" className=" text-orange-600">
                  {tutor.username}
                </Typography>
                <Typography
                  variant="lead"
                  color="gray"
                  className="mt-3 font-normal text-sm"
                >
                  Contact : {tutor.email}
                </Typography>
                <Typography
                  variant="lead"
                  color="gray"
                  className="mt-3 font-normal text-sm"
                >
                  Pays Natale : {tutor.country}
                </Typography>
                <Typography
                  variant="lead"
                  color="gray"
                  className="mt-3 font-normal text-sm"
                >
                  Expérience : {tutor.experience} ans
                </Typography>
                <Typography
                  variant="lead"
                  color="gray"
                  className="mt-3 font-bold text-base"
                >
                  <p>50 dinars</p>
                </Typography>
              </CardBody>
              <CardFooter className="flex items-center justify-between">
                <div className="flex items-center -space-x-3"></div>
                <Typography className="font-normal">
                  {new Date(tutor.createdAt).toLocaleDateString()}
                </Typography>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      <div className="min-h-screen flex flex-col text-center tracking-tight">
        <Typography
          variant="h3"
          color="blue-gray"
          className="mb-8 text-center text-5xl font-korto font-sans tracking-tight font-bold text-blue-500"
        >
          Choisissez le programme qui vous convient
        </Typography>
        <div className="flex items-center justify-center gap-4 mt-5 md:flex-col sm:flex-col lg:flex-row">
          <Card className="max-w-[22rem] bg-sky-100 p-2 rounded-3xl">
            <CardBody className="p-10 px-4 divide-y divide-solid divide-black">
              <div className="flex text-2xl font-bold items-center justify-center mb-5">
                Cours particuliers et en groupe
              </div>
              <div className="text-left">
                <p className="mb-3 mt-6">
                  Accès complet à l'intégralité de Cambly
                </p>
                <div className="ml-9 space-y-2">
                  <p className="flex flex-row gap-2 ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    Notre expérience la plus exhaustive
                  </p>
                  <p className="flex flex-row gap-2 ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-8 h-8"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    Pratiquez l'anglais en cours particuliers ou en groupe
                  </p>
                  <p className="flex flex-row gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-8 h-8"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    Cours disponibles à la réservation et à la demande
                  </p>
                </div>
              </div>
            </CardBody>
            <CardFooter className="flex justify-items-start	flex-col items-center p-4">
              <div className="text-left">
                <p>À partir de</p>
                <p className="text-3xl mb-6 ">$37/mois</p>
              </div>
              <button
                className="select-none rounded-lg bg-gradient-to-tr from-orange-400 to-orange-300 py-3 px-10 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
                onClick={() => {
                  navigate("/pricing");
                }}
              >
                S'inscrire
              </button>
            </CardFooter>
          </Card>
          <Card className="max-w-[22rem] bg-sky-100 p-2 rounded-3xl">
            <CardBody className="p-10 px-4 divide-y divide-solid divide-black">
              <div className="flex text-2xl font-bold items-center justify-center mb-5 p-4">
                Groupe
              </div>
              <div className="text-left">
                <p className="mb-3 mt-6">Seulement les cours en groupe</p>
                <div className="ml-9 space-y-2">
                  <p className="flex flex-row gap-2 ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    Expérience de conversation de monde réel
                  </p>
                  <p className="flex flex-row gap-2 ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-8 h-8"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    Travaillez avec un tuteur et 1 ou 2 autres étudiants
                  </p>
                  <p className="flex flex-row gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-8 h-5"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    Pour les adultes de plus de 21 ans
                  </p>
                </div>
              </div>
            </CardBody>
            <CardFooter className="flex justify-items-start	flex-col items-center p-4">
              <div className="text-left">
                <p>À partir de</p>
                <p className="text-3xl mb-6 ">$16/mois</p>
              </div>
              <button
                className="select-none rounded-lg bg-gradient-to-tr from-orange-400 to-orange-300 py-3 px-10 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
                onClick={() => {
                  navigate("/pricing");
                }}
              >
                S'inscrire
              </button>
            </CardFooter>
          </Card>
          <Card className="max-w-[22rem] bg-sky-100 p-2 rounded-3xl">
            <CardBody className="p-10 px-4 divide-y divide-solid divide-black">
              <div className="flex text-2xl font-bold items-center justify-center mb-5 p-3">
                Enfants
              </div>
              <div className="text-left">
                <p className="mb-3 mt-6">Pour les enfants (moins de 18 ans)</p>
                <div className="ml-9 space-y-2">
                  <p className="flex flex-row gap-2 ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    Cours particuliers avec des tuteurs spécialisés
                  </p>
                  <p className="flex flex-row gap-2 ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    Cours débutant à avancé disponibles
                  </p>
                  <p className="flex flex-row gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-8 h-6"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    Jeux et activités ludiques
                  </p>
                </div>
              </div>
            </CardBody>
            <CardFooter className="flex justify-items-start	flex-col items-center p-4">
              <div className="text-left">
                <p>À partir de</p>
                <p className="text-3xl mb-6 ">$53/mois</p>
              </div>
              <button
                className="select-none rounded-lg bg-gradient-to-tr from-orange-400 to-orange-300 py-3 px-10 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
                onClick={() => {
                  navigate("/pricing");
                }}
              >
                S'inscrire
              </button>
            </CardFooter>
          </Card>
        </div>
      </div>
      <div className="flex items-center justify-center my-20 font-korto">
        <div className="relative flex bg-clip-border rounded-full bg-white text-gray-700 shadow w-full max-w-[70rem] flex-row bg-orange-200">
          <div className="relative w-2/5 m-0 overflow-visible text-gray-700 bg-white rounded-full bg-clip-border rounded-xl ">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1471&amp;q=80"
              alt="card"
              className="rounded-l-full"
            />
          </div>
          <div className="p-6">
            <h4 className="block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
              Essayez nos ressources gratuites 😊🚀
            </h4>
            <p className="block mb-8 font-sans text-lg p-2 antialiased font-korto leading-relaxed text-gray-700">
              Découvrez nos ressources gratuites ! Outils, livres et vidéos pour
              vous aider à apprendre l'anglais. Disponibles sans abonnement.
            </p>
            <a href="/cour" className="inline-block">
              <button
                className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none hover:bg-gray-900/10 active:bg-gray-900/20"
                type="button"
              >
                S'inscrire maintenant
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                  className="w-4 h-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                  ></path>
                </svg>
              </button>
            </a>
          </div>
        </div>
      </div>
      <div className="bg-sky-200 p-20 mb-20 ">
        <div className="text-8xl font-korto font-bold text-center tracking-tight ">
          Des cours pour tous niveaux de compétences et d'intérêt .
        </div>
        <div className="text-center p-5 ">
          Concentrez-vous sur vos objectifs spécifiques grâce à nos cours
          personnalisés.
        </div>
      </div>
      <div className="flex items-center justify-center my-20 gap-10">
        <img src={tuteurImage} alt="" />
        <div className=" space-y-4 font-korto font-sans">
          <div className="font-bold tracking-tight text-4xl text-sky-600">
            Devenir Tuteur
          </div>
          <div className="w-96 text-lg">
            Rejoignez notre communauté d'enseignement de l'anglais et bénéficiez
            d'un emploi du temps flexible et de conversations enrichissantes
            avec des personnes du monde entier
          </div>
          <button className="flex gap-4 max-w-xs select-none rounded-lg bg-gradient-to-tr from-orange-400 to-orange-300 py-3 px-10 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none mt-10">
            <Link to="/tuteur/inscription">C'est Parti </Link>
            <FaArrowRight />
          </button>
        </div>
      </div>
      <div className="flex items-center justify-center md:flex-row lg:flex-row sm:flex-col lg:flex-row gap-4 p-7 ">
        <RatingWithComment
          image={bb}
          name="chedi Amdouni"
          description="Full Stack Developer "
          rating={3}
        />
        <RatingWithComment
          image={bb}
          name="fathy el hadeoui"
          description="Lead Frontend Developper "
          rating={4}
        />
        <RatingWithComment />
      </div>
      <div className="flex flex-col text-center p-20 justify-center items-center">
        <p className="text-blue-500 text-3xl  font-extrabold px-80">
          Atteignez vos objectifs en apprenant l'anglais avec Elearning App
        </p>
        <button
          className="max-w-xs select-none rounded-lg bg-gradient-to-tr from-orange-400 to-orange-300 py-3 px-10 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none mt-10"
          type="button"
          onClick={()=>{
            navigate("/")
          }}
        >
          Commencer l'apprentissage
        </button>
      </div>
    </DashboardLayout>
  );
};
export default Home;
