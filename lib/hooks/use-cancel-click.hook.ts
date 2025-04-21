import { useRouter } from "next/navigation";

const useCancelClick = () => {
    const router = useRouter(); // Initialize the router
    const handleCancelClick = (e: React.MouseEvent) => {
      e.preventDefault();
      router.back();
  };
  
  return {
    handleCancelClick,
  };
}

export default useCancelClick;