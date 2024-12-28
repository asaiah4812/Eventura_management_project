import Button from "@/components/buttons/Button";
import Tab from "@/components/Tabs";
import { Plus } from "lucide-react";


export default function Home() {
  return (
    <div className="bg-background">
     <div className="space-y-5 flex items-center flex-col justify-center pt-16 pb-10 md:pt-8">
     <h1 className="text-white">Welcome, John!</h1>
      <Button icon={<Plus width={18}/>} text="Create new event" url="create-event/" />
     </div>
     <div className="lg:w-[60%] mx-auto mt-6">
      <Tab/>
     </div>
    </div>
  );
}
