import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { BASE_URL, TOKEN, genreMap } from "../../data";
import ButtonComponent from "../components/buton";

import list from "../assets/list.png";
import ticket from "../assets/ticket.png";
import home from "../assets/home.png";
import show from "../assets/show.png";
import calendar from "../assets/calendar.png";
import projector from "../assets/projector.png";
import menu from "../assets/menu.png";
import logout from "../assets/logout.png";

import Loader from "../components/loader";

import axios from "axios";

import LogoComponent from "../components/logo";

const ListItem = ({ title, icon }) => {
  const navigate = useNavigate();
  return (
    <li
      onClick={() => navigate("/")}
      className="flex cursor-pointer hover:border-r-2 hover:border-primary hover:bg-red-100  p-3 w-full  items-center gap-4"
    >
      <span>
        <img src={icon} />{" "}
      </span>
      <span> {title} </span>
    </li>
  );
};

const SideBarRoute = ({ open, setOpen }) => {
  return (
    <main className="block md:hidden">
      <div className="fixed bg-white top-0 right-0 left-0">
        <header className="flex item-center justify-between p-3 border-b-2 border-primary">
          <LogoComponent />
          <span onClick={() => setOpen(!open)}>
            <img src={menu} alt="menu" />
          </span>
        </header>

        <nav className="flex flex-col items-center justify-between w-full  item-center gap-6 my-18">
          <ListItem icon={home} title="Home" />
          <ListItem icon={projector} title="Movies" />
          <ListItem icon={show} title="TV series" />
          <ListItem icon={calendar} title="Upcoming" />
        </nav>
        <div className="bg-red-100 text-sm rounded-md p-3 m-4 border-primary border">
          <p className="font-medium">Play movie quizes and earn free tickets</p>
          <p className="my-2 text-dark-300">50k people are playing now</p>
        </div>
        <ListItem icon={logout} title="Logout" />
      </div>
    </main>
  );
};

const TextContent = ({ title, text }) => {
  return (
    <div className="font-medium flex gap-3 items-center">
      <p>{title} : </p>
      <p className="text-primary">{text}</p>
    </div>
  );
};

const MovieDetails = () => {
  const param = useParams();
  console.log(param.id);

  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState({});

  const [error, setError] = useState("");

  const fetchMovie = async () => {
    try {
      setLoading(false);
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${param.id}`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );
      console.log(response);
      setMovie(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  console.log(movie);
  useEffect(() => {
    fetchMovie();
  }, []);

  if (loading) {
    return <Loader />;
  }

  const genreIds = movie?.genres?.map((data, index) => {
    return genreMap[data.id];
  });

  const [open, setOpen] = useState(false);
  console.log(movie?.release_date);
  const date = movie?.release_date && new Date(movie?.release_date);
  // const utc_time = "";
  const utc_time = date && date?.toISOString().replace(/\.\d+Z$/, "Z");

  return (
    <>
      <header className="flex md:hidden item-center justify-between p-3 border-b-2 border-primary">
        <LogoComponent />
        <span onClick={() => setOpen(!open)}>
          <img src={menu} alt="menu" />
        </span>
      </header>
      {open && <SideBarRoute open={open} setOpen={setOpen} />}
      <main className="md:flex justify-center   gap-3">
        <aside className="grow hidden md:block border-2 w-full   rounded-tr-[2rem] rounded-br-[2rem] border-slate-300  ">
          <div className="my-10 p-3 ">
            <LogoComponent />
          </div>
          <nav className="flex flex-col items-center justify-between w-full  item-center gap-6 my-18">
            <ListItem icon={home} title="Home" />
            <ListItem icon={projector} title="Movies" />
            <ListItem icon={show} title="TV series" />
            <ListItem icon={calendar} title="Upcoming" />
          </nav>
          <div className="bg-red-100 text-sm rounded-md p-3 m-4 border-primary border">
            <p className="font-medium">
              Play movie quizes and earn free tickets
            </p>
            <p className="my-2 text-dark-300">50k people are playing now</p>
          </div>
          <ListItem icon={logout} title="Logout" />
        </aside>
        <div className="md:p-5 p-2">
          <div className=" bg-red-500  md:rounded-3xl overflow-hidden max-h-[60vh]">
            <img
              className="object-cover w-full h-full"
              src={`https://image.tmdb.org/t/p/original${movie?.poster_path}`}
            />
          </div>
          <div className="my-3 md:flex gap-4 items-center my-3">
            <h3 data-testid="movie-title">{movie.original_title}</h3>
            <h3 data-testid="movie-release-date">{utc_time}</h3>
            {genreIds?.map((data, index) => {
              return (
                <span
                  key={index}
                  className="text-primary mx-2 py-1 font-bold px-5 border border-[#F8E7EB] rounded-full"
                >
                  {data}
                </span>
              );
            })}
            <h3 data-testid="movie-runtime">{movie?.runtime}</h3>
          </div>

          <section className="md:flex justify-between gap-3">
            <div className="md:max-w-[55vw]">
              <p data-testid="movie-overview">{movie?.overview}</p>
              <div className="flex flex-col gap-5">
                <TextContent title="Director" text="Joseph Kosinki" />
                <TextContent
                  title="Writers"
                  text="Jim Cash, Jack Epps Jr, Peter Craig"
                />
                <TextContent
                  title="Stars"
                  text="Tom Cruise, Jennifer Connelly, Miles Teller"
                />
              </div>

              <div className="flex my-5  gap-3">
                <ButtonComponent style="w-full" type="dark">
                  Top rated movies #{Math.floor(movie?.popularity)}
                </ButtonComponent>
                <ButtonComponent style="w-full" type="light">
                  Award 9 Nominations
                </ButtonComponent>
              </div>
            </div>
            <div className="flex flex-1 self-start  shrink-0 grow flex-col gap-3">
              <ButtonComponent style="w-full" type="dark">
                <div className="flex justify-center item-centers gap-3">
                  <span>
                    <img src={ticket} alt="ticket" />
                  </span>{" "}
                  <span> See Showtimes</span>{" "}
                </div>
              </ButtonComponent>
              <ButtonComponent style="w-full" type="light">
                <div className="flex justify-center items-center gap-3">
                  <span>
                    <img src={list} alt="list" />
                  </span>{" "}
                  <span>more watch options</span>
                </div>
              </ButtonComponent>
              <div className="grid gap-4 grid-cols-3">
                {movie?.production_companies
                  ?.slice(0, 3)
                  ?.map?.((data, index) => {
                    return (
                      <div key={index} className="">
                        <img
                          src={`https://image.tmdb.org/t/p/original${data?.logo_path}`}
                          alt=""
                        />
                      </div>
                    );
                  })}
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default MovieDetails;
