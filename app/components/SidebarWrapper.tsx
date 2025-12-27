import { getCategories } from "@/lib/categories";
import { SideBar } from "./SideBar";


export async function SidebarWrapper() {

  const allCategories = await getCategories()
  console.log(allCategories)

  return (
    <div>
      <SideBar categories={allCategories.data} />
    </div>
  );
}
