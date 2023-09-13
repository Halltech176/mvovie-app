import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import LogoComponent from "../components/logo";
import ButtonComponent from "../components/buton";
import Loader from "../components/loader";

import search from "../assets/search.png";
import menu from "../assets/menu.png";
import logo from "../assets/logo.png";
import tomato from "../assets/tomato.png";

import { TOKEN, BASE_URL, genreMap } from "../../data";

import {
  BsPlayCircleFill,
  BsYoutube,
  BsTwitter,
  BsInstagram,
} from "react-icons/bs";
import { MdFavorite } from "react-icons/md";
import { FaFacebookSquare } from "react-icons/fa";

import axios from "axios";

const HomePage = () => {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");

  const ErrorBoundary = () => {
    console.error(error.message);

    if (error.message === "Network Error") {
      error.message = "Please check your internet connection";
    }

    return (
      <div className="flex items-center p-3 h-screen justify-center flex-col">
        <h1 className="text-primary text-2xl">0pss!... {error.message}</h1>
      </div>
    );
  };

  const FetchMovies = async () => {
    try {
      setLoading(true);
      const response = await axios.get(BASE_URL, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
      });

      console.log(response);
      setMovies(response.data);
    } catch (err) {
      setError(err);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    FetchMovies();
  }, []);

  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <ErrorBoundary />;
  }

  return (
    <>
      <main>
        <div className="poster">
          <SectionLayout>
            <Header />
            <div className="md:my-28 my-14 flex-col lg:max-w-[25vw] flex gap-6 ">
              <h1 className="md:text-5xl text-3xl md:leading-tight tracking-wide text-white font-bold">
                John Wick 3 : Parabellum
              </h1>
              <div className="flex gap-8 items-center">
                <span>
                  <img src={logo} alt="imdb logo" />
                </span>
                <span className="font-extralight text-sm">86.0 / 100 </span>
                <div className="flex items-center gap-3">
                  <img src={tomato} alt="imdb logo" />
                  <span>97%</span>
                </div>
              </div>
              <p className="font-light">
                John Wick is on the run after killing a member of the
                international assassins' guild, and with a $14 million price tag
                on his head, he is the target of hit men and women everywhere.
              </p>
              <ButtonComponent>
                <div className="flex items-center gap-3">
                  <span className="">
                    <BsPlayCircleFill />
                  </span>
                  <span className="uppercase font-semibold">Watch Trailer</span>
                </div>
              </ButtonComponent>
            </div>
          </SectionLayout>
        </div>
        <SectionLayout>
          <div className="flex my-3 justify-between item-center">
            <h1 className="text-2xl font-bold">Featured Movie</h1>
            <p className="text-primary ">See more</p>
          </div>
        </SectionLayout>
        <SectionLayout>
          <div className="grid grid-cols-2 lg:grid-cols-4  mb-10  gap-3 md:gap-14">
            {movies?.results?.slice(10)?.map((movie) => {
              return <MovieCard key={movie?.id} data={movie} />;
            })}
          </div>
        </SectionLayout>
        <SectionLayout>
          <Footer />
        </SectionLayout>
      </main>
    </>
  );
};

const SectionLayout = ({ children }) => {
  return <section className="lg:px-24 md:px-10 px-3 py-5">{children}</section>;
};

// Header component

const Header = () => {
  const MobileNav = ({ open, setOpen }) => {
    return (
      <header className="fixed top-0  right-0 z-10 left-0">
        <div className="bg-white flex  gap-3 border-b-2  z-50 border-b-primary py-5 item-center p-3">
          <div className="relative w-full">
            <input
              placeholder="What do you want to watch?"
              className="bg-transparent border-2 w-full rounded-md px-4 pr-8 py-2 text-white border-[#D1D5DB]"
              type="text"
            />
          </div>

          <nav className="flex items-center gap-4">
            <NavLink className="md:block hidden" to="/">
              Sign in
            </NavLink>
            <span onClick={() => setOpen(!open)}>
              <img src={menu} alt="menu icon" />
            </span>
          </nav>
        </div>
      </header>
    );
  };
  const [open, setOpen] = useState(false);
  return (
    <>
      {open && <MobileNav open={open} setOpen={setOpen} />}

      <header className="flex items-center justify-between">
        <LogoComponent />

        <div className="relative md:block hidden">
          <input
            placeholder="What do you want to watch?"
            className="bg-transparent border-2 w-[45vw]  rounded-md px-4 pr-8 py-2 text-white border-[#D1D5DB]"
            type="text"
          />
          <span className="absolute top-1/2 right-1 -translate-x-1/2 -translate-y-1/2 ">
            <img src={search} alt="search icon" />
          </span>
        </div>

        <nav className="flex items-center gap-4">
          <NavLink className="md:block hidden" to="/">
            Sign in
          </NavLink>
          <span onClick={() => setOpen(!open)}>
            <img src={menu} alt="menu icon" />
          </span>
        </nav>
      </header>
    </>
  );
};

// Genre dummy data

// Movie card component

const MovieCard = ({ data }) => {
  const date = new Date(data?.release_date);
  const utc_time = date.toISOString().replace(/\.\d+Z$/, "Z");

  const navigate = useNavigate();

  const genreIds = data?.genre_ids?.map((data, index) => {
    return genreMap[data];
  });

  const [active, setActive] = useState(false);

  return (
    <div
      data-testid="movie-card"
      onClick={() => navigate(`/movies/${data?.id}`)}
      className="text-black relative cursor-pointer"
    >
      <span
        onClick={() => {
          setActive(!active);
        }}
        className="absolute p-2 rounded-full bg-[#F3F4F6] top-4 right-4"
      >
        <MdFavorite color={active ? "#BE123C" : "#D1D5DB"} />
      </span>
      <div className="">
        <img src={`https://image.tmdb.org/t/p/original${data.poster_path}`} />
      </div>
      <p
        data-testid="movie-release-date"
        className="md:text-base text-sm my-2 text-dark-100"
      >
        USA, {utc_time}
      </p>
      <h1
        data-testid="movie-title"
        className="my-2 md:text-xl text-base font-medium"
      >
        {data.original_title}
      </h1>

      <div className="flex  justify-between items-center">
        <span>
          <img src={logo} alt="imdb logo" />
        </span>
        <span className="font-extralight text-sm">
          {" "}
          {data.vote_average * 10} / 100{" "}
        </span>
        <div className="flex items-center gap-3">
          <img src={tomato} alt="imdb logo" />
          <span>{Math.ceil(data.popularity)}%</span>
        </div>
      </div>
      <p className="text-base my-2 text-dark-100">{genreIds.join(", ")}</p>
    </div>
  );
};

// Footer component

const Footer = () => {
  return (
    <footer className="text-center md:text-base text-xs flex flex-col gap-8 items-center justify-center text-black">
      <ul className="flex gap-8 item-center ">
        <FaFacebookSquare />
        <BsInstagram />
        <BsTwitter />
        <BsYoutube />
      </ul>
      <ul className="flex gap-8 item-center ">
        <NavLink to="/">Conditions Of use</NavLink>
        <NavLink to="/">Privacy and policy</NavLink>
        <NavLink to="/">Press Room</NavLink>
      </ul>
      <tt>© 2021 MovieBox by Adriana Eka Prayudha</tt>
    </footer>
  );
};

export default HomePage;
