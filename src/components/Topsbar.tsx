import Head from "next/head";
import Image from "next/image";
import logo from "../assets/logo.svg";
import Button from "@mui/material/Button";
import { BsGithub } from "react-icons/bs";

interface TopBarProps {
  children: React.ReactElement;
}

const Topbar = ({ children }: TopBarProps) => {
  return (
    <>
      <Head>
        <title>谁动了你的数据</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container flex h-screen w-screen flex-col items-center gap-12 bg-zinc-50">
        <div className="flex h-20 w-2/3 items-center  justify-between ">
          <Image alt="logo" src={logo} className="h-12 w-12" />
          <Button variant="text" color="inherit" startIcon={<BsGithub />}>
            Github
          </Button>
        </div>
        {children}
      </main>
    </>
  );
};

export default Topbar;
