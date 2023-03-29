import type { NextPage } from "next";
import { motion } from "framer-motion";
import Image from "next/image";

const Home: NextPage = () => {
  return (
    <div className="h-[85vh] flex">
      <div className="my-auto">
        {/* <motion.div
          className="relative w-[159px] h-[251px] md:w-[308px] md:h-[502px] mx-auto"
          animate={{ x: 0 }}
          initial={{ x: -100 }}
          transition={{ ease: "easeOut", duration: 2 }}
        >
          <Image src="/images/ID.png" alt="ID" fill className="rounded-md" />
        </motion.div> */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.5,
            ease: [0, 0.71, 0.2, 1.01],
          }}
        >
          <h1 className="text-[5rem] ">KaijuDex</h1>
          <p className="text-zinc-500 md:w-1/2">
            Connect with like-minded creatives, discover exciting new gigs, and
            level up your career. Whether you&apos;re an artist or engineer,
            Kaiju-Dex connects you to a community of potential clients and
            collaborators of the KaijuKingz community, ready to help you unleash
            your skills and grow your portfolio.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
