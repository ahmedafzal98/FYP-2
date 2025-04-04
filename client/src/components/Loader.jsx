import { LucideLoader } from "lucide-react";

const Loader = () => (
  <div className="fixed inset-0 bg-black opacity-50 flex justify-center items-center z-50">
    <LucideLoader className="animate-spin text-white" size={50} />
  </div>
);

export default Loader;
