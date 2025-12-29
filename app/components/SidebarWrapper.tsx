import { getCategories } from "@/lib/categories";
import { SideBar } from "./SideBar";


export async function SidebarWrapper() {

  const allCategories = await getCategories()

  return (
    <div>
      <SideBar categories={allCategories.data} />
    </div>
  );
}
