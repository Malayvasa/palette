import Background from './components/Background';
import HeroTitle from './components/HeroTitle';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <div className="bg-transparent overflow-hidden min-h-screen flex flex-col items-center justify-center gap-8 py-8 p-2 md:p-0">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeInOut' }}
      >
        <HeroTitle />
        <div className="text-white/40 text-center pt-8">By Malay Vasa</div>
      </motion.div>

      <Background />
    </div>
  );
}
