import type { NextPage } from "next";
import { motion } from "framer-motion";

const Home: NextPage = () => {
  return (
    <div className="h-[85vh] flex">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        className="my-auto"
      >
        <h1 className="text-[5rem] ">KaijuDex</h1>
        <p className="text-zinc-500 w-1/2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Adipiscing
          diam donec adipiscing tristique risus nec. Augue ut lectus arcu
          bibendum at varius vel pharetra vel.
        </p>
      </motion.div>
    </div>
  );
};

export default Home;
